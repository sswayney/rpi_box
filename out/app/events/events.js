"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enum of the types of events that are emitted
 */
var GameEventType;
(function (GameEventType) {
    GameEventType["ValueChange"] = "VALUE_CHANGE";
    GameEventType["StateChange"] = "STATE_CHANGE";
    GameEventType["Message"] = "MESSAGE";
})(GameEventType = exports.GameEventType || (exports.GameEventType = {}));
var GameMessageType;
(function (GameMessageType) {
    // Five seconds left to get the sequence right
    GameMessageType["FiveSecondsLeft"] = "5_SEC_LEFT";
    // Message about the state of the players sequence updates.
    GameMessageType["SequenceUpdate"] = "SEQUENCE_UPDATE";
})(GameMessageType = exports.GameMessageType || (exports.GameMessageType = {}));
//# sourceMappingURL=events.js.map