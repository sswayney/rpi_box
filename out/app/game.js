"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gpio = require("rpi-gpio");
var button_led_1 = require("../libs/button-led");
var lcdi2c_1 = require("../libs/lcdi2c");
var pins_enum_1 = require("../libs/pins.enum");
var switch_1 = require("../libs/switch");
var tm1637_1 = require("../libs/tm1637");
var Game = /** @class */ (function () {
    function Game() {
        /**
         * Switches
         */
        this.greenSwitch = new switch_1.Switch(gpio, pins_enum_1.PINS.pin12_switch1);
        this.redSwitch = new switch_1.Switch(gpio, pins_enum_1.PINS.pin16_switch2);
        /**
         * Buttons with LEDS
         */
        this.blueButton = new button_led_1.ButtonLED(gpio, pins_enum_1.PINS.pin40_buttonBlue, pins_enum_1.PINS.pin38_buttonBlue);
        this.yellowButton = new button_led_1.ButtonLED(gpio, pins_enum_1.PINS.pin37_buttonYellow, pins_enum_1.PINS.pin36_buttonYellow);
        this.whiteButton = new button_led_1.ButtonLED(gpio, pins_enum_1.PINS.pin35_buttonWhite, pins_enum_1.PINS.pin33_buttonWhite);
        /**
         * 7 segment display
         */
        this.sevenSegment = new tm1637_1.TM1637(gpio, pins_enum_1.PINS.pin11_clk, pins_enum_1.PINS.pin7_dio);
        /**
         * LCD display
         * Uses pins 3 and 5
         */
        this.lcd = new lcdi2c_1.LCD(1, 0x27, 16, 2);
    }
    Game.prototype.start = function () {
        this.lcd.clear();
        this.lcd.println('Line one', 1);
        this.lcd.println('Line Two!!!', 2);
        /**
         * Value change listener
         */
        gpio.on('change', this.channelValueListener());
    };
    Game.prototype.channelValueListener = function () {
        var _this = this;
        var lastValues = new Map();
        return function (channel, value) {
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
                var dateStringRay = new Date().toLocaleTimeString().split(':');
                var hours = dateStringRay[0];
                hours = hours.length === 1 ? '0' + hours : hours;
                var minutes = dateStringRay[1];
                minutes = minutes.length === 1 ? '0' + minutes : minutes;
                _this.sevenSegment.text = hours + minutes;
            }
        };
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map