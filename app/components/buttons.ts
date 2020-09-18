import * as gpio from 'rpi-gpio';
import {Observable, Subscription, interval} from 'rxjs';
import {ButtonLED} from "../../libs/button-led";
import {PINS} from "../../libs/pins.enum";
import {EventResponder} from "../events/event-responder";
import {GameEventType, GameEventTypes} from "../events/events";
import {GameStates} from "../game-states.enum";
import { takeWhile, tap } from 'rxjs/operators';

export class Buttons extends EventResponder {

    /**
     * Buttons with LEDS
     */
    public blue = new ButtonLED(gpio, PINS.pin40_buttonBlue, PINS.pin38_buttonBlue);
    public yellow = new ButtonLED(gpio, PINS.pin37_buttonYellow, PINS.pin36_buttonYellow);
    public white = new ButtonLED(gpio, PINS.pin35_buttonWhite, PINS.pin33_buttonWhite);

    constructor(private gameState$: Observable<GameEventTypes>){
        super(gameState$);
    }

    protected handleStateChange(): void {

        this.blue.led.blink(false);
        this.yellow.led.blink(false);
        this.white.led.blink(false);

        switch (this.state) {
            case GameStates.Explode:
                this.blue.led.blink(true, 50);
                this.yellow.led.blink(true, 55);
                this.white.led.blink(true, 60);
                break;
        }
    }

    protected blink(doBlink: boolean): void {
        console.log('Buttons: doBlink', doBlink);

    }

    handleValueChange(channel: number, value: any) {

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
