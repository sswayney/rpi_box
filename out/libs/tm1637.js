"use strict";
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
//
// const sleep = () => new Promise((r) => setTimeout(r, 1));
//
// module.exports = class TM1637Display {
//
//     constructor(pinClk, pinDIO, trueValue = 1) {
//         this.pinClk = pinClk;
//         this.pinDIO = pinDIO;
//         this.trueValue = trueValue;
//
//         // 默认高电位
//         wpi.pinMode(this.pinClk, wpi.OUTPUT);
//         wpi.pinMode(this.pinDIO, wpi.OUTPUT);
//         wpi.digitalWrite(this.pinClk, this.trueValue);
//         wpi.digitalWrite(this.pinDIO, this.trueValue);
//         // this.high(this.pinClk);
//         // this.high(this.pinDIO);
//
//     }
//
//     async high(pin) {
//         wpi.digitalWrite(pin, this.trueValue);
//         await sleep();
//     }
//
//     async low(pin) {
//         wpi.digitalWrite(pin, 1 - this.trueValue);
//         await sleep();
//     }
//
//     // clock high in, high out
//     async start() {
//         // pinDIO  high -> low when clock is high
//         // this.high(this.pinDIO);
//         // this.high(this.pinClk);
//         await this.low(this.pinDIO);
//     }
//
//     // clock high in, high out
//     async writeBit(value) {
//         // 一个上升沿
//         await this.low(this.pinClk);
//         // change the value when clock is low
//         if (value)
//             await this.high(this.pinDIO);
//         else
//             await this.low(this.pinDIO);
//
//         await this.high(this.pinClk);
//     }
//     async readAck() {
//         // 8号下降沿
//         await this.low(this.pinClk);
//         wpi.pinMode(this.pinDIO, wpi.INPUT);
//         // 9号上升沿
//         await this.high(this.pinClk);
//         const ack = wpi.digitalRead(this.pinDIO);
//         // if(ack === 0)  scucces, low
//         wpi.pinMode(this.pinDIO, wpi.OUTPUT);
//         // 9号下降沿
//         await this.low(this.pinClk);
//         // console.log(ack);
//         return ack;
//     }
//
//     // clock high in, low out
//     async writeByte(byte) { // 0b00000000
//         let b = byte;
//         for (let i = 0; i < 8; i++) {
//             await this.writeBit(b & 0x01);
//             b >>= 1;
//         }
//         return await this.readAck();
//     }
//
//     // clock low in, high out
//     async stop() {
//         // pinDIO  low -> high  when clock is high
//         await this.low(this.pinDIO);
//         await this.high(this.pinClk);
//         await this.high(this.pinDIO);
//     }
//
//     async sendData(nums, split = false) {
//         let numsEncoded = [0, 0, 0, 0].map((u, i) => codigitToSegment[nums[i]] || 0);
//         if (split) numsEncoded[1] = numsEncoded[1] | 0b10000000; // the x of 2nd pos
//
//         await this.start(); // 数据命令设置
//         await this.writeByte(0b01000000); // 普通模式, 自动地址增加, 写数据到显示寄存器
//         await this.stop();
//
//         await this.start(); // 地址命令设置
//         await this.writeByte(0b11000000); // 地址起始位 从0开始
//         for (let i = 0; i < numsEncoded.length; i++) {
//             await this.writeByte(numsEncoded[i]);
//         }
//         await this.stop();
//
//         await this.start(); // 地址命令设置
//         await this.writeByte(0b10001111); // 显示控制命令设置, 开, 亮度为 111
//         await this.stop();
//     }
// }
var sleep = function () { return new Promise(function (r) { return setTimeout(r, 1); }); };
var TM1637 = /** @class */ (function () {
    function TM1637(_gpio, pinClk, pinDIO) {
        this._gpio = _gpio;
        this.pinClk = pinClk;
        this.pinDIO = pinDIO;
        this._text = '';
        this._split = false;
        this._alignLeft = false;
        _gpio.setup(pinClk, _gpio.DIR_OUT, _gpio.EDGE_BOTH, function () { return _gpio.write(pinClk, true); });
        _gpio.setup(pinDIO, _gpio.DIR_OUT, _gpio.EDGE_BOTH, function () { return _gpio.write(pinDIO, true); });
        console.log('constructor set up finished');
    }
    TM1637.prototype.high = function (pin) {
        // console.log('Writing high to ' + pin);
        this._gpio.write(pin, true);
        sleep();
    };
    TM1637.prototype.low = function (pin) {
        // console.log('Writing low to ' + pin);
        this._gpio.write(pin, false);
        sleep();
    };
    TM1637.prototype.start = function () {
        // console.log('start');
        this.low(this.pinDIO);
    };
    TM1637.prototype.writeBit = function (value) {
        // console.log('writeBit');
        this.low(this.pinClk);
        if (value)
            this.high(this.pinDIO);
        else
            this.low(this.pinDIO);
        this.high(this.pinClk);
    };
    TM1637.prototype.readAck = function () {
        // console.log('readAck');
        this.low(this.pinClk);
        // this._gpio.setup(this.pinDIO, this._gpio.DIR_IN);
        this.high(this.pinClk);
        // this._gpio.read(this.pinDIO, () => {});
        //this._gpio.setup(this.pinDIO, this._gpio.DIR_OUT);
        this.low(this.pinClk);
    };
    TM1637.prototype.writeByte = function (byte) {
        // console.log('writeBype');
        var b = byte;
        for (var i = 0; i < 8; i++) {
            this.writeBit(b & 0x01);
            b >>= 1;
        }
        return this.readAck();
    };
    TM1637.prototype.stop = function () {
        // console.log('stop');
        this.low(this.pinDIO);
        this.high(this.pinClk);
        this.high(this.pinDIO);
    };
    Object.defineProperty(TM1637.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (message) {
            // console.log('text: message ' + message);
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
        // console.log('sendData');
        var m = [null, null, null, null];
        for (var i = this._text.length; i >= 0; i--) {
            var ind = allowedChars.indexOf(this._text[i]);
            if (ind > -1)
                if (!this._alignLeft) {
                    m[(4 - this._text.length) + i] = ind;
                }
                else {
                    m[i] = ind;
                }
        }
        var numsEncoded = [0, 0, 0, 0].map(function (u, i) { return codigitToSegment[m[i]] || 0; });
        if (this._split)
            numsEncoded[1] = numsEncoded[1] | 128;
        this.start();
        this.writeByte(64);
        this.stop();
        this.start();
        this.writeByte(192);
        for (var i = 0; i < numsEncoded.length; i++) {
            this.writeByte(numsEncoded[i]);
        }
        this.stop();
        this.start();
        this.writeByte(143);
        this.stop();
    };
    return TM1637;
}());
exports.TM1637 = TM1637;
//# sourceMappingURL=tm1637.js.map