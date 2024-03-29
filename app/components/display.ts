import {Observable} from "rxjs";
import {LCD} from "../../libs/lcdi2c";
import {EventResponder} from "../events/event-responder";
import {GameEventTypes, GameMessageType, MessageEventType, SequenceUpdate} from "../events/events";
import {GameStates} from "../game-states.enum";

export class Display extends EventResponder {
    /**
     * LCD display
     * Uses pins 3 and 5
     */
    protected lcd = new LCD(1, 0x27, 16,2);

    constructor(private gameState$: Observable<GameEventTypes>) {
        super(gameState$);
    }

    public clear(): void {
        this.lcd.clear();
    }

    public println(value: string, line: number): void {
        this.lcd.println(value, line);
    }

    protected handleStateChange(): void {
        switch (this.state) {
            case GameStates.MainMenu:
                this.lcd.clear();
                this.lcd.println('  BOMB  POTATO  ', 1);
                this.lcd.println('Hit Blue 2 Start', 2);
                break;
            case GameStates.EnterSequence:
                this.lcd.clear();
                this.lcd.println('Enter Sequence', 1);
                // this.lcd.println('###', 2);
                break;
            case GameStates.FixSwitches:
                this.lcd.clear();
                this.lcd.println('Flip Switches', 1);
                this.lcd.println('Down', 2);
                break;
            case GameStates.Defuse:
                this.lcd.clear();
                this.lcd.println('BOMB ACTIVATED', 1);
                break;
            case GameStates.Explode:
                this.lcd.clear();
                this.lcd.println('^&@#$++_)(*&^%@#', 1);
                this.lcd.println('&%@$&^&*%$#!@#%&', 2);
                break;
        }
    }

    protected handleMessage(message: MessageEventType): void {
        switch (message.message) {
            case GameMessageType.SequenceUpdate:
                /**
                 * When a sequence update happens we want to show the player how many
                 * buttons/flips they have left to enter.
                 */
                const sequenceUpdate = message.value as SequenceUpdate;
                let displayText = '';
                for ( let i = 0; i < sequenceUpdate.sequenceMaxLength; i++ ) {
                    if (this.state == GameStates.EnterSequence) {
                        displayText += i < sequenceUpdate.sequenceLength ? ' ' : '#';
                    }
                    if (this.state == GameStates.Defuse) {
                        displayText += i < (sequenceUpdate.sequenceMaxLength - sequenceUpdate.sequenceLength) ? ' ' : '#';
                    }
                }
                this.lcd.println('                ', 2);
                this.lcd.println(displayText, 2);
                break;

        }
    }


    protected handleValueChange(channel: number, value: any) {
        // switch (channel) {
        //     case PINS.pin35_buttonWhite:
        //         this.lcd.clear();
        //         this.lcd.println('COLOR', 1);
        //         this.lcd.println('White', 2);
        //         break;
        //     case PINS.pin37_buttonYellow:
        //         this.lcd.clear();
        //         this.lcd.println('COLOR', 1);
        //         this.lcd.println('Yellow', 2);
        //         break;
        //     case PINS.pin40_buttonBlue:
        //         this.lcd.clear();
        //         this.lcd.println('COLOR', 1);
        //         this.lcd.println('Blue', 2);
        //         break;
        // }
    }


}
