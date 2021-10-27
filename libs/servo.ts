// const Gpio = require('pigpio').Gpio;
import {Gpio} from "pigpio";
import { Subscription } from "rxjs";


/**
 * Class to abstract a Servo
 */
export class Servo {

    private motor: Gpio;



    constructor(_gpioNumber: number) {
       this.motor = new Gpio(_gpioNumber, {mode: Gpio.OUTPUT});
    }

    private readonly _MaxPulseWidth: number = 2000;
    private readonly _MinPulseWidth: number = 1000;

    init() {
        let pulseWidth = 1000;
        let increment = 100;

        setInterval(() => {
            this.motor.servoWrite(pulseWidth);

            pulseWidth += increment;
            if (pulseWidth >= this._MaxPulseWidth) {
                increment = -100;
            } else if (pulseWidth <= this._MinPulseWidth) {
                increment = 100;
            }
        }, 1000);
    }

    public setAngle(angle: number) {
        const pulseWidth = this.map(angle);
        console.debug('Servo Writing Pulse Width from angle: {}', pulseWidth);
        this.motor.servoWrite(pulseWidth);
    }

    public setPulseWidth(pulseWidth: number) {
       // console.debug('Servo Writing Pulse Width: {}', pulseWidth);
        if (pulseWidth > 2500) {
            pulseWidth = 2500;
        }
        if (pulseWidth < 500) {
            pulseWidth = 500;
        }
        pulseWidth = Math.floor(pulseWidth);
        // console.debug('Fixed Pulse Width: {}', pulseWidth);
        this.motor.servoWrite(pulseWidth);
    }

    map(value: number,fromLow = 0,fromHigh = 180,toLow = 500,toHigh = 2500) : number{
        if (value > fromHigh) {
            value = fromHigh;
        }
        if (value < fromLow) {
            value = fromLow;
        }
    return Math.floor((toHigh-toLow)*(value-fromLow) / (fromHigh-fromLow) + toLow);
}


}
