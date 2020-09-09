"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gpio = require("rpi-gpio");
var led_1 = require("./libs/led");
var switch_1 = require("./libs/switch");
var tm1637_1 = require("./libs/tm1637");
var CLKPIN = 15;
var DIOPIN = 18;
var tm = new tm1637_1.TM1637(CLKPIN, DIOPIN);
// 4 characters max. Extra characters will be ignored
tm.text = "helo"; // Shows "helo"
tm.text = "2130"; // Shows "21:30"
tm.split = true; //
tm.text = "foo"; //
tm.alignLeft = false; // Shows " foo"
tm.alignLeft = true; // Shows "foo "
/**
 * Output led
 */
var OutputPins;
(function (OutputPins) {
    OutputPins[OutputPins["pin7_led1"] = 7] = "pin7_led1";
})(OutputPins || (OutputPins = {}));
var led1 = new led_1.LED(gpio, OutputPins.pin7_led1);
/**
 * Input switches
 */
var InputPins;
(function (InputPins) {
    InputPins[InputPins["pin12_switch1"] = 12] = "pin12_switch1";
    InputPins[InputPins["pin16_switch2"] = 16] = "pin16_switch2";
})(InputPins || (InputPins = {}));
var switch1 = new switch_1.Switch(gpio, InputPins.pin12_switch1);
var switch2 = new switch_1.Switch(gpio, InputPins.pin16_switch2);
/**
 * Value change listener
 */
gpio.on('change', channelValueListener());
function channelValueListener() {
    var lastValues = new Map();
    return function (channel, value) {
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
    };
}
//# sourceMappingURL=index.js.map