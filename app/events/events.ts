import {GameStates} from "../game-states.enum";

/**
 * Enum of the types of events that are emitted
 */
export enum GameEventType {
    ValueChange = 'VALUE_CHANGE',
    StateChange = 'STATE_CHANGE',
    Message = 'MESSAGE'
}

export enum GameMessageType {
    // Five seconds left to get the sequence right
    FiveSecondsLeft = '5_SEC_LEFT',
    // Message about the state of the players sequence updates.
    SequenceUpdate = 'SEQUENCE_UPDATE'
}

export interface SequenceUpdate {
    // How many buttons/flips the player has left to enter to win the round
    sequenceLength: number;
    // Max number of buttons/flips are in the current sequence
    sequenceMaxLength: number;
    // True if the player entered a correct sequence.
    right: boolean;
}

// Base of all game events
export interface GameEvent {
    eventType: GameEventType;
}

// Emitted when the value of a channel has changed.
export interface ValueChangeEventType extends GameEvent {
    eventType: GameEventType.ValueChange;
    channel: number;
    value: any;
}

// The state of the game has changed. Example: we moved from main menu to enter sequence.
export interface StateChangeEventType extends GameEvent {
    eventType: GameEventType.StateChange;
    state: GameStates;
}

// Messages are sent out between state changes so components can interact with eachother.
export interface MessageEventType extends GameEvent {
    eventType: GameEventType.Message;
    message: GameMessageType;
    value?: any | SequenceUpdate;
}

// Types of events that can be emitted.
export type GameEventTypes = ValueChangeEventType | StateChangeEventType | MessageEventType;
