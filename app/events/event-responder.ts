import {Observable, Subscription} from "rxjs";
import {GameStates} from "../game-states.enum";
import {GameEventType, GameEventTypes} from "./events";

export abstract class EventResponder {

    protected subscriptions = new Subscription();

    protected constructor(protected gameEvents$: Observable<GameEventTypes>) {
        this.subscriptions.add(gameEvents$.subscribe((gameEvent: GameEventTypes) => {
            switch (gameEvent.eventType) {
                case GameEventType.ValueChange:
                    this.handleValueChange(gameEvent.channel, gameEvent.value);
                    break;
                case GameEventType.StateChange:
                    this.handleStateChange(gameEvent.state);
                    break;
                default:
                    break;
            }
        }));
    }

    protected handleValueChange(channel: number, value: any): void {
    }

    protected handleStateChange(state: GameStates): void {
    }
}
