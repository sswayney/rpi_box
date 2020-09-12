"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gpio = require("rpi-gpio");
var pins_enum_1 = require("../libs/pins.enum");
var tm1637_1 = require("../libs/tm1637");
/**
 * CountDown class that uses a Seven Segment display
 */
var CountDown = /** @class */ (function () {
    function CountDown() {
        this.sevenSegment = new tm1637_1.TM1637(gpio, pins_enum_1.PINS.pin11_clk, pins_enum_1.PINS.pin7_dio);
        this.sevenSegment.split = true;
    }
    Object.defineProperty(CountDown.prototype, "text", {
        set: function (value) {
            this.sevenSegment.text = value;
        },
        enumerable: true,
        configurable: true
    });
    return CountDown;
}());
exports.CountDown = CountDown;
//# sourceMappingURL=count-down.js.map