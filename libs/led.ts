import * as gpio from "rpi-gpio";
import {interval, Subscription} from "rxjs";
import {map, takeWhile, tap} from "rxjs/operators";
import {Pin} from "./pin";

/**
 * Class to abstract an led
 */
export class LED extends Pin {

    public readonly ready: Promise<boolean>;

    get value(): boolean {
        return this._value;
    }

    protected _value: boolean;
    protected doBlink = false;
    protected delay = 500;
    protected interval: Subscription;

    constructor(_gpio: typeof gpio, _pin: number) {
        super(_gpio, _pin);
        this.ready = _gpio.promise.setup(_pin, gpio.DIR_OUT);
    }

    public on(): void {
        console.log(`LED ${this._pin} on`);
        this._gpio.write(this._pin, true);
        this._value = true;
    }

    public off(): void {
        console.log(`LED ${this._pin} off`);
        this._gpio.write(this._pin, false);
        this._value = false;
    }

    public blink(doBlink: boolean, delay: number = 1000, onTime: number = 500): void {
        // console.log('blink: doBlink :' + doBlink, delay)

        if (doBlink && !this.doBlink) {
            this.delay = delay;
            this.doBlink = true;

            if (!this.interval || this.interval.closed) {
                this.interval = interval(this.delay).pipe(takeWhile(() => this.doBlink),
                    tap(val => this.blip(onTime))).subscribe();
            }
        } else {
            this.doBlink = false;
            this.interval ? this.interval.unsubscribe() : null;
            this.off();
        }
    }

    public blip(time: number = 100): void {
        this.on();
        setTimeout(() => this.off(), time);
    }
}
