import * as gpio from "rpi-gpio";
import {LED} from "./led";
import {Switch} from "./switch";


/**
 * A button(switch) with an led
 */
export class ButtonLED {

    public readonly led: LED;
    public readonly button: Switch;

    constructor(protected _gpio: typeof gpio, protected _buttonPin: number, protected _ledPin: number) {
       this.led = new LED(_gpio, _ledPin);
       this.button = new Switch(_gpio, _buttonPin);
    }
}
