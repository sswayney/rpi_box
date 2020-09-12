"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gpio = require("rpi-gpio");
var button_led_1 = require("../libs/button-led");
var pins_enum_1 = require("../libs/pins.enum");
var Buttons = /** @class */ (function () {
    function Buttons() {
        /**
         * Buttons with LEDS
         */
        this.blue = new button_led_1.ButtonLED(gpio, pins_enum_1.PINS.pin40_buttonBlue, pins_enum_1.PINS.pin38_buttonBlue);
        this.yellow = new button_led_1.ButtonLED(gpio, pins_enum_1.PINS.pin37_buttonYellow, pins_enum_1.PINS.pin36_buttonYellow);
        this.white = new button_led_1.ButtonLED(gpio, pins_enum_1.PINS.pin35_buttonWhite, pins_enum_1.PINS.pin33_buttonWhite);
    }
    Buttons.prototype.update = function (channel, value) {
        switch (channel) {
            case pins_enum_1.PINS.pin12_green_switch1:
                value ? this.blue.led.on() : this.blue.led.off();
                value ? this.yellow.led.on() : this.yellow.led.off();
                value ? this.white.led.on() : this.white.led.off();
                break;
            case pins_enum_1.PINS.pin16_red_switch2:
                this.blue.led.blink(value);
                this.yellow.led.blink(value);
                this.white.led.blink(value);
                break;
            case this.blue.button.pin:
                value ? this.blue.led.on() : this.blue.led.off();
                break;
            case this.yellow.button.pin:
                value ? this.yellow.led.on() : this.yellow.led.off();
                break;
            case this.white.button.pin:
                value ? this.white.led.on() : this.white.led.off();
                break;
        }
    };
    return Buttons;
}());
exports.Buttons = Buttons;
//# sourceMappingURL=buttons.js.map