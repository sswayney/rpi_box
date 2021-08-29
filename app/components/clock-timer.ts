import * as gpio from 'rpi-gpio';
import {interval, Observable, Subscription} from 'rxjs';
import {map, takeWhile, tap} from 'rxjs/operators';
import {PINS} from "../pins.enum";
import {TM1637} from "../../libs/tm1637";
import {EventEmitter} from "../events/event-emitter";
import {GameEventType, GameEventTypes, GameMessageType} from "../events/events";
import {GameStates} from "../game-states.enum";

/**
 * ClockTimer class that uses a Seven Segment display
 */
export class ClockTimer extends EventEmitter {

     async text(value: string) {
         await this.sevenSegment.setText(value);
     }

     // Should we show the clock?
    protected doShowClock = false;
     // Should we do the count down?
    protected doCountDown = false;
    // How often to update the 7segment display.
    protected refreshRate = 1000;
    // How many seconds the player has to enter the correct sequence
    protected seconds: number = 20;
    protected subscription: Subscription;

    protected sevenSegment = new TM1637(gpio, PINS.pin11_clk, PINS.pin7_dio);

    constructor(gameEvents$: Observable<GameEventTypes>, protected emitGameEvent: (gameState: GameEventTypes) => void) {
        super(gameEvents$, emitGameEvent);
        this.sevenSegment.ready.then((valuen6 => this.sevenSegment.setText('    ')));
    }

    protected handleStateChange(): void {
        switch (this.state) {
            case GameStates.MainMenu:
                this.countDown(false);
                this.showClock(true);
                break;
            case GameStates.EnterSequence:
                this.countDown(false);
                this.showClock(false);
                this.sevenSegment.setText('0000');
                break;
            case GameStates.FixSwitches:
                this.countDown(false);
                this.showClock(false);
                this.sevenSegment.setText('----'); // Todo: Not displaying after
                break;
            case GameStates.Defuse:
                this.countDown(true);
                break;
            case GameStates.Explode:
                this.countDown(false);
                this.sevenSegment.setText('8888');
                break;
        }
    }

    protected countDown(doCountDown: boolean): void {
        // console.log('CountDown: doCountDown', doCountDown);

        if (doCountDown && !this.doCountDown) {
            this.sevenSegment.split = true;
            this.doCountDown = true;

            if (!this.subscription || this.subscription.closed) {
                this.subscription = interval(this.refreshRate).pipe(takeWhile(() => this.doCountDown),
                    map(sec => this.seconds - sec),
                    tap( sec => sec === 6 ? this.emitGameEvent({ eventType: GameEventType.Message, message: GameMessageType.FiveSecondsLeft}) : undefined),
                    tap( sec => sec < 1 ? this.emitGameEvent({ eventType: GameEventType.StateChange, state: GameStates.Explode}) : undefined),
                    map( sec => `${~~(sec / 60)}${('' + (sec % 60)).padStart(2,0 + '')}`),
                  //  tap( val => console.log('value ' + val)),
                    tap(text => this.text(text))).subscribe();
            }
        } else {
            this.doCountDown = false;
            this.subscription ? !this.subscription.closed ? this.subscription.unsubscribe() : null : null;
        }
    }

    protected showClock(doShowClock: boolean): void {
        console.log('showClock: doShowClock', doShowClock);

        if (doShowClock && !this.doShowClock) {
            this.sevenSegment.split = true;
            this.doShowClock = true;

            if (!this.subscription || this.subscription.closed) {
                this.subscription = interval(this.refreshRate).pipe(
                    takeWhile(() => this.doShowClock),
                    tap(() => this.showTime())).subscribe();
            }
        } else {
            this.doShowClock = false;
            this.subscription ? !this.subscription.closed ? this.subscription.unsubscribe() : null : null;
        }
    }

    protected async showTime() {
        // console.log('Show Time');
        this.sevenSegment.split = true;
        const dateStringRay = new Date().toLocaleTimeString().split(':');
        let hours = dateStringRay[0];
        hours = hours.length === 1 ? '0' + hours : hours;
        let minutes = dateStringRay[1];
        minutes = minutes.length === 1 ? '0' + minutes : minutes;
        await this.text(hours + minutes);
    }
}
