import * as gpio from 'rpi-gpio';
import {Subject} from 'rxjs';
import {PINS} from "./pins.enum";
import {Buttons} from "./components/buttons";
import {Buzzer} from "./components/buzzer";
import {ClockTimer} from "./components/clock-timer";
import {Display} from "./components/display";
import {Switches} from "./components/switches";
import {Vibration} from "./components/vibration";
import {Engine} from "./engine";
import {GameEventType, GameEventTypes} from "./events/events";
import {GameStates} from "./game-states.enum";
import { Servo } from "../libs/servo";
import { Switch } from "../libs/switch";
import { HCSR04 } from "../libs/hc-sr04";

/**
 * Main Game
 */
export class Game {

    private static _gameEvents = new Subject<GameEventTypes>();

    get gameEvents$() {
        return Game._gameEvents.asObservable();
    }

    // /**
    //  * Engine
    //  */
    // private engine = new Engine(this.gameEvents$, this.emitGameEvent);
    //
    // /**
    //  * Switches
    //  */
    // private switches = new Switches(this.gameEvents$, this.emitGameEvent);
    //
    // /**
    //  * Buttons
    //  */
    // private buttons = new Buttons(this.gameEvents$, this.emitGameEvent);
    //
    // /**
    //  * Count down that uses the 7 segment display
    //  */
    // private countDown = new ClockTimer(this.gameEvents$, this.emitGameEvent);
    //
    // /**
    //  * LCD display
    //  */
    // private display = new  Display(this.gameEvents$);
    //
    // /**
    //  * Buzzer sound
    //  */
    // private buzzer = new Buzzer(this.gameEvents$);
    //
    // /**
    //  * Vibration motor
    //  */
    // private vibration = new Vibration(this.gameEvents$);

    /**
     * Servo, using GPIO number
     */
    private servo = new Servo(18);
    private ultraSonicSensor = new HCSR04(22,5);
    private switch = new Switch(gpio, PINS.pin16_red_switch2);


    constructor() {
    }

    /**
     * Starts the game.
     * @returns {Promise<void>}
     */
    public async start(): Promise<void> {
        console.log('Start');

        // console.log('Red switch Val', await this.switches.red.getValue());
        // console.log('Green switch Val', await this.switches.green.getValue());

        // await this.switches.ready;
        // await this.buttons.ready;
        await this.switch.ready;


       this.emitGameEvent({eventType: GameEventType.StateChange, state: GameStates.MainMenu});

        /**
         * Value change listener
         */
        gpio.on('change', this.channelValueListener());

        this.ultraSonicSensor.init();
        this.ultraSonicSensor.distance$.subscribe(distance => this.servo.setPulseWidth(distance + 1650));
    }

    /**
     * Creates the main handler of value changes from the channels
     * @returns {(...args: any[]) => void}
     * @private
     */
    private channelValueListener(): (...args: any[]) => void {
        const lastValues: Map<any, any> = new Map();
        // Pins that should not emit events/values/changes
        // const nonValueChangeEmitPins = [PINS.pin15_vibration_motor,PINS.pin3_lcd, PINS.pin5_lcd, PINS.pin7_dio,
        //     PINS.pin11_clk, PINS.pin18_buzzer, PINS.pin33_buttonWhiteLED,
        //     PINS.pin36_buttonYellowLED, PINS.pin38_buttonBlueLED];
        const nonValueChangeEmitPins = [];

        return (channel, value) => {
            // If there was no change, don't emit a value change event
            if (lastValues.get(channel) !== value) {
                lastValues.set(channel, value);

                // Filter out channels that shouldn't be emitting value change events to the game.
                if (nonValueChangeEmitPins.includes(channel)) return;

                if( channel == this.switch.pin) {
                    if (value) {
                        // this.servo.blink(false);
                        // this.servo.blink(true, 20, 1);
                        // this.servo.init();
                        this.servo.setAngle(180);
                    } else {
                        // this.servo.blink(false);
                        // this.servo.blink(true, 20, 2);
                        this.servo.setAngle(0)
                    }
                }

                console.log('Channel ' + channel + ' value is now ' + value, new Date().toISOString());
                this.emitGameEvent({eventType: GameEventType.ValueChange, channel: channel, value: value});

            }
        }

    }

    /**
     * Emits a new game state to all listeners
     * @param {GameEventTypes} gameState
     */
    public emitGameEvent(gameState: GameEventTypes): void {
        console.log(`Game:emitGameEvent gameState:${JSON.stringify(gameState)}`);
        Game._gameEvents.next(gameState);
    }
}
