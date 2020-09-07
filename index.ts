import * as gpio from 'rpi-gpio';

const pin12 = 12;
const pin16 = 16;

gpio.on('change', channelValueListener());

gpio.setup(pin12, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(pin16, gpio.DIR_IN, gpio.EDGE_BOTH);

function channelValueListener(): (...args: any[]) => void {
    const lastValues: Map<any,any> = new Map();
    return (channel, value) => {
        if (lastValues.get(channel) !== value){
            lastValues.set(channel,value);
            console.log('Channel ' + channel + ' value is now ' + value);
        }
    }
        
}
