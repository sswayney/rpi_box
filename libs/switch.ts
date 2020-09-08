import * as gpio from "rpi-gpio";
import {Pin} from "./pin";

/**
 * Class to abstract a switch
 */
export class Switch extends Pin {

    constructor(_gpio: typeof gpio, _pin: number) {
        super(_gpio, _pin);
        _gpio.setup(_pin, gpio.DIR_IN, gpio.EDGE_BOTH);
    }
}
