import * as gpio from 'rpi-gpio';
import {Observable} from 'rxjs';
import {LED} from "../../libs/led";
import {EventResponder} from "../events/event-responder";
import {GameEventTypes, GameMessageType, MessageEventType} from "../events/events";
import {GameStates} from "../game-states.enum";
import {PINS} from "../pins.enum";


export class Vibration extends EventResponder {

    public readonly motor: LED;

    constructor(private gameState$: Observable<GameEventTypes>) {
        super(gameState$);
        this.motor = new LED(gpio, PINS.pin15_vibration_motor);
    }

    protected handleMessage(message: MessageEventType): void {
        switch(message.message) {
            case GameMessageType.SequenceUpdate:
                if (this.state === GameStates.Defuse) {
                    /**
                     * Vibrate if user is defusing and gets a wrong sequence
                     */
                    if (!message.value.right){
                        this.motor.blip(250);
                    }
                }
                break;
        }
    }

    protected handleStateChange(): void {
        this.motor.off();
        switch (this.state) {
            case GameStates.EnterSequence:
                // setTimeout(() => this.motor.blip(250),100);
                break;
            case GameStates.Explode:
                this.motor.on();
                break;
        }
    }
}
