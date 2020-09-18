import {Observable} from "rxjs";
import {EventEmitter} from "./events/event-emitter";
import {GameEventTypes} from "./events/events";
import {GameStates} from "./game-states.enum";

interface ChannelValue {
    channel: number;
    value: boolean;
}

export class Engine extends EventEmitter {

    private sequence: ChannelValue[] = [];
    private currentSequence: ChannelValue[] = [];

    constructor(protected gameEvents$: Observable<GameEventTypes>, protected emitGameEvent: (gameState: GameEventTypes) => void){
        super(gameEvents$, emitGameEvent);
    }

    protected handleStateChange(): void {
        switch (this.state) {
            case GameStates.EnterSequence:
                this.sequence = [];
                this.currentSequence = [];

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
        if (this.state === GameStates.EnterSequence){
            console.log(`CH: ${channel}, VAL: ${value}`);


            // this.currentSequence += event.key;
            // if (this.codeWord.startsWith(this.currentSequence)) {
            //     if (this.codeWord === this.currentSequence) {
            //         this.displayValue = this.displayValue === 'block' ? 'none' : 'block';
            //         this.currentSequence = '';
            //     }
            //     return;
            // }
            // this.currentSequence = '';

        }
    }


}
