import * as gpio from 'rpi-gpio';
import {PINS} from "../../libs/pins.enum";
import {Switch} from "../../libs/switch";

export class Switches {

    private readonly ready: Promise<[boolean, boolean]>;
    public readonly green = new Switch(gpio, PINS.pin12_green_switch1);
    public readonly red = new Switch(gpio, PINS.pin16_red_switch2);

    constructor(){
        this.ready = Promise.all([this.green.ready, this.red.ready]);
    }
}
