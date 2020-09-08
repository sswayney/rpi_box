import * as gpio from "rpi-gpio";

/**
 * Basic pin
 */
export class Pin {
    constructor(protected _gpio: typeof gpio, protected _pin: number) {
    }

    get pin(): number {
        return this._pin;
    }
}
