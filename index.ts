import * as gpio from 'rpi-gpio';
import {LED} from './libs/led';
import {Switch} from "./libs/switch";
import {TM1637} from "./libs/tm1637";


const CLKPIN = 22;
const DIOPIN = 18;
const tm = new TM1637(gpio, CLKPIN, DIOPIN);
console.log('Created TM');
// 4 characters max. Extra characters will be ignored

console.log('Saying Hello');
tm.text="helo";     // Shows "helo"

console.log('Showing 2130');
tm.text="2130";     // Shows "21:30"
tm.split=true;      //

tm.text="foo";      //
tm.alignLeft=false; // Shows " foo"
tm.alignLeft=true;  // Shows "foo "

/**
 * Output led
 */
enum OutputPins {
    pin7_led1 = 7
}

const led1 = new LED(gpio, OutputPins.pin7_led1);
/**
 * Input switches
 */
enum InputPins {
    pin12_switch1 = 12,
    pin16_switch2 = 16
}

const switch1 = new Switch(gpio, InputPins.pin12_switch1);
const switch2 = new Switch(gpio, InputPins.pin16_switch2);

/**
 * Value change listener
 */
gpio.on('change', channelValueListener());


function channelValueListener(): (...args: any[]) => void {
    const lastValues: Map<any, any> = new Map();
    return (channel, value) => {
        if (lastValues.get(channel) !== value) {
            lastValues.set(channel, value);
            console.log('Channel ' + channel + ' value is now ' + value);

            switch (channel) {
                case switch1.pin:
                    value ? led1.on() : led1.off();
                    break;
                case switch2.pin:
                    led1.blink(value);
                    break;
            }
        }
    }

}


