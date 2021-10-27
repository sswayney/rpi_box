import {Gpio} from "pigpio";
import { BehaviorSubject, Observable } from "rxjs";
import { scan, map, take, throttleTime } from "rxjs/operators";


/**
 * Class to abstract a Distance Sensor - UltraSonic Ranging
 * Hardware HCSR04
 */
export class HCSR04 {

    get distance$(): Observable<number> {
        return this.distanceBehaviorSubject$.asObservable().pipe(

          // AVERAGE OUT THE DISTANCE
          scan((acc, curr) => {
              acc.push(curr);

              if (acc.length > 30) {
                  acc.shift();
              }
              return acc;
          }, []),
          map(arr => arr.reduce((acc, current) => acc + current, 0) / arr.length),
         // throttleTime(250)


        );
    }

    private distanceBehaviorSubject$ = new BehaviorSubject(0);

    private trigger: Gpio;
    private echo: Gpio;

    // The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
    private readonly MICROSECONDS_PER_CM = 1e6/34321;

    constructor(_triggerGpio: number, _echoGpio: number) {
       this.trigger = new Gpio(_triggerGpio, {mode: Gpio.OUTPUT});
       this.echo = new Gpio(_echoGpio, {mode: Gpio.INPUT, alert: true});
    }

    public init(): void {
        this.trigger.digitalWrite(0); // Make sure trigger is low

        const watchHCSR04 = () => {
            let startTick;

            this.echo.on('alert', (level, tick) => {
                // .log('Alert: LEVEL: ' + level + ' TICK: ' + tick);
                if (level == 1) {
                    startTick = tick;
                } else {
                    const endTick = tick;
                    const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
                    const distance: number = diff / 2 / this.MICROSECONDS_PER_CM;
                    // console.log('Distance ' + distance);
                    this.distanceBehaviorSubject$.next(distance);
                }
            });
        };

        watchHCSR04();

        // Trigger a distance measurement once per second
        setInterval(() => {
            this.trigger.trigger(10, 1); // Set trigger high for 10 microseconds
        }, 50);
    }




}
