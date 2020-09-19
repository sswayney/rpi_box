import {GameStates} from "../game-states.enum";

export enum GameEventType {
    ValueChange = 'VALUE_CHANGE',
    StateChange = 'STATE_CHANGE',
    Message = 'MESSAGE'
}

export enum GameMessageType {
    FiveSecondsLeft = '5_SEC_LEFT',
    SequenceUpdate = 'SEQUENCE_UPDATE'
}

export interface SequenceUpdate {
    sequenceLength: number;
    sequenceMaxLength: number;
    right: boolean;
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

export interface MessageEventType extends GameEvent {
    eventType: GameEventType.Message;
    message: GameMessageType;
    value?: any | SequenceUpdate;
}


export type GameEventTypes = ValueChangeEventType | StateChangeEventType | MessageEventType;
