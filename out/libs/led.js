"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var gpio = require("rpi-gpio");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var pin_1 = require("./pin");
/**
 * Class to abstract an led
 */
var LED = /** @class */ (function (_super) {
    __extends(LED, _super);
    function LED(_gpio, _pin) {
        var _this = _super.call(this, _gpio, _pin) || this;
        _this.doBlink = false;
        _this.delay = 500;
        _gpio.setup(_pin, gpio.DIR_OUT);
        return _this;
    }
    Object.defineProperty(LED.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    LED.prototype.on = function () {
        console.log("LED " + this._pin + " on");
        this._gpio.write(this._pin, true);
        this._value = true;
    };
    LED.prototype.off = function () {
        console.log("LED " + this._pin + " off");
        this._gpio.write(this._pin, false);
        this._value = false;
    };
    LED.prototype.blink = function (doBlink, delay) {
        var _this = this;
        if (delay === void 0) { delay = 500; }
        console.log('blink: doBlink :' + doBlink, delay);
        if (doBlink && !this.doBlink) {
            this.delay = delay;
            this.doBlink = true;
            if (!this.interval || this.interval.closed) {
                this.interval = rxjs_1.interval(this.delay).pipe(operators_1.takeWhile(function () { return _this.doBlink; }), operators_1.map(function (val) { return val % 2 === 0; }), operators_1.tap(function (val) { return val ? _this.on() : _this.off(); })).subscribe();
            }
        }
        else {
            this.doBlink = false;
            this.interval ? this.interval.unsubscribe() : null;
            this.off();
        }
    };
    return LED;
}(pin_1.Pin));
exports.LED = LED;
//# sourceMappingURL=led.js.map