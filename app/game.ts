import * as gpio from 'rpi-gpio';
import {BehaviorSubject} from 'rxjs';
import {Buttons} from "./components/buttons";
import {CountDown} from "./components/count-down";
import {Display} from "./components/display";
import {Switches} from "./components/switches";
import {GameEventType, GameEventTypes} from "./events/events";
import {GameStates} from "./game-states.enum";

/**
 * Main Game
 */
export class Game {

    private _gameEvents = new BehaviorSubject<GameEventTypes>({eventType: GameEventType.StateChange, state: GameStates.EnterSequence});

    get gameEvents$() {
        return this._gameEvents.asObservable();
    }

    /**
     * Switches
     */
    private switches = new Switches(this.gameEvents$, this.emitGameEvent);

    /**
     * Buttons
     */
    private buttons = new Buttons(this.gameEvents$);

    /**
     * Count down that uses the 7 segment display
     */
    private countDown = new CountDown(this.gameEvents$);

    /**
     * LCD display
     */
    private display = new  Display(this.gameEvents$);


    constructor() {
    }

    public async start(): Promise<void> {
        console.log('Start');

        // console.log('Red switch Val', await this.switches.red.getValue());
        // console.log('Green switch Val', await this.switches.green.getValue());

        /**
         * Value change listener
         */
        gpio.on('change', this.channelValueListener());

    }

    private channelValueListener(): (...args: any[]) => void {
        const lastValues: Map<any, any> = new Map();
        return (channel, value) => {

            if (lastValues.get(channel) !== value) {
                lastValues.set(channel, value);
                // console.log('Channel ' + channel + ' value is now ' + value);

                this.emitGameEvent({eventType: GameEventType.ValueChange, channel: channel, value: value});

            }
        }

    }

    public emitGameEvent(gameState: GameEventTypes): void {
        this._gameEvents.next(gameState);
    }
}
