import * as gpio from 'rpi-gpio';
import {Observable} from 'rxjs';
import {LED} from "../../libs/led";
import {PINS} from "../../libs/pins.enum";
import {EventResponder} from "../events/event-responder";
import {GameEventTypes, GameMessageType, MessageEventType} from "../events/events";
import {GameStates} from "../game-states.enum";


export class Buzzer extends EventResponder {

    public readonly buzzer: LED;

    constructor(private gameState$: Observable<GameEventTypes>) {
        super(gameState$);
        this.buzzer = new LED(gpio, PINS.pin18_buzzer);
    }

    protected handleStateChange(): void {

        this.buzzer.off();
        this.buzzer.blink(false);

        switch (this.state) {
            case GameStates.MainMenu:
                break;
            case GameStates.EnterSequence:
                this.buzzer.blip(100);
                break;
            case GameStates.FixSwitches:
                break;
            case GameStates.Defuse:
                this.buzzer.blip(100);
                break;
            case GameStates.Explode:
                setTimeout(() => this.buzzer.on(), 100);
                break;
        }
    }

     protected handleValueChange(channel: number, value: any): void {
         // switch (channel) {
         //     case PINS.pin35_buttonWhite:
         //         this.buzzer.blip(100);
         //         break;
         //     case PINS.pin37_buttonYellow:
         //         this.buzzer.blink(false);
         //         break;
         //     case PINS.pin40_buttonBlue:
         //         this.buzzer.blink(true, 1000, 200);
         //         break;
         // }
    }

    protected handleMessage(message: MessageEventType): void {
        switch (message.message) {
            case GameMessageType.FiveSecondsLeft:
                this.buzzer.blink(true, 1000, 200);
                break;

        }
    }
}
