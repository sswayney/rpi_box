import * as gpio from 'rpi-gpio';
import {ButtonLED} from "../../libs/button-led";
import {PINS} from "../../libs/pins.enum";
import {Updateable} from "../intefaces/updateable";


export class Buttons implements Updateable {

    /**
     * Buttons with LEDS
     */
    public blue = new ButtonLED(gpio, PINS.pin40_buttonBlue, PINS.pin38_buttonBlue);
    public yellow = new ButtonLED(gpio, PINS.pin37_buttonYellow, PINS.pin36_buttonYellow);
    public white = new ButtonLED(gpio, PINS.pin35_buttonWhite, PINS.pin33_buttonWhite);

    constructor(){}

    update(channel: number, value: any) {

        switch (channel) {
            case PINS.pin12_green_switch1:
                value ? this.blue.led.on() : this.blue.led.off();
                value ? this.yellow.led.on() : this.yellow.led.off();
                value ? this.white.led.on() : this.white.led.off();
                break;
            case PINS.pin16_red_switch2:
                this.blue.led.blink(value);
                this.yellow.led.blink(value);
                this.white.led.blink(value);
                break;
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
