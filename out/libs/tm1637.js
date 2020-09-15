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
    function TM1637(_gpio, pinClk, pinDIO, trueValue) {
        if (trueValue === void 0) { trueValue = 1; }
        this._gpio = _gpio;
        this.pinClk = pinClk;
        this.pinDIO = pinDIO;
        this.trueValue = trueValue;
        this._text = '';
        this._split = false;
        this._alignLeft = false;
        // Default high
        _gpio.setup(pinClk, _gpio.DIR_OUT, _gpio.EDGE_BOTH, function () { return _gpio.write(pinClk, true); });
        _gpio.setup(pinDIO, _gpio.DIR_OUT, _gpio.EDGE_BOTH, function () { return _gpio.write(pinDIO, true); });
        console.log('constructor set up finished');
        // this.high(this.pinClk);
        // this.high(this.pinDIO);
    }
    TM1637.prototype.text = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // console.log('text: message ' + message);
                        this._text = (message + "").substring(0, 4);
                        return [4 /*yield*/, this.sendData()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
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
    // clock high in, high out
    TM1637.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // pinDIO  high -> low when clock is high
                    // this.high(this.pinDIO);
                    // this.high(this.pinClk);
                    return [4 /*yield*/, this.low(this.pinDIO)];
                    case 1:
                        // pinDIO  high -> low when clock is high
                        // this.high(this.pinDIO);
                        // this.high(this.pinClk);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // clock high in, high out
    TM1637.prototype.writeBit = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // A rising edge
                    return [4 /*yield*/, this.low(this.pinClk)];
                    case 1:
                        // A rising edge
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
                    // Falling Edge 8
                    return [4 /*yield*/, this.low(this.pinClk)];
                    case 1:
                        // Falling Edge 8
                        _a.sent();
                        // wpi.pinMode(this.pinDIO, wpi.INPUT);
                        // 9th rising edge
                        return [4 /*yield*/, this.high(this.pinClk)];
                    case 2:
                        // wpi.pinMode(this.pinDIO, wpi.INPUT);
                        // 9th rising edge
                        _a.sent();
                        // const ack = wpi.digitalRead(this.pinDIO);
                        // if(ack === 0)  success, low
                        // wpi.pinMode(this.pinDIO, wpi.OUTPUT);
                        // 9th falling edge
                        return [2 /*return*/, this.low(this.pinClk)];
                }
            });
        });
    };
    // clock high in, low out
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
                    case 4: return [4 /*yield*/, this.readAck()];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // clock low in, high out
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
//
// const sleep = () => new Promise((r) => setTimeout(r, 1));
//
// export class TM1637 {
//     _text: string;
//     _split: boolean;
//     _alignLeft: boolean;
//
//     constructor(protected _gpio: typeof gpio, protected pinClk: number, protected pinDIO: number) {
//
//         this._text = '';
//         this._split = false;
//         this._alignLeft = false;
//         _gpio.setup(pinClk, _gpio.DIR_OUT,_gpio.EDGE_BOTH, () => _gpio.write(pinClk, true));
//         _gpio.setup(pinDIO, _gpio.DIR_OUT,_gpio.EDGE_BOTH, () => _gpio.write(pinDIO, true));
//         console.log('constructor set up finished');
//     }
//
//     high(pin) {
//         // console.log('Writing high to ' + pin);
//         this._gpio.write(pin, true);
//         sleep();
//     }
//
//     low(pin) {
//         // console.log('Writing low to ' + pin);
//         this._gpio.write(pin, false);
//         sleep();
//     }
//
//     start() {
//         // console.log('start');
//         this.low(this.pinDIO);
//     }
//
//     writeBit(value) {
//         // console.log('writeBit');
//         this.low(this.pinClk);
//         if (value)
//             this.high(this.pinDIO);
//         else
//             this.low(this.pinDIO);
//
//         this.high(this.pinClk);
//     }
//
//     readAck() {
//         // console.log('readAck');
//         this.low(this.pinClk);
//         // this._gpio.setup(this.pinDIO, this._gpio.DIR_IN);
//         this.high(this.pinClk);
//         // this._gpio.read(this.pinDIO, () => {});
//         //this._gpio.setup(this.pinDIO, this._gpio.DIR_OUT);
//         this.low(this.pinClk);
//     }
//
//     writeByte(byte) {
//         // console.log('writeBype');
//         let b = byte;
//         for (let i = 0; i < 8; i++) {
//             this.writeBit(b & 0x01);
//             b >>= 1;
//         }
//         return this.readAck();
//     }
//
//     stop() {
//         // console.log('stop');
//         this.low(this.pinDIO);
//         this.high(this.pinClk);
//         this.high(this.pinDIO);
//     }
//
//     set text(message){
//         // console.log('text: message ' + message);
//         this._text = (message+"").substring(0,4);
//         this.sendData();
//     }
//
//     get text(){
//         return this._text;
//     }
//
//     set split(value){
//         this._split = value === true;
//         this.sendData();
//     }
//
//     get split(){
//         return this._split;
//     }
//
//     set alignLeft(value){
//         this._alignLeft = value === true;
//         this.sendData();
//     }
//
//     get alignLeft(){
//         return this._alignLeft;
//     }
//
//     sendData() {
//         // console.log('sendData');
//         let m=[null,null,null,null];
//         for (let i = this._text.length; i >= 0 ; i--) {
//             let ind = allowedChars.indexOf(this._text[i]);
//             if(ind>-1)
//                 if (!this._alignLeft) {
//                     m[(4-this._text.length)+i]=ind;
//                 } else {
//                     m[i]=ind;
//                 }
//         }
//         let numsEncoded = [0, 0, 0, 0].map((u, i) => codigitToSegment[m[i]] || 0);
//         if (this._split) numsEncoded[1] = numsEncoded[1] | 0b10000000;
//
//         this.start();
//         this.writeByte(0b01000000);
//         this.stop();
//
//         this.start();
//         this.writeByte(0b11000000);
//         for (let i = 0; i < numsEncoded.length; i++) {
//             this.writeByte(numsEncoded[i]);
//         }
//         this.stop();
//
//         this.start();
//         this.writeByte(0b10001111);
//         this.stop();
//     }
// }
//# sourceMappingURL=tm1637.js.map