import * as gpio from 'rpi-gpio';
import {Observable} from 'rxjs';
import {ButtonLED} from "../../libs/button-led";
import {EventEmitter} from "../events/event-emitter";
import {GameEventTypes} from "../events/events";
import {GameStates} from "../game-states.enum";
import {PINS} from "../pins.enum";

export class Buttons extends EventEmitter {

    /**
     * Buttons with LEDS
     */
    public blue = new ButtonLED(gpio, PINS.pin40_buttonBlue, PINS.pin38_buttonBlueLED);
    public yellow = new ButtonLED(gpio, PINS.pin37_buttonYellow, PINS.pin36_buttonYellowLED);
    public white = new ButtonLED(gpio, PINS.pin35_buttonWhite, PINS.pin33_buttonWhiteLED);

    public readonly ready: Promise<[boolean, boolean, boolean]>;

    constructor(private gameState$: Observable<GameEventTypes>, protected emitGameEvent: (gameState: GameEventTypes) => void){
        super(gameState$, emitGameEvent);
        this.ready = Promise.all([this.blue.button.ready, this.yellow.button.ready, this.white.button.ready]);
    }

    protected handleStateChange(): void {

        this.blue.led.blink(false);
        this.yellow.led.blink(false);
        this.white.led.blink(false);

        switch (this.state) {
            case GameStates.MainMenu:
                this.blue.led.blink(true);
                this.yellow.led.blink(true,10000, 5000);
                this.white.led.blink(true, 20000, 10000);
                break;
            case GameStates.Explode:
                this.blue.led.blink(true, 100, 50);
                this.yellow.led.blink(true, 110, 55);
                this.white.led.blink(true, 120, 60);
                break;
            case GameStates.FixSwitches:
                setTimeout(() => this.blue.led.blink(true, 400, 200),1);
                setTimeout(() => this.yellow.led.blink(true, 400, 200),100);
                setTimeout(() => this.white.led.blink(true, 400, 200),250);
                break;
            case GameStates.Defuse:
                this.blue.led.on();
                this.yellow.led.on();
                this.white.led.on();
                break;
        }
    }

    protected blink(doBlink: boolean): void {
        console.log('Buttons: doBlink', doBlink);

    }

    protected handleValueChange(channel: number, value: any) {

        if (this.state === GameStates.Defuse) {
            /**
             * Default behavior is to light up when touched
             */
            switch (channel) {
                case this.blue.button.pin:
                    value ? this.blue.led.off() : setTimeout(() =>this.blue.led.on(), 250);
                    break;
                case this.yellow.button.pin:
                    value ? this.yellow.led.off() : setTimeout(() =>this.yellow.led.on(), 250);
                    break;
                case this.white.button.pin:
                    value ? this.white.led.off() : setTimeout(() =>this.white.led.on(), 250);
                    break;
            }
            return;
        }

        /**
         * Default behavior is to light up when touched
         */
        switch (channel) {
            case this.blue.button.pin:
                value ? this.blue.led.on() : setTimeout(() =>this.blue.led.off(), 250);
                break;
            case this.yellow.button.pin:
                value ? this.yellow.led.on() : setTimeout(() =>this.yellow.led.off(), 250);
                break;
            case this.white.button.pin:
                value ? this.white.led.on() : setTimeout(() =>this.white.led.off(), 250);
                break;
        }
    }
}
