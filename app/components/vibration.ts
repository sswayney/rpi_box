import * as gpio from 'rpi-gpio';
import {Observable} from 'rxjs';
import {LED} from "../../libs/led";
import {PINS} from "../../libs/pins.enum";
import {EventResponder} from "../events/event-responder";
import {GameEventTypes} from "../events/events";
import {GameStates} from "../game-states.enum";


export class Vibration extends EventResponder {

    public readonly motor: LED;

    constructor(private gameState$: Observable<GameEventTypes>) {
        super(gameState$);
        this.motor = new LED(gpio, PINS.pin15_vibration_motor);
    }

    protected handleStateChange(): void {
        this.motor.off();
        switch (this.state) {
            case GameStates.EnterSequence:
                setTimeout(() => this.motor.blip(300),100);
                break;
            case GameStates.Explode:
                this.motor.on();
                break;
        }
    }
}
