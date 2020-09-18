import * as gpio from 'rpi-gpio';
import {interval, Observable, Subscription} from 'rxjs';
import {map, takeWhile, tap} from 'rxjs/operators';
import {PINS} from "../../libs/pins.enum";
import {TM1637} from "../../libs/tm1637";
import {GameEventTypes} from "../events/events";
import {EventResponder} from "../events/event-responder";
import {GameStates} from "../game-states.enum";

/**
 * CountDown class that uses a Seven Segment display
 */
export class CountDown extends EventResponder {

     async text(value: string) {
         await this.sevenSegment.setText(value);
     }

    protected doCountDown = false;
    protected delay = 1000;
    protected interval: Subscription;
    protected seconds: number = 120;

    protected sevenSegment = new TM1637(gpio, PINS.pin11_clk, PINS.pin7_dio);

    constructor(gameEvents$: Observable<GameEventTypes>) {
        super(gameEvents$);
        this.sevenSegment.ready.then((value => this.sevenSegment.setText('    ')));
    }

    protected handleStateChange(): void {
        switch (this.state) {
            case GameStates.EnterSequence:
                this.countDown(false);
                this.sevenSegment.setText('8888');
                break;
            case GameStates.FixSwitches:
                this.countDown(false);
                this.sevenSegment.setText('----');
                break;
            case GameStates.Defuse:
                this.countDown(true);
                break;
            case GameStates.Explode:
                this.countDown(false);
                this.sevenSegment.setText('BYE');
                break;
        }
    }



    protected countDown(doCountDown: boolean): void {
        console.log('CountDown: doCountDown', doCountDown);

        if (doCountDown && !this.doCountDown) {
            this.doCountDown = true;

            if (!this.interval || this.interval.closed) {
                this.interval = interval(this.delay).pipe(takeWhile(() => this.doCountDown),
                    map(val => this.seconds - val),
                    tap( val => console.log('seconds ' + val)),
                    map( val => `${~~(val / 60)}${('' + (val % 60)).padStart(2,0 + '')}`),
                    tap( val => console.log('value ' + val)),
                    tap(val => this.text(val))).subscribe();
            }
        } else {
            this.doCountDown = false;
            this.interval ? this.interval.unsubscribe() : null;
        }
    }

    protected async showTime() {
        console.log('Showing Time');
        const dateStringRay = new Date().toLocaleTimeString().split(':');
        let hours = dateStringRay[0];
        hours = hours.length === 1 ? '0' + hours : hours;
        let minutes = dateStringRay[1];
        minutes = minutes.length === 1 ? '0' + minutes : minutes;
        await this.text(hours + minutes);
    }
}
