import * as gpio from "rpi-gpio";

/**
 * Class created to set up and write text to TM1637 seven segment display
 */
export class TM1637 {

    public readonly ready: Promise<[boolean, boolean]>;

    /**
     * Text to be displayed in
     */
    protected _text = '';

    /**
     * If true, the colon : will be displayed
     */
    protected _split = false;

    /**
     * If true, output to the display with be left aligned
     */
    protected _alignLeft = false;

    /**
     * Constructor
     * @param _gpio ref to GPIO
     * @param pinClk click channel
     * @param pinDIO DIO channel
     */
    constructor(protected _gpio: typeof gpio, protected pinClk, protected pinDIO) {

        /**
         * Default to high for CLK & DIO
         */
        this.ready = Promise.all(
            [
                _gpio.promise.setup(pinClk, _gpio.DIR_OUT,_gpio.EDGE_BOTH),
                _gpio.promise.setup(pinDIO, _gpio.DIR_OUT,_gpio.EDGE_BOTH)
            ]).then( (val) => {

                _gpio.write(pinClk, true);
                _gpio.write(pinDIO, true);
                return val;

        });
        console.log('TM1637: Constructor finished');
    }

    /**
     * Set the split value
     * @param split
     */
    set split(split: boolean) {
        this._split = split;
    }

    /**
     * Set the alignLeft value
     * @param alignLeft
     */
    set alignLeft(alignLeft: boolean) {
        this._alignLeft = alignLeft;
    }

    /**
     * Set the text to be displayed
     * @param text
     */
    public async setText(text: string): Promise<void> {
        // console.log('setText: message ' + message);
        this._text = text.substring(0, 4);
        await this.sendData();
    }

    /**
     * Set channel to high
     * @param pin
     */
    async high(pin): Promise<void> {
        await this._gpio.promise.write(pin, true);
    }

    /**
     * Set channel to low
     * @param pin
     */
    async low(pin): Promise<void> {
        await this._gpio.promise.write(pin, false);
    }

    /**
     * Set the Start condition by setting DIO to low
     */
    async start(): Promise<void> {
        await this.low(this.pinDIO);
    }


    /**
     * Write a byte
     * @param byte
     */
    async writeByte(byte): Promise<void> { // 0b00000000
        let b = byte;
        for (let i = 0; i < 8; i++) {
            await this.writeBit(b & 0x01);
            b >>= 1;
        }
        return await this.Ack();
    }

    /**
     * Write a bit.
     * @param value
     */
    async writeBit(value): Promise<void> {
        // Rising edge
        await this.low(this.pinClk);
        // change the bit value while clock is low
        if (value)
            await this.high(this.pinDIO);
        else
            await this.low(this.pinDIO);
        // Reset the clock back to high
        await this.high(this.pinClk);
    }

    /**
     * ACK
     */
    async Ack(): Promise<void> {
        // Falling Edge 8
        await this.low(this.pinClk);
        // 9th rising edge
        await this.high(this.pinClk);
        // 9th falling edge
        return this.low(this.pinClk);
    }

    /**
     * Stop: clock low in, high out
     */
    async stop(): Promise<void> {
        // pinDIO  low -> high  when clock is high
        await this.low(this.pinDIO);
        await this.high(this.pinClk);
        await this.high(this.pinDIO);
    }

    /**
     * Writes out the text to the display
     */
    async sendData(): Promise<void> {

        let numsEncoded =[null,null,null,null];
        for (let i = this._text.length; i >= 0 ; i--) {
            let ind = charMap.get(this._text[i]) || 0;
            if(ind)
                if (!this._alignLeft) {
                    numsEncoded[(4-this._text.length)+i]=ind;
                } else {
                    numsEncoded[i]=ind;
                }
        }
        if (this._split) numsEncoded[1] = numsEncoded[1] | 0b10000000; // the x of 2nd pos

        await this.start(); // Data command settings
        await this.writeByte(0b01000000); // Normal mode, automatic address increase, write data to display register
        await this.stop();

        await this.start(); // Address Command Settings
        await this.writeByte(0b11000000); // Address start bit starts from 0
        for (let i = 0; i < numsEncoded.length; i++) {
            await this.writeByte(numsEncoded[i]);
        }
        await this.stop();

        await this.start(); // Address command settings
        await this.writeByte(0b10001111); // Display control command settings, open, brightness is 111
        await this.stop();
    }
}

/**
 * Maps a char to its hexadecimal value representation per seven segment display
 */
const charMap = new Map<string, number>([
    ['0',0b00111111],
    ['1',0b00000110],
    ['2',0b01011011],
    ['3',0b01001111],
    ['4',0b01100110],
    ['5',0b01101101],
    ['6',0b01111101],
    ['7',0b00000111],
    ['8',0b01111111],
    ['9',0b01101111],
    ['A',0b01110111],
    ['a',0b01011111],
    ['B',0b01111111],
    ['b',0b01111100],
    ['C',0b00111001],
    ['c',0b01011000],
    ['D',0b00111111],
    ['d',0b01011110],
    ['E',0b01111001],
    ['e',0b01111011],
    ['F',0b01110001],
    ['f',0b01110001],
    ['G',0b00111101],
    ['g',0b01101111],
    ['H',0b01110110],
    ['h',0b01110100],
    ['I',0b00000110],
    ['i',0b00000100],
    ['J',0b00011110],
    ['j',0b00001110],
    ['K',0b01110110],
    ['k',0b01110100],
    ['L',0b00111000],
    ['l',0b00000110],
    ['M',0b00110111],
    ['m',0b01010100],
    ['N',0b01110110],
    ['n',0b01010100],
    ['O',0b00111111],
    ['o',0b01011100],
    ['P',0b01110011],
    ['p',0b01110011],
    ['Q',0b01100111],
    ['q',0b01100111],
    ['R',0b01110111],
    ['r',0b01010000],
    ['S',0b01101101],
    ['s',0b01101101],
    ['T',0b01111000],
    ['t',0b01111000],
    ['U',0b00111110],
    ['u',0b00111110],
    ['V',0b00111110],
    ['v',0b00011100],
    ['W',0b00111110],
    ['w',0b00011100],
    ['X',0b01110110],
    ['x',0b01110110],
    ['Y',0b01100110],
    ['y',0b01100110],
    ['Z',0b01011011],
    ['z',0b01011011],
    [' ',0b00000000],
    ['°',0b01100011],
    ['-',0b01000000],
    ['=',0b01001000],
    ['[',0b00111001],
    [']',0b00001111],
    ['(',0b00111001],
    [')',0b00001111]
]);
