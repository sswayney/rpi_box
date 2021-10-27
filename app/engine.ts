import {interval, Observable} from "rxjs";
import {debounce, filter} from "rxjs/operators";
import {EventEmitter} from "./events/event-emitter";
import {GameEventType, GameEventTypes, GameMessageType, SequenceUpdate} from "./events/events";
import {GameStates} from "./game-states.enum";
import {PINS} from "./pins.enum";

interface ChannelValue {
    channel: number;
    value: boolean;
}

export class Engine extends EventEmitter {

    // The sequence of buttons and switches to enter to win a round
    private sequence: ChannelValue[] = [];
    // Copy of sequence the player is chipping away at. Resets to sequence on wrong input.
    private tempSequence: ChannelValue[] = [];

    // Max number of buttons/flips in one round/sequence.
    private sequenceMaxLength = 4;

    private readonly momentarySwitchChannels = [PINS.pin40_buttonBlue, PINS.pin37_buttonYellow, PINS.pin35_buttonWhite];
    private readonly flipperSwitchChannels = [PINS.pin12_servo, PINS.pin16_red_switch2];

    constructor(protected gameEvents$: Observable<GameEventTypes>, protected emitGameEvent: (gameState: GameEventTypes) => void){
        super(gameEvents$.pipe(filter(Engine.filterOutFalseButtons), debounce(() => interval(50))), emitGameEvent);
    }

    protected handleStateChange(): void {
        switch (this.state) {
            case GameStates.EnterSequence:
                this.sequence = [];
                this.tempSequence = [];
                this.emitSequenceUpdate(false);
                break;
            case GameStates.FixSwitches:
                break;
            case GameStates.Defuse:
                this.tempSequence = [...this.sequence];
                this.emitSequenceUpdate();
                break;
            case GameStates.Explode:
                setTimeout(()=> this.emitGameEvent({eventType: GameEventType.StateChange, state: GameStates.MainMenu}) ,5000);
                break;
        }
    }

    /**
     * Emit SequenceUpdate message.
     * @param {boolean} isRight
     * @private
     */
    private emitSequenceUpdate(isRight: boolean = false) {
        this.emitGameEvent({
            eventType: GameEventType.Message,
            message: GameMessageType.SequenceUpdate,
            value: <SequenceUpdate>{
                sequenceLength: this.state === GameStates.Defuse ? this.tempSequence.length : this.sequence.length,
                sequenceMaxLength: this.sequenceMaxLength,
                right: isRight
            }
        });
    }

    handleValueChange(channel: number, value: any) {

        switch (this.state){
            case GameStates.MainMenu:
                if (channel === PINS.pin40_buttonBlue && value){
                    this.emitGameEvent({ eventType: GameEventType.StateChange, state: GameStates.EnterSequence});
                }
                break;
            case GameStates.EnterSequence:
                // Add button/switch value to sequence
                console.log(`Engine Enter CH: ${channel}, VAL: ${value}`);
                this.sequence.unshift({ channel: channel, value: value});
                console.log(`SEQUENCE LENGTH: ${this.sequence.length}`);
                console.log(`SEQUENCE: `, this.sequence);
                // I don't remember why I put this here. My guess is other components need it.
                this.emitSequenceUpdate(false);

                if (this.sequence.length >= this.sequenceMaxLength){
                    this.emitGameEvent({ eventType: GameEventType.StateChange, state: GameStates.Defuse});
                }
                break;
            case GameStates.Defuse:

                console.log(`Engine Defuse CH: ${channel}, VAL: ${value}`);
                const entry = this.tempSequence.pop();
                if (entry.channel === channel && entry.value === value){
                    console.log('MATCH');
                    this.emitSequenceUpdate(true);
                } else {
                    console.log('WRONG');
                    this.tempSequence = [...this.sequence];
                    this.emitSequenceUpdate(false);
                }
                console.log(`TEMP SEQUENCE LENGTH: ${this.tempSequence.length}`);
                console.log(`TEMP SEQUENCE: `, this.tempSequence);


                if (this.tempSequence.length < 1){
                    this.emitGameEvent({ eventType: GameEventType.StateChange, state: GameStates.EnterSequence});
                }
                break;

        }
    }


    private static filterOutFalseButtons(gameEvent: GameEventTypes): boolean {
        if (gameEvent.eventType === GameEventType.ValueChange){
            if ([PINS.pin37_buttonYellow, PINS.pin35_buttonWhite, PINS.pin40_buttonBlue].includes(gameEvent.channel) && !gameEvent.value){
                return false;
            }
        }
        return true;

    }
}
