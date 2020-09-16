"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var gpio = require("rpi-gpio");
var pins_enum_1 = require("../../libs/pins.enum");
var tm1637_1 = require("../../libs/tm1637");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/**
 * CountDown class that uses a Seven Segment display
 */
var CountDown = /** @class */ (function () {
    function CountDown() {
        var _this = this;
        this.doCountDown = false;
        this.delay = 1000;
        this.seconds = 120;
        this.sevenSegment = new tm1637_1.TM1637(gpio, pins_enum_1.PINS.pin11_clk, pins_enum_1.PINS.pin7_dio);
        this.sevenSegment.ready.then((function (value) { return _this.sevenSegment.setText('    '); }));
    }
    CountDown.prototype.text = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sevenSegment.setText(value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
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
                this.interval = rxjs_1.interval(this.delay).pipe(operators_1.takeWhile(function () { return _this.doCountDown; }), operators_1.map(function (val) { return _this.seconds - val; }), operators_1.tap(function (val) { return console.log('seconds ' + val); }), operators_1.map(function (val) { return "" + ~~(val / 60) + ('' + (val % 60)).padStart(2, 0 + ''); }), operators_1.tap(function (val) { return console.log('value ' + val); }), operators_1.tap(function (val) { return _this.text(val); })).subscribe();
            }
        }
        else {
            this.doCountDown = false;
            this.interval ? this.interval.unsubscribe() : null;
        }
    };
    CountDown.prototype.showTime = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dateStringRay, hours, minutes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Showing Time');
                        dateStringRay = new Date().toLocaleTimeString().split(':');
                        hours = dateStringRay[0];
                        hours = hours.length === 1 ? '0' + hours : hours;
                        minutes = dateStringRay[1];
                        minutes = minutes.length === 1 ? '0' + minutes : minutes;
                        return [4 /*yield*/, this.text(hours + minutes)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CountDown;
}());
exports.CountDown = CountDown;
//# sourceMappingURL=count-down.js.map