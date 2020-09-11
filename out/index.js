"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gpio = require("rpi-gpio");
var button_led_1 = require("./libs/button-led");
var switch_1 = require("./libs/switch");
var tm1637_1 = require("./libs/tm1637");
/**
 * Output pins
 */
var OutputPins;
(function (OutputPins) {
    OutputPins[OutputPins["pin38_buttonBlue"] = 38] = "pin38_buttonBlue";
    OutputPins[OutputPins["pin36_buttonYellow"] = 36] = "pin36_buttonYellow";
    OutputPins[OutputPins["pin33_buttonWhite"] = 33] = "pin33_buttonWhite";
})(OutputPins || (OutputPins = {}));
/**
 * Input pins
 */
var InputPins;
(function (InputPins) {
    InputPins[InputPins["pin7_dio"] = 7] = "pin7_dio";
    InputPins[InputPins["pin11_clk"] = 11] = "pin11_clk";
    InputPins[InputPins["pin12_switch1"] = 12] = "pin12_switch1";
    InputPins[InputPins["pin16_switch2"] = 16] = "pin16_switch2";
    InputPins[InputPins["pin35_buttonWhite"] = 35] = "pin35_buttonWhite";
    InputPins[InputPins["pin37_buttonYellow"] = 37] = "pin37_buttonYellow";
    InputPins[InputPins["pin40_buttonBlue"] = 40] = "pin40_buttonBlue";
})(InputPins || (InputPins = {}));
var greenSwitch = new switch_1.Switch(gpio, InputPins.pin12_switch1);
var redSwitch = new switch_1.Switch(gpio, InputPins.pin16_switch2);
var blueButton = new button_led_1.ButtonLED(gpio, InputPins.pin40_buttonBlue, OutputPins.pin38_buttonBlue);
var yellowButton = new button_led_1.ButtonLED(gpio, InputPins.pin37_buttonYellow, OutputPins.pin36_buttonYellow);
var whiteButton = new button_led_1.ButtonLED(gpio, InputPins.pin35_buttonWhite, OutputPins.pin33_buttonWhite);
var tm = new tm1637_1.TM1637(gpio, InputPins.pin11_clk, InputPins.pin7_dio);
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
            var dateStringRay = new Date().toLocaleTimeString().split(':');
            var hours = dateStringRay[0];
            hours = hours.length === 1 ? '0' + hours : hours;
            var minutes = dateStringRay[1];
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
    };
}
//# sourceMappingURL=index.js.map