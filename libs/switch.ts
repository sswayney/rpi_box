import * as gpio from "rpi-gpio";
import {Pin} from "./pin";

/**
 * Class to abstract a switch
 */
export class Switch extends Pin {

    public readonly ready: Promise<boolean>;

    constructor(_gpio: typeof gpio, _pin: number) {
        super(_gpio, _pin);
        this.ready = _gpio.promise.setup(_pin, gpio.DIR_IN, gpio.EDGE_BOTH);
    }

    public async getValue(): Promise<boolean> {
        await this.ready;
        return await this._gpio.promise.read(this._pin);
    }
}
