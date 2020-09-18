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
                break;
            case GameStates.Explode:
                break;
        }
    }

    handleValueChange(channel: number, value: any) {
        switch (channel) {
            case PINS.pin37_buttonYellow:
                this.buzzer.off();
                this.buzzer.blink(false);
                break;
            case PINS.pin40_buttonBlue:
                this.buzzer.on();
                break;
            case PINS.pin33_buttonWhite:
                this.buzzer.blink(true);
                break;
        }
    }
}
