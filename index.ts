import * as gpio from 'rpi-gpio';
import {ButtonLED} from "./libs/button-led";
import {LCD} from "./libs/lcdi2c";
import {LED} from './libs/led';
import {Switch} from "./libs/switch";
import {TM1637} from "./libs/tm1637";

/**
 * Output pins
 */
enum OutputPins {
    pin38_buttonBlue = 38,
    pin36_buttonYellow = 36,
    pin33_buttonWhite = 33
}

/**
 * Input pins
 */
enum InputPins {
    pin7_dio = 7,
    pin11_clk = 11,
    pin12_switch1 = 12,
    pin16_switch2 = 16,
    pin35_buttonWhite = 35,
    pin37_buttonYellow = 37,
    pin40_buttonBlue = 40
}

/**
 * Switches
 */
const greenSwitch = new Switch(gpio, InputPins.pin12_switch1);
const redSwitch = new Switch(gpio, InputPins.pin16_switch2);

/**
 * Buttons with LEDS
 */
const blueButton = new ButtonLED(gpio, InputPins.pin40_buttonBlue, OutputPins.pin38_buttonBlue);
const yellowButton = new ButtonLED(gpio, InputPins.pin37_buttonYellow, OutputPins.pin36_buttonYellow);
const whiteButton = new ButtonLED(gpio, InputPins.pin35_buttonWhite, OutputPins.pin33_buttonWhite);

/**
 * 7 segment display
 */
const tm = new TM1637(gpio, InputPins.pin11_clk, InputPins.pin7_dio);

var lcd = new LCD(1, 0x27, 16,2);

lcd.clear();
lcd.println('Line one',1);
lcd.println('Line Two!!!',2);

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
                case greenSwitch.pin:
                    value ? blueButton.led.on() : blueButton.led.off();
                    value ? yellowButton.led.on() : yellowButton.led.off();
                    value ? whiteButton.led.on() : whiteButton.led.off();
                    break;
                case redSwitch.pin:
                    blueButton.led.blink(value);
                    yellowButton.led.blink(value);
                    whiteButton.led.blink(value);
                    break;
                case blueButton.button.pin:
                    value ? blueButton.led.on() : blueButton.led.off();
                    break;
                case yellowButton.button.pin:
                    value ? yellowButton.led.on() : yellowButton.led.off();
                    break;
                case whiteButton.button.pin:
                    value ? whiteButton.led.on() : whiteButton.led.off();
                    break;
            }

            console.log('Saying Hello');
            const dateStringRay = new Date().toLocaleTimeString().split(':');
            let hours = dateStringRay[0];
            hours = hours.length === 1 ? '0' + hours : hours;
            let minutes = dateStringRay[1];
            minutes = minutes.length === 1 ? '0' + minutes : minutes;

            tm.text = hours + minutes;

            // console.log('Showing 2130');
            // tm.text="2130";     // Shows "21:30"
            // tm.split=true;      //
            //
            // tm.text="foo";      //
            // tm.alignLeft=false; // Shows " foo"
            // tm.alignLeft=true;  // Shows "foo "
        }
    }

}





