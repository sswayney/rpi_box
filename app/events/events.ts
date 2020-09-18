import {GameStates} from "../game-states.enum";

export enum GameEventType {
    ValueChange = 'VALUE_CHANGE',
    StateChange = 'STATE_CHANGE'
}

export interface GameEvent {
    eventType: GameEventType;
}

export interface ValueChangeEventType extends GameEvent {
    eventType: GameEventType.ValueChange;
    channel: number;
    value: any;
}

export interface StateChangeEventType extends GameEvent {
    eventType: GameEventType.StateChange;
    state: GameStates;
}

export type GameEventTypes = ValueChangeEventType | StateChangeEventType;
