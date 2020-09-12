import * as gpio from 'rpi-gpio';
import {PINS} from "../libs/pins.enum";
import {TM1637} from "../libs/tm1637";


export class SevenSegment extends TM1637 {
    constructor() {
        super(gpio, PINS.pin11_clk, PINS.pin7_dio)
    }
}
