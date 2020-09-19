import {Observable} from "rxjs";
import {PINS} from "../libs/pins.enum";
import {EventEmitter} from "./events/event-emitter";
import {GameEventType, GameEventTypes, GameMessageType, SequenceUpdate} from "./events/events";
import {GameStates} from "./game-states.enum";

interface ChannelValue {
    channel: number;
    value: boolean;
}

export class Engine extends EventEmitter {

    private sequence: ChannelValue[] = [];
    private tempSequence: ChannelValue[] = [];

    private sequenceMaxLength = 4;

    private readonly momentarySwitchChannels = [PINS.pin40_buttonBlue, PINS.pin37_buttonYellow, PINS.pin35_buttonWhite];
    private readonly flipperSwitchChannels = [PINS.pin12_green_switch1, PINS.pin16_red_switch2];

    constructor(protected gameEvents$: Observable<GameEventTypes>, protected emitGameEvent: (gameState: GameEventTypes) => void){
        super(gameEvents$, emitGameEvent);
    }

    protected handleStateChange(): void {
        switch (this.state) {
            case GameStates.EnterSequence:
                this.sequence = [];
                this.tempSequence = [];

                break;
            case GameStates.FixSwitches:

                break;
            case GameStates.Defuse:
                this.tempSequence = [...this.sequence];
                this.emitGameEvent({eventType: GameEventType.Message, message: GameMessageType.SequenceUpdate, value: <SequenceUpdate>{
                    sequenceLength: this.tempSequence.length, sequenceMaxLength: this.sequenceMaxLength, right: false}});

                break;
            case GameStates.Explode:

                setTimeout(()=> this.emitGameEvent({eventType: GameEventType.StateChange, state: GameStates.MainMenu}) ,5000);

                break;
        }
    }

    handleValueChange(channel: number, value: any) {

        switch (this.state){

            case GameStates.EnterSequence:

            if (this.momentarySwitchChannels.includes(channel) && value){
                console.log(`BUTT CH: ${channel}, VAL: ${value}`);
                this.sequence.unshift({ channel: channel, value: value});
                console.log(`SEQUENCE LENGTH: ${this.sequence.length}`);
                console.log(`SEQUENCE: `, this.sequence);
            }

            if (this.flipperSwitchChannels.includes(channel)){
                console.log(`FLIP CH: ${channel}, VAL: ${value}`);
                this.sequence.unshift({ channel: channel, value: value});
                console.log(`SEQUENCE LENGTH: ${this.sequence.length}`);
                console.log(`SEQUENCE: `, this.sequence);
            }


            if (this.sequence.length >= this.sequenceMaxLength){
                this.emitGameEvent({ eventType: GameEventType.StateChange, state: GameStates.Defuse});
            }
                break;
            case GameStates.Defuse:

                if (this.momentarySwitchChannels.includes(channel) && value){
                    console.log(`BUTT CH: ${channel}, VAL: ${value}`);
                    const entry = this.tempSequence.pop();
                    if (entry.channel === channel && entry.value === value){
                        console.log('MATCH');
                    } else {
                        console.log('WRONG');
                        this.tempSequence = [...this.sequence];
                    }
                    console.log(`TEMP SEQUENCE LENGTH: ${this.tempSequence.length}`);
                    console.log(`TEMP SEQUENCE: `, this.tempSequence);
                }

                if (this.flipperSwitchChannels.includes(channel)){
                    console.log(`FLIP CH: ${channel}, VAL: ${value}`);
                    const entry = this.tempSequence.pop();
                    if (entry.channel === channel && entry.value === value){
                        console.log('MATCH');
                    } else {
                        console.log('WRONG');
                        this.tempSequence = [...this.sequence];
                    }
                    console.log(`TEMP SEQUENCE LENGTH: ${this.tempSequence.length}`);
                    console.log(`TEMP SEQUENCE: `, this.tempSequence);
                }


                if (this.tempSequence.length < 1){
                    this.emitGameEvent({ eventType: GameEventType.StateChange, state: GameStates.EnterSequence});
                }
                break;

        }
    }


}
