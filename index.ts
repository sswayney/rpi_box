import * as gpio from 'rpi-gpio';

const pin = 7;
const delay = 500;
let count = 0;
const max = 6;

gpio.setup(7, gpio.DIR_OUT, on);

function on(): void {
    if (count >= max){
        gpio.destroy(() => console.log('Closed writePins, now exit.'));
        return;
    }

    setTimeout(() => {
        console.log('Off');
        gpio.write(pin, true, off);
        count += 1;
    }, delay);
}

function off() {
    setTimeout(() => {
        console.log('On');
        gpio.write(pin, false, on);
    }, delay);
}