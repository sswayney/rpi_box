"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var led_1 = require("./led");
var switch_1 = require("./switch");
var ButtonLED = /** @class */ (function () {
    function ButtonLED(_gpio, _buttonPin, _ledPin) {
        this._gpio = _gpio;
        this._buttonPin = _buttonPin;
        this._ledPin = _ledPin;
        this.led = new led_1.LED(_gpio, _ledPin);
        this.button = new switch_1.Switch(_gpio, _buttonPin);
    }
    return ButtonLED;
}());
exports.ButtonLED = ButtonLED;
//# sourceMappingURL=button-led.js.map