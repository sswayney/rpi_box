import * as gpio from 'rpi-gpio';
import {PINS} from "../libs/pins.enum";
import {TM1637} from "../libs/tm1637";
import {Updateable} from "./intefaces/updateable";
import { Subscription, interval } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';

/**
 * CountDown class that uses a Seven Segment display
 */
export class CountDown implements Updateable {

    set text(value: string) {
        this.sevenSegment.split = true;
        this.sevenSegment.text = value;
    }

    protected doCountDown = false;
    protected delay = 500;
    protected interval: Subscription;

    protected sevenSegment = new TM1637(gpio, PINS.pin11_clk, PINS.pin7_dio);

    constructor() {}

    update(channel: number, value: any) {
        switch (channel) {
            case PINS.pin12_green_switch1:
                this.countDown(value);
                break;
        }
    }

    protected countDown(doCountDown: boolean): void {
        console.log('CountDown: doCountDown');

        if (doCountDown && !this.doCountDown) {
            this.doCountDown = true;

            if (!this.interval || this.interval.closed) {
                this.interval = interval(this.delay).pipe(takeWhile(() => this.doCountDown),
                    tap(val => this.text = val + '')).subscribe();
            }
        } else {
            this.doCountDown = false;
            this.interval ? this.interval.unsubscribe() : null;
        }
    }
}
