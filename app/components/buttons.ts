import * as gpio from 'rpi-gpio';
import {Observable} from 'rxjs';
import {ButtonLED} from "../../libs/button-led";
import {PINS} from "../pins.enum";
import {EventEmitter} from "../events/event-emitter";
import {GameEventType, GameEventTypes} from "../events/events";
import {GameStates} from "../game-states.enum";

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
        }
    }

    protected blink(doBlink: boolean): void {
        console.log('Buttons: doBlink', doBlink);

    }

    protected handleValueChange(channel: number, value: any) {

        /**
         * Default behavior is to light up when touched
         */
        switch (channel) {
            case this.blue.button.pin:
                value ? this.blue.led.on() : this.blue.led.off();
                break;
            case this.yellow.button.pin:
                value ? this.yellow.led.on() : this.yellow.led.off();
                break;
            case this.white.button.pin:
                value ? this.white.led.on() : this.white.led.off();
                break;
        }
    }
}
