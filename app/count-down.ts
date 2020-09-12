import * as gpio from 'rpi-gpio';
import {PINS} from "../libs/pins.enum";
import {TM1637} from "../libs/tm1637";


/**
 * CountDown class that uses a Seven Segment display
 */
export class CountDown {

    set text(value: string) {
        this.sevenSegment.text = value;
    }

    protected sevenSegment = new TM1637(gpio, PINS.pin11_clk, PINS.pin7_dio);

    constructor() {
        this.sevenSegment.split = true;
    }
}
