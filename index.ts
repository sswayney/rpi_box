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

    constructor(protected _gpio: typeof gpio, protected pin: number) {}

    public on(): void {
        this._gpio.write(OutputPins.pin7_led1, true);
    }

    public off(): void {
        this._gpio.write(OutputPins.pin7_led1, false);
    }

    public blink(delay: number): void {
        this.delay = delay;
    }

    protected blinkOn(): void {
        setTimeout(() => {
            console.log('Off');
            this._gpio.write(this.pin, true, this.blinkOff);
        }, this.delay);
    }

    protected blinkOff(): void {
        if (!this.doBlink) {}{
            return;
        }

        setTimeout(() => {
            console.log('On');
            this._gpio.write(this.pin, false, this.blinkOn);
        }, this.delay);
    }

}

gpio.setup(OutputPins.pin7_led1, gpio.DIR_OUT);

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
                    console.log(`Writting ${value} to ${OutputPins.pin7_led1}`);
                    gpio.write(OutputPins.pin7_led1, value);
                    break;
                case InputPins.pin16_switch2:
                    break;
            }
        }
    }

}


