"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gpio = require("rpi-gpio");
var pins_enum_1 = require("../libs/pins.enum");
var tm1637_1 = require("../libs/tm1637");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/**
 * CountDown class that uses a Seven Segment display
 */
var CountDown = /** @class */ (function () {
    function CountDown() {
        this.doCountDown = false;
        this.delay = 500;
        this.sevenSegment = new tm1637_1.TM1637(gpio, pins_enum_1.PINS.pin11_clk, pins_enum_1.PINS.pin7_dio);
    }
    Object.defineProperty(CountDown.prototype, "text", {
        set: function (value) {
            this.sevenSegment.split = true;
            this.sevenSegment.text = value;
        },
        enumerable: true,
        configurable: true
    });
    CountDown.prototype.update = function (channel, value) {
        switch (channel) {
            case pins_enum_1.PINS.pin12_green_switch1:
                this.countDown(value);
                break;
        }
    };
    CountDown.prototype.countDown = function (doCountDown) {
        var _this = this;
        console.log('CountDown: doCountDown');
        if (doCountDown && !this.doCountDown) {
            this.doCountDown = true;
            if (!this.interval || this.interval.closed) {
                this.interval = rxjs_1.interval(this.delay).pipe(operators_1.takeWhile(function () { return _this.doCountDown; }), operators_1.tap(function (val) { return _this.text = val + ''; })).subscribe();
            }
        }
        else {
            this.doCountDown = false;
            this.interval ? this.interval.unsubscribe() : null;
        }
    };
    return CountDown;
}());
exports.CountDown = CountDown;
//# sourceMappingURL=count-down.js.map