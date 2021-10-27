"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pigpio_1 = require("pigpio");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/**
 * Class to abstract a Distance Sensor - UltraSonic Ranging
 * Hardware HCSR04
 */
var HCSR04 = /** @class */ (function () {
    function HCSR04(_triggerGpio, _echoGpio) {
        this.distanceBehaviorSubject$ = new rxjs_1.BehaviorSubject(0);
        // The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
        this.MICROSECONDS_PER_CM = 1e6 / 34321;
        this.trigger = new pigpio_1.Gpio(_triggerGpio, { mode: pigpio_1.Gpio.OUTPUT });
        this.echo = new pigpio_1.Gpio(_echoGpio, { mode: pigpio_1.Gpio.INPUT, alert: true });
    }
    Object.defineProperty(HCSR04.prototype, "distance$", {
        get: function () {
            return this.distanceBehaviorSubject$.asObservable().pipe(
            // AVERAGE OUT THE DISTANCE
            operators_1.scan(function (acc, curr) {
                acc.push(curr);
                if (acc.length > 30) {
                    acc.shift();
                }
                return acc;
            }, []), operators_1.map(function (arr) { return arr.reduce(function (acc, current) { return acc + current; }, 0) / arr.length; }));
        },
        enumerable: true,
        configurable: true
    });
    HCSR04.prototype.init = function () {
        var _this = this;
        this.trigger.digitalWrite(0); // Make sure trigger is low
        var watchHCSR04 = function () {
            var startTick;
            _this.echo.on('alert', function (level, tick) {
                // .log('Alert: LEVEL: ' + level + ' TICK: ' + tick);
                if (level == 1) {
                    startTick = tick;
                }
                else {
                    var endTick = tick;
                    var diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
                    var distance = diff / 2 / _this.MICROSECONDS_PER_CM;
                    // console.log('Distance ' + distance);
                    _this.distanceBehaviorSubject$.next(distance);
                }
            });
        };
        watchHCSR04();
        // Trigger a distance measurement once per second
        setInterval(function () {
            _this.trigger.trigger(10, 1); // Set trigger high for 10 microseconds
        }, 50);
    };
    return HCSR04;
}());
exports.HCSR04 = HCSR04;
//# sourceMappingURL=hc-sr04.js.map