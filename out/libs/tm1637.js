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
//
//      A
//     ---
//  F |   | B
//     -G-
//  E |   | C
//     ---
//      D
var allowedChars = ['0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'a',
    'B',
    'b',
    'C',
    'c',
    'D',
    'd',
    'E',
    'e',
    'F',
    'f',
    'G',
    'g',
    'H',
    'h',
    'I',
    'i',
    'J',
    'j',
    'K',
    'k',
    'L',
    'l',
    'M',
    'm',
    'N',
    'n',
    'O',
    'o',
    'P',
    'p',
    'Q',
    'q',
    'R',
    'r',
    'S',
    's',
    'T',
    't',
    'U',
    'u',
    'V',
    'v',
    'W',
    'w',
    'X',
    'x',
    'Y',
    'y',
    'Z',
    'z',
    ' ',
    '°',
    '-',
    '=',
    '[',
    ']',
    '(',
    ')'];
var codigitToSegment = [
    // XGFEDCBA
    63,
    6,
    91,
    79,
    102,
    109,
    125,
    7,
    127,
    111,
    119,
    95,
    127,
    124,
    57,
    88,
    63,
    94,
    121,
    123,
    113,
    113,
    61,
    111,
    118,
    116,
    6,
    4,
    30,
    14,
    118,
    116,
    56,
    6,
    55,
    84,
    118,
    84,
    63,
    92,
    115,
    115,
    103,
    103,
    119,
    80,
    109,
    109,
    120,
    120,
    62,
    28,
    62,
    28,
    62,
    28,
    118,
    118,
    102,
    102,
    91,
    91,
    0,
    99,
    64,
    72,
    57,
    15,
    57,
    15 // ]
];
var sleep = function () { return new Promise(function (r) { return setTimeout(r, 1); }); };
var TM1637 = /** @class */ (function () {
    function TM1637(_gpio, pinClk, pinDIO) {
        this._gpio = _gpio;
        this.pinClk = pinClk;
        this.pinDIO = pinDIO;
        this._text = '';
        this._split = false;
        this._alignLeft = false;
        _gpio.setup(pinClk, _gpio.DIR_OUT);
        _gpio.setup(pinDIO, _gpio.DIR_OUT);
        console.log('constructor set up finished');
        // console.log('constructor writing true to both pins');
        // _gpio.write(pinClk, true);
        // _gpio.write(pinDIO, true);
    }
    TM1637.prototype.high = function (pin) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // console.log('Writing high to ' + pin);
                        this._gpio.write(pin, true);
                        return [4 /*yield*/, sleep()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TM1637.prototype.low = function (pin) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // console.log('Writing low to ' + pin);
                        this._gpio.write(pin, false);
                        return [4 /*yield*/, sleep()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TM1637.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // console.log('start');
                    return [4 /*yield*/, this.low(this.pinDIO)];
                    case 1:
                        // console.log('start');
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TM1637.prototype.writeBit = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // console.log('writeBit');
                    return [4 /*yield*/, this.low(this.pinClk)];
                    case 1:
                        // console.log('writeBit');
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
                    case 5: return [4 /*yield*/, this.high(this.pinClk)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TM1637.prototype.readAck = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // console.log('readAck');
                    return [4 /*yield*/, this.low(this.pinClk)];
                    case 1:
                        // console.log('readAck');
                        _a.sent();
                        // this._gpio.setup(this.pinDIO, this._gpio.DIR_IN);
                        return [4 /*yield*/, this.high(this.pinClk)];
                    case 2:
                        // this._gpio.setup(this.pinDIO, this._gpio.DIR_IN);
                        _a.sent();
                        return [4 /*yield*/, this.low(this.pinClk)];
                    case 3: 
                    // const ack = this._gpio.promise.read(this.pinDIO);
                    //this._gpio.setup(this.pinDIO, this._gpio.DIR_OUT);
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
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
                    case 4: return [2 /*return*/, this.readAck()];
                }
            });
        });
    };
    TM1637.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // console.log('stop');
                    return [4 /*yield*/, this.low(this.pinDIO)];
                    case 1:
                        // console.log('stop');
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
    Object.defineProperty(TM1637.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (message) {
            console.log('text: message ' + message);
            this._text = (message + "").substring(0, 4);
            this.sendData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TM1637.prototype, "split", {
        get: function () {
            return this._split;
        },
        set: function (value) {
            this._split = value === true;
            this.sendData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TM1637.prototype, "alignLeft", {
        get: function () {
            return this._alignLeft;
        },
        set: function (value) {
            this._alignLeft = value === true;
            this.sendData();
        },
        enumerable: true,
        configurable: true
    });
    TM1637.prototype.sendData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var m, i, ind, numsEncoded, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        m = [null, null, null, null];
                        for (i = this._text.length; i >= 0; i--) {
                            ind = allowedChars.indexOf(this._text[i]);
                            if (ind > -1)
                                if (!this._alignLeft) {
                                    m[(4 - this._text.length) + i] = ind;
                                }
                                else {
                                    m[i] = ind;
                                }
                        }
                        numsEncoded = [0, 0, 0, 0].map(function (u, i) { return codigitToSegment[m[i]] || 0; });
                        if (this._split)
                            numsEncoded[1] = numsEncoded[1] | 128;
                        return [4 /*yield*/, this.start()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.writeByte(64)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.stop()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.start()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.writeByte(192)];
                    case 5:
                        _a.sent();
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
                        _a.sent();
                        return [4 /*yield*/, this.writeByte(143)];
                    case 12:
                        _a.sent();
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
//# sourceMappingURL=tm1637.js.map