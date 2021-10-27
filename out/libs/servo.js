"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const Gpio = require('pigpio').Gpio;
var pigpio_1 = require("pigpio");
/**
 * Class to abstract a Servo
 */
var Servo = /** @class */ (function () {
    function Servo(_gpioNumber) {
        this._MaxPulseWidth = 2000;
        this._MinPulseWidth = 1000;
        this.motor = new pigpio_1.Gpio(_gpioNumber, { mode: pigpio_1.Gpio.OUTPUT });
    }
    Servo.prototype.init = function () {
        var _this = this;
        var pulseWidth = 1000;
        var increment = 100;
        setInterval(function () {
            _this.motor.servoWrite(pulseWidth);
            pulseWidth += increment;
            if (pulseWidth >= _this._MaxPulseWidth) {
                increment = -100;
            }
            else if (pulseWidth <= _this._MinPulseWidth) {
                increment = 100;
            }
        }, 1000);
    };
    Servo.prototype.setAngle = function (angle) {
        var pulseWidth = this.map(angle);
        console.debug('Servo Writing Pulse Width from angle: {}', pulseWidth);
        this.motor.servoWrite(pulseWidth);
    };
    Servo.prototype.setPulseWidth = function (pulseWidth) {
        // console.debug('Servo Writing Pulse Width: {}', pulseWidth);
        if (pulseWidth > 2500) {
            pulseWidth = 2500;
        }
        if (pulseWidth < 500) {
            pulseWidth = 500;
        }
        pulseWidth = Math.floor(pulseWidth);
        // console.debug('Fixed Pulse Width: {}', pulseWidth);
        this.motor.servoWrite(pulseWidth);
    };
    Servo.prototype.map = function (value, fromLow, fromHigh, toLow, toHigh) {
        if (fromLow === void 0) { fromLow = 0; }
        if (fromHigh === void 0) { fromHigh = 180; }
        if (toLow === void 0) { toLow = 500; }
        if (toHigh === void 0) { toHigh = 2500; }
        if (value > fromHigh) {
            value = fromHigh;
        }
        if (value < fromLow) {
            value = fromLow;
        }
        return Math.floor((toHigh - toLow) * (value - fromLow) / (fromHigh - fromLow) + toLow);
    };
    return Servo;
}());
exports.Servo = Servo;
//# sourceMappingURL=servo.js.map