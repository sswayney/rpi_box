import * as gpio from 'rpi-gpio';
import {Observable} from 'rxjs';
import {Switch} from "../../libs/switch";
import {EventEmitter} from "../events/event-emitter";
import {GameEventType, GameEventTypes} from "../events/events";
import {GameStates} from "../game-states.enum";
import {PINS} from "../pins.enum";

/**
 * Switches
 * Handles game play concerning the switches state changes and events
 *
 * Emits: FixSwitches and what ever the previous state was before the FixSwitches state was emitted.
 */
export class Switches extends EventEmitter{

    // Let game know we are ready to play.
    public readonly ready: Promise<[boolean, boolean]>;
    // The green switch object
    public readonly green = new Switch(gpio, PINS.pin12_green_switch1);
    // The red switch object
    public readonly red = new Switch(gpio, PINS.pin16_red_switch2);

    /**
     * The state we were in when we needed to emit the fix switches state.
     * Keep it so we can put the state back once the switches are down.
     * @type {GameStates}
     * @protected
     */
    protected stateBeforeFixSwitches: GameStates;

    constructor(protected gameEvents$: Observable<GameEventTypes>, protected emitGameEvent: (gameState: GameEventTypes) => void){
        super(gameEvents$, emitGameEvent);
        this.ready = Promise.all([this.green.ready, this.red.ready]);
    }

    protected handleStateChange(): void {
        if ([GameStates.EnterSequence, GameStates.Defuse].includes(this.state)){
            /**
             * Why emit fix switches? If player is entering a sequence or defusing(and have to start
             * over again, then all switches have to go back to the starting state of down.
             *
             * Remember, we are responding to the state changing. So this is the beginning of the state.
             */
            this.readyForSequenceStart().then((ready: boolean) => {
                if (!ready){
                    this.stateBeforeFixSwitches = this.state;
                    this.emitGameEvent({eventType: GameEventType.StateChange, state: GameStates.FixSwitches});
                }
            });
        }
    }

    protected handleValueChange(channel: number, value: any) {
        if ([PINS.pin12_green_switch1,PINS.pin16_red_switch2].includes(channel)) {
            if (this.state === GameStates.FixSwitches) {
                /**
                 *  We are in the fix switch state. Check if they are fixed and put
                 *  back the original state before we told player to fix them.
                 */
                this.readyForSequenceStart().then((ready: boolean) => {
                    if (ready) {
                        this.emitGameEvent({eventType: GameEventType.StateChange, state: this.stateBeforeFixSwitches});
                    }
                });
            }
        }
    }

    /**
     * Check all switches are down/false
     * @returns {Promise<boolean>}
     */
    public async readyForSequenceStart(): Promise<boolean> {
        const greenVal = await this.green.getValue();
        const redVal = await this.red.getValue();
        return !greenVal && !redVal;
    }
}
