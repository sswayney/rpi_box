import {EventResponder} from "./event-responder";
import {GameEventTypes} from "./events";
import { Observable } from "rxjs";

export class EventEmitter extends EventResponder {

    constructor(protected gameEvents$: Observable<GameEventTypes>, protected emitGameEvent: (gameState: GameEventTypes) => void) {
        super(gameEvents$);

    }

}
