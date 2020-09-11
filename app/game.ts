import * as gpio from 'rpi-gpio';
import {ButtonLED} from "../libs/button-led";
import {LCD} from "../libs/lcdi2c";
import {PINS} from "../libs/pins.enum";
import {Switch} from "../libs/switch";
import {TM1637} from "../libs/tm1637";


export class Game {

    /**
     * Switches
     */
    protected greenSwitch = new Switch(gpio, PINS.pin12_switch1);
    protected redSwitch = new Switch(gpio, PINS.pin16_switch2);

    /**
     * Buttons with LEDS
     */
    protected blueButton = new ButtonLED(gpio, PINS.pin40_buttonBlue, PINS.pin38_buttonBlue);
    protected yellowButton = new ButtonLED(gpio, PINS.pin37_buttonYellow, PINS.pin36_buttonYellow);
    protected whiteButton = new ButtonLED(gpio, PINS.pin35_buttonWhite, PINS.pin33_buttonWhite);

    /**
     * 7 segment display
     */
    protected sevenSegment = new TM1637(gpio, PINS.pin11_clk, PINS.pin7_dio);

    /**
     * LCD display
     * Uses pins 3 and 5
     */
    protected lcd = new LCD(1, 0x27, 16,2);

    constructor() {}

    public start(): void {

        this.lcd.clear();
        this.lcd.println('Line one',1);
        this.lcd.println('Line Two!!!',2);

        /**
         * Value change listener
         */
        gpio.on('change', channelValueListener());


        function channelValueListener(): (...args: any[]) => void {
            const lastValues: Map<any, any> = new Map();
            return (channel, value) => {
                const _this = this;
                if (lastValues.get(channel) !== value) {
                    lastValues.set(channel, value);
                    console.log('Channel ' + channel + ' value is now ' + value);

                    switch (channel) {
                        case _this.greenSwitch.pin:
                            value ? _this.blueButton.led.on() : _this.blueButton.led.off();
                            value ? _this.yellowButton.led.on() : _this.yellowButton.led.off();
                            value ? _this.whiteButton.led.on() : _this.whiteButton.led.off();
                            break;
                        case _this.redSwitch.pin:
                            _this.blueButton.led.blink(value);
                            _this.yellowButton.led.blink(value);
                            _this.whiteButton.led.blink(value);
                            break;
                        case _this.blueButton.button.pin:
                            value ? _this.blueButton.led.on() : _this.blueButton.led.off();
                            break;
                        case _this.yellowButton.button.pin:
                            value ? _this.yellowButton.led.on() : _this.yellowButton.led.off();
                            break;
                        case _this.whiteButton.button.pin:
                            value ? _this.whiteButton.led.on() : _this.whiteButton.led.off();
                            break;
                    }

                    console.log('Saying Hello');
                    const dateStringRay = new Date().toLocaleTimeString().split(':');
                    let hours = dateStringRay[0];
                    hours = hours.length === 1 ? '0' + hours : hours;
                    let minutes = dateStringRay[1];
                    minutes = minutes.length === 1 ? '0' + minutes : minutes;

                    _this.sevenSegment.text = hours + minutes;
                }
            }

        }







    }
}
