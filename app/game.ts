import * as gpio from 'rpi-gpio';
import {Subject} from 'rxjs';
import {PINS} from "./pins.enum";
import {Buttons} from "./components/buttons";
import {Buzzer} from "./components/buzzer";
import {CountDown} from "./components/count-down";
import {Display} from "./components/display";
import {Switches} from "./components/switches";
import {Vibration} from "./components/vibration";
import {Engine} from "./engine";
import {GameEventType, GameEventTypes} from "./events/events";
import {GameStates} from "./game-states.enum";

/**
 * Main Game
 */
export class Game {

    private static _gameEvents = new Subject<GameEventTypes>();

    get gameEvents$() {
        return Game._gameEvents.asObservable();
    }

    /**
     * Engine
     */
    private engine = new Engine(this.gameEvents$, this.emitGameEvent);

    /**
     * Switches
     */
    private switches = new Switches(this.gameEvents$, this.emitGameEvent);

    /**
     * Buttons
     */
    private buttons = new Buttons(this.gameEvents$, this.emitGameEvent);

    /**
     * Count down that uses the 7 segment display
     */
    private countDown = new CountDown(this.gameEvents$, this.emitGameEvent);

    /**
     * LCD display
     */
    private display = new  Display(this.gameEvents$);

    /**
     * Buzzer sound
     */
    private buzzer = new Buzzer(this.gameEvents$);

    /**
     * Vibration motor
     */
    private vibration = new Vibration(this.gameEvents$);


    constructor() {
    }

    public async start(): Promise<void> {
        console.log('Start');

        // console.log('Red switch Val', await this.switches.red.getValue());
        // console.log('Green switch Val', await this.switches.green.getValue());

        await this.switches.ready;
        await this.buttons.ready;

       this.emitGameEvent({eventType: GameEventType.StateChange, state: GameStates.MainMenu});

        /**
         * Value change listener
         */
        gpio.on('change', this.channelValueListener());

    }

    private channelValueListener(): (...args: any[]) => void {
        const lastValues: Map<any, any> = new Map();
        const nonValueChangeEmitPins = [PINS.pin15_vibration_motor,PINS.pin3_lcd, PINS.pin5_lcd, PINS.pin7_dio,
            PINS.pin11_clk, PINS.pin18_buzzer, PINS.pin33_buttonWhiteLED,
            PINS.pin36_buttonYellowLED, PINS.pin38_buttonBlueLED];

        return (channel, value) => {

            if (lastValues.get(channel) !== value) {
                lastValues.set(channel, value);

                // don't emit
                if (nonValueChangeEmitPins.includes(channel)) return;
                console.log('Channel ' + channel + ' value is now ' + value, new Date().toISOString());

                this.emitGameEvent({eventType: GameEventType.ValueChange, channel: channel, value: value});

            }
        }

    }

    public emitGameEvent(gameState: GameEventTypes): void {
        Game._gameEvents.next(gameState);
    }
}
