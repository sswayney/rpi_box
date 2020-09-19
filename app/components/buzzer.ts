import * as gpio from 'rpi-gpio';
import {LED} from "../../libs/led";
import {PINS} from "../../libs/pins.enum";
import {EventResponder} from "../events/event-responder";
import {GameEventTypes} from "../events/events";
import { Observable } from 'rxjs';
import {GameStates} from "../game-states.enum";


export class Buzzer extends EventResponder {

    public readonly buzzer: LED;

    constructor(private gameState$: Observable<GameEventTypes>) {
        super(gameState$);
        this.buzzer = new LED(gpio, PINS.pin18_buzzer);
    }

    protected handleStateChange(): void {
        switch (this.state) {
            case GameStates.MainMenu:
                break;
            case GameStates.EnterSequence:
                break;
            case GameStates.FixSwitches:
                break;
            case GameStates.Defuse:
                this.beep(100);
                break;
            case GameStates.Explode:
                this.buzzer.on();
                break;
            default:
                this.buzzer.off();
        }
    }

    protected handleValueChange(channel: number, value: any) {
        // switch (channel) {
        //     case PINS.pin37_buttonYellow:
        //         this.buzzer.off();
        //         this.buzzer.blink(false);
        //         break;
        //     case PINS.pin40_buttonBlue:
        //         this.buzzer.on();
        //         break;
        //     case PINS.pin35_buttonWhite:
        //         this.buzzer.blink(true);
        //         break;
        // }
    }

    private beep(time: number): void {
        this.buzzer.on();
        setTimeout(() => this.buzzer.off(), time);
    }
}
