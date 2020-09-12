import * as gpio from 'rpi-gpio';
import {PINS} from "../libs/pins.enum";
import {Switch} from "../libs/switch";

export class Switches {

    public green = new Switch(gpio, PINS.pin12_green_switch1);
    public red = new Switch(gpio, PINS.pin16_red_switch2);

    constructor(){}
}
