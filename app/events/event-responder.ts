import {Observable, Subscription} from "rxjs";
import {GameStates} from "../game-states.enum";
import {GameEventType, GameEventTypes, GameMessageType, MessageEventType} from "./events";

export abstract class EventResponder {

    protected subscriptions = new Subscription();

    protected state: GameStates;

    protected constructor(protected gameEvents$: Observable<GameEventTypes>) {
        this.subscriptions.add(gameEvents$.subscribe((gameEvent: GameEventTypes) => {
            switch (gameEvent.eventType) {
                case GameEventType.ValueChange:
                    this.handleValueChange(gameEvent.channel, gameEvent.value);
                    break;
                case GameEventType.StateChange:
                    this.state = gameEvent.state;
                    this.handleStateChange();
                    break;
                case GameEventType.Message:
                    this.handleMessage(gameEvent);
                    break;
                default:
                    break;
            }
        }));
    }

    protected handleValueChange(channel: number, value: any): void {
    }

    protected handleStateChange(): void {
    }

    protected handleMessage(message: MessageEventType): void {
    }
}
