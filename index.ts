import * as gpio from 'rpi-gpio';

const pin = 12;

gpio.on('change', channelValueListener());

gpio.setup(pin, gpio.DIR_IN, gpio.EDGE_BOTH);

function channelValueListener(): (...args: any[]) => void {
    let lastValue: boolean | undefined = undefined;
    return (channel, value) => {
        if (lastValue !== value){
            lastValue = value;
            console.log('Channel ' + channel + ' value is now ' + value);
        }
    }
        
}
