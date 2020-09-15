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
/**
 * Class created to set up and write text to TM1637 seven segment display
 */
var TM1637 = /** @class */ (function () {
    /**
     * Constructor
     * @param _gpio ref to GPIO
     * @param pinClk click channel
     * @param pinDIO DIO channel
     */
    function TM1637(_gpio, pinClk, pinDIO) {
        this._gpio = _gpio;
        this.pinClk = pinClk;
        this.pinDIO = pinDIO;
        /**
         * Text to be displayed in
         */
        this._text = '';
        /**
         * If true, the colon : will be displayed
         */
        this._split = false;
        /**
         * If true, output to the display with be left aligned
         */
        this._alignLeft = false;
        /**
         * Default to high for CLK & DIO
         */
        this.ready = Promise.all([
            _gpio.promise.setup(pinClk, _gpio.DIR_OUT, _gpio.EDGE_BOTH),
            _gpio.promise.setup(pinDIO, _gpio.DIR_OUT, _gpio.EDGE_BOTH)
        ]).then(function (val) {
            _gpio.write(pinClk, true);
            _gpio.write(pinDIO, true);
            return val;
        });
        console.log('TM1637: Constructor finished');
    }
    Object.defineProperty(TM1637.prototype, "split", {
        /**
         * Set the split value
         * @param split
         */
        set: function (split) {
            this._split = split;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TM1637.prototype, "alignLeft", {
        /**
         * Set the alignLeft value
         * @param alignLeft
         */
        set: function (alignLeft) {
            this._alignLeft = alignLeft;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set the text to be displayed
     * @param text
     */
    TM1637.prototype.setText = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // console.log('setText: message ' + message);
                        this._text = text.substring(0, 4);
                        return [4 /*yield*/, this.sendData()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set channel to high
     * @param pin
     */
    TM1637.prototype.high = function (pin) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._gpio.promise.write(pin, true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set channel to low
     * @param pin
     */
    TM1637.prototype.low = function (pin) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._gpio.promise.write(pin, false)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set the Start condition by setting DIO to low
     */
    TM1637.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.low(this.pinDIO)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Write a byte
     * @param byte
     */
    TM1637.prototype.writeByte = function (byte) {
        return __awaiter(this, void 0, void 0, function () {
            var b, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        b = byte;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 8)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.writeBit(b & 0x01)];
                    case 2:
                        _a.sent();
                        b >>= 1;
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.Ack()];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Write a bit.
     * @param value
     */
    TM1637.prototype.writeBit = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Rising edge
                    return [4 /*yield*/, this.low(this.pinClk)];
                    case 1:
                        // Rising edge
                        _a.sent();
                        if (!value) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.high(this.pinDIO)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.low(this.pinDIO)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: 
                    // Reset the clock back to high
                    return [4 /*yield*/, this.high(this.pinClk)];
                    case 6:
                        // Reset the clock back to high
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * ACK
     */
    TM1637.prototype.Ack = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Falling Edge 8
                    return [4 /*yield*/, this.low(this.pinClk)];
                    case 1:
                        // Falling Edge 8
                        _a.sent();
                        // 9th rising edge
                        return [4 /*yield*/, this.high(this.pinClk)];
                    case 2:
                        // 9th rising edge
                        _a.sent();
                        // 9th falling edge
                        return [2 /*return*/, this.low(this.pinClk)];
                }
            });
        });
    };
    /**
     * Stop: clock low in, high out
     */
    TM1637.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // pinDIO  low -> high  when clock is high
                    return [4 /*yield*/, this.low(this.pinDIO)];
                    case 1:
                        // pinDIO  low -> high  when clock is high
                        _a.sent();
                        return [4 /*yield*/, this.high(this.pinClk)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.high(this.pinDIO)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Writes out the text to the display
     */
    TM1637.prototype.sendData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var numsEncoded, i, ind, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        numsEncoded = [null, null, null, null];
                        for (i = this._text.length; i >= 0; i--) {
                            ind = charMap.get(this._text[i]) || 0;
                            if (ind)
                                if (!this._alignLeft) {
                                    numsEncoded[(4 - this._text.length) + i] = ind;
                                }
                                else {
                                    numsEncoded[i] = ind;
                                }
                        }
                        if (this._split)
                            numsEncoded[1] = numsEncoded[1] | 128; // the x of 2nd pos
                        return [4 /*yield*/, this.start()];
                    case 1:
                        _a.sent(); // Data command settings
                        return [4 /*yield*/, this.writeByte(64)];
                    case 2:
                        _a.sent(); // Normal mode, automatic address increase, write data to display register
                        return [4 /*yield*/, this.stop()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.start()];
                    case 4:
                        _a.sent(); // Address Command Settings
                        return [4 /*yield*/, this.writeByte(192)];
                    case 5:
                        _a.sent(); // Address start bit starts from 0
                        i = 0;
                        _a.label = 6;
                    case 6:
                        if (!(i < numsEncoded.length)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.writeByte(numsEncoded[i])];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 6];
                    case 9: return [4 /*yield*/, this.stop()];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, this.start()];
                    case 11:
                        _a.sent(); // Address command settings
                        return [4 /*yield*/, this.writeByte(143)];
                    case 12:
                        _a.sent(); // Display control command settings, open, brightness is 111
                        return [4 /*yield*/, this.stop()];
                    case 13:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TM1637;
}());
exports.TM1637 = TM1637;
/**
 * Maps a char to its hexadecimal value representation per seven segment display
 */
var charMap = new Map([
    ['0', 63],
    ['1', 6],
    ['2', 91],
    ['3', 79],
    ['4', 102],
    ['5', 109],
    ['6', 125],
    ['7', 7],
    ['8', 127],
    ['9', 111],
    ['A', 119],
    ['a', 95],
    ['B', 127],
    ['b', 124],
    ['C', 57],
    ['c', 88],
    ['D', 63],
    ['d', 94],
    ['E', 121],
    ['e', 123],
    ['F', 113],
    ['f', 113],
    ['G', 61],
    ['g', 111],
    ['H', 118],
    ['h', 116],
    ['I', 6],
    ['i', 4],
    ['J', 30],
    ['j', 14],
    ['K', 118],
    ['k', 116],
    ['L', 56],
    ['l', 6],
    ['M', 55],
    ['m', 84],
    ['N', 118],
    ['n', 84],
    ['O', 63],
    ['o', 92],
    ['P', 115],
    ['p', 115],
    ['Q', 103],
    ['q', 103],
    ['R', 119],
    ['r', 80],
    ['S', 109],
    ['s', 109],
    ['T', 120],
    ['t', 120],
    ['U', 62],
    ['u', 62],
    ['V', 62],
    ['v', 28],
    ['W', 62],
    ['w', 28],
    ['X', 118],
    ['x', 118],
    ['Y', 102],
    ['y', 102],
    ['Z', 91],
    ['z', 91],
    [' ', 0],
    ['°', 99],
    ['-', 64],
    ['=', 72],
    ['[', 57],
    [']', 15],
    ['(', 57],
    [')', 15]
]);
//# sourceMappingURL=tm1637.js.map