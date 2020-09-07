import * as gpio from 'rpi-gpio';

/**
 * Output led
 */
enum OutputPins {
    pin7_led1 = 7
}

/**
 * Class to incapsilate an led
 */
class LED {

    protected doBlink = false;
    protected delay = 500;

    get pin(): number {
        return this._pin;
    }

    constructor(protected _gpio: typeof gpio, protected _pin: number) {
        _gpio.setup(_pin, gpio.DIR_OUT);
    }

    public on(): void {
        this._gpio.write(this._pin, true);
    }

    public off(): void {
        this._gpio.write(this._pin, false);
    }

    public blink(doBlink: boolean, delay: number = 500): void {

        if (doBlink && !this.doBlink){
            this.delay = delay;
            this.doBlink = true;
            this.blinkOn();
        } else {
            this.doBlink = false;
        }
    }

    protected blinkOn(): void {
        const _this = this;
        setTimeout(() => {
            console.log('Off');
            _this._gpio.write(_this._pin, true, _this.blinkOff);
        }, _this.delay);
    }

    protected blinkOff(): void {
        const _this = this;
        if (!_this.doBlink){
            return;
        }

        setTimeout(() => {
            console.log('On');
            _this._gpio.write(_this._pin, false, _this.blinkOn);
        }, _this.delay);
    }
}

const led1 = new LED(gpio, OutputPins.pin7_led1);
/**
 * Input switches
 */
enum InputPins {
    pin12_switch1 = 12,
    pin16_switch2 = 16
}

gpio.setup(InputPins.pin12_switch1, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(InputPins.pin16_switch2, gpio.DIR_IN, gpio.EDGE_BOTH);

/**
 * Value change listener
 */
gpio.on('change', channelValueListener());


function channelValueListener(): (...args: any[]) => void {
    const lastValues: Map<any, any> = new Map();
    return (channel, value) => {
        if (lastValues.get(channel) !== value) {
            lastValues.set(channel, value);
            console.log('Channel ' + channel + ' value is now ' + value);

            switch (channel) {
                case InputPins.pin12_switch1:
                    console.log(`Writting ${value} to ${led1.pin}`);
                    led1.on();
                    break;
                case InputPins.pin16_switch2:
                    led1.blink(value);
                    break;
            }
        }
    }

}


