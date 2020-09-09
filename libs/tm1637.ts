import * as gpio from "rpi-gpio";

//
//      A
//     ---
//  F |   | B
//     -G-
//  E |   | C
//     ---
//      D
const allowedChars=['0',
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

const codigitToSegment = [
    // XGFEDCBA
    0b00111111, // 0
    0b00000110, // 1
    0b01011011, // 2
    0b01001111, // 3
    0b01100110, // 4
    0b01101101, // 5
    0b01111101, // 6
    0b00000111, // 7
    0b01111111, // 8
    0b01101111, // 9
    0b01110111, // A
    0b01011111, // a
    0b01111111, // B
    0b01111100, // b
    0b00111001, // C
    0b01011000, // c
    0b00111111, // D
    0b01011110, // d
    0b01111001, // E
    0b01111011, // e
    0b01110001, // F
    0b01110001, // f
    0b00111101, // G
    0b01101111, // g
    0b01110110, // H
    0b01110100, // h
    0b00000110, // I
    0b00000100, // i
    0b00011110, // J
    0b00001110, // j
    0b01110110, // K
    0b01110100, // k
    0b00111000, // L
    0b00000110, // l
    0b00110111, // M
    0b01010100, // m
    0b01110110, // N
    0b01010100, // n
    0b00111111, // O
    0b01011100, // o
    0b01110011, // P
    0b01110011, // p
    0b01100111, // Q
    0b01100111, // q
    0b01110111, // R
    0b01010000, // r
    0b01101101, // S
    0b01101101, // s
    0b01111000, // T
    0b01111000, // t
    0b00111110, // U
    0b00011100, // u
    0b00111110, // V
    0b00011100, // v
    0b00111110, // W
    0b00011100, // w
    0b01110110, // X
    0b01110110, // x
    0b01100110, // Y
    0b01100110, // y
    0b01011011, // z
    0b01011011, // Z
    0b00000000, // " "
    0b01100011, // °
    0b01000000, // -
    0b01001000, // =
    0b00111001, // (
    0b00001111, // )
    0b00111001, // [
    0b00001111  // ]
];

const sleep = () => new Promise((r) => setTimeout(r, 1));

export class TM1637 {
    _text: string;
    _split: boolean;
    _alignLeft: boolean;

    constructor(protected _gpio: typeof gpio, protected pinClk: number, protected pinDIO: number) {

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

    high(pin) {
        console.log('Writing high to ' + pin);
        this._gpio.write(pin, true);
        sleep();
    }

    low(pin) {
        console.log('Writing low to ' + pin);
        this._gpio.write(pin, false);
        sleep();
    }

    start() {
        console.log('start');
        this.low(this.pinDIO);
    }

    writeBit(value) {
        console.log('writeBit');
        this.low(this.pinClk);
        if (value)
            this.high(this.pinDIO);
        else
            this.low(this.pinDIO);

        this.high(this.pinClk);
    }
    readAck() {
        console.log('readAck');
        this.low(this.pinClk);
        this._gpio.setup(this.pinDIO, this._gpio.DIR_IN);
        this.high(this.pinClk);
        const ack = this._gpio.promise.read(this.pinDIO);
        this._gpio.setup(this.pinDIO, this._gpio.DIR_OUT);
        this.low(this.pinClk);
        return ack;
    }

    writeByte(byte) {
        console.log('writeBype');
        let b = byte;
        for (let i = 0; i < 8; i++) {
            this.writeBit(b & 0x01);
            b >>= 1;
        }
        return this.readAck();
    }

    stop() {
        console.log('stop');
        this.low(this.pinDIO);
        this.high(this.pinClk);
        this.high(this.pinDIO);
    }

    set text(message){
        console.log('text: message ' + message);
        this._text = (message+"").substring(0,4);
        this.sendData();
    }

    get text(){
        return this._text;
    }

    set split(value){
        this._split = value === true;
        this.sendData();
    }

    get split(){
        return this._split;
    }

    set alignLeft(value){
        this._alignLeft = value === true;
        this.sendData();
    }

    get alignLeft(){
        return this._alignLeft;
    }

    sendData() {
        console.log('sendData');
        let m=[null,null,null,null];
        for (let i = this._text.length; i >= 0 ; i--) {
            let ind = allowedChars.indexOf(this._text[i]);
            if(ind>-1)
                if (!this._alignLeft) {
                    m[(4-this._text.length)+i]=ind;
                } else {
                    m[i]=ind;
                }
        }
        let numsEncoded = [0, 0, 0, 0].map((u, i) => codigitToSegment[m[i]] || 0);
        if (this._split) numsEncoded[1] = numsEncoded[1] | 0b10000000;

        this.start();
        this.writeByte(0b01000000);
        this.stop();

        this.start();
        this.writeByte(0b11000000);
        for (let i = 0; i < numsEncoded.length; i++) {
            this.writeByte(numsEncoded[i]);
        }
        this.stop();

        this.start();
        this.writeByte(0b10001111);
        this.stop();
    }
}
