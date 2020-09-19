import * as gpio from 'rpi-gpio';
import {Observable} from 'rxjs';
import {Switch} from "../../libs/switch";
import {EventEmitter} from "../events/event-emitter";
import {GameEventType, GameEventTypes} from "../events/events";
import {GameStates} from "../game-states.enum";
import {PINS} from "../pins.enum";

export class Switches extends EventEmitter{

    public readonly ready: Promise<[boolean, boolean]>;
    public readonly green = new Switch(gpio, PINS.pin12_green_switch1);
    public readonly red = new Switch(gpio, PINS.pin16_red_switch2);

    protected stateBeforeFixSwitches: GameStates;

    constructor(protected gameEvents$: Observable<GameEventTypes>, protected emitGameEvent: (gameState: GameEventTypes) => void){
        super(gameEvents$, emitGameEvent);
        this.ready = Promise.all([this.green.ready, this.red.ready]);
    }

    protected handleStateChange(): void {
        if ([GameStates.EnterSequence, GameStates.Defuse].includes(this.state)){
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
                this.readyForSequenceStart().then((ready: boolean) => {
                    if (ready) {
                        this.emitGameEvent({eventType: GameEventType.StateChange, state: this.stateBeforeFixSwitches});
                    }
                });
            }
        }
    }

    public async readyForSequenceStart(): Promise<boolean> {
        const greenVal = await this.green.getValue();
        const redVal = await this.red.getValue();
        return !greenVal && !redVal;
    }
}
