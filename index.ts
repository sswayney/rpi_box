import * as gpio from 'rpi-gpio';

const pin = 12;

gpio.on('change', (channel, value) => {
console.log('Channel ' + channel + ' value is now ' + value);
});

gpio.setup(pin, gpio.DIR_IN, gpio.EDGE_BOTH);