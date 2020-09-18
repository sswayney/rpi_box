"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var pins_enum_1 = require("../libs/pins.enum");
var event_emitter_1 = require("./events/event-emitter");
var events_1 = require("./events/events");
var game_states_enum_1 = require("./game-states.enum");
var Engine = /** @class */ (function (_super) {
    __extends(Engine, _super);
    function Engine(gameEvents$, emitGameEvent) {
        var _this = _super.call(this, gameEvents$, emitGameEvent) || this;
        _this.gameEvents$ = gameEvents$;
        _this.emitGameEvent = emitGameEvent;
        _this.sequence = [];
        _this.tempSequence = [];
        _this.sequenceMaxLength = 5;
        _this.momentarySwitchChannels = [pins_enum_1.PINS.pin40_buttonBlue, pins_enum_1.PINS.pin37_buttonYellow, pins_enum_1.PINS.pin35_buttonWhite];
        _this.flipperSwitchChannels = [pins_enum_1.PINS.pin12_green_switch1, pins_enum_1.PINS.pin16_red_switch2];
        return _this;
    }
    Engine.prototype.handleStateChange = function () {
        var _this = this;
        switch (this.state) {
            case game_states_enum_1.GameStates.EnterSequence:
                this.sequence = [];
                this.tempSequence = [];
                break;
            case game_states_enum_1.GameStates.FixSwitches:
                break;
            case game_states_enum_1.GameStates.Defuse:
                this.tempSequence = __spreadArrays(this.sequence);
                break;
            case game_states_enum_1.GameStates.Explode:
                setTimeout(function () { return _this.emitGameEvent({ eventType: events_1.GameEventType.StateChange, state: game_states_enum_1.GameStates.EnterSequence }); }, 5000);
                break;
        }
    };
    Engine.prototype.handleValueChange = function (channel, value) {
        switch (this.state) {
            case game_states_enum_1.GameStates.EnterSequence:
                if (this.momentarySwitchChannels.includes(channel) && value) {
                    console.log("BUTT CH: " + channel + ", VAL: " + value);
                    this.sequence.unshift({ channel: channel, value: value });
                    console.log("SEQUENCE LENGTH: " + this.sequence.length);
                    console.log("SEQUENCE: ", this.sequence);
                }
                if (this.flipperSwitchChannels.includes(channel)) {
                    console.log("FLIP CH: " + channel + ", VAL: " + value);
                    this.sequence.unshift({ channel: channel, value: value });
                    console.log("SEQUENCE LENGTH: " + this.sequence.length);
                    console.log("SEQUENCE: ", this.sequence);
                }
                if (this.sequence.length >= this.sequenceMaxLength) {
                    this.emitGameEvent({ eventType: events_1.GameEventType.StateChange, state: game_states_enum_1.GameStates.Defuse });
                }
                break;
            case game_states_enum_1.GameStates.Defuse:
                if (this.momentarySwitchChannels.includes(channel) && value) {
                    console.log("BUTT CH: " + channel + ", VAL: " + value);
                    var entry = this.tempSequence.pop();
                    if (entry.channel === channel && entry.value === value) {
                        console.log('MATCH');
                    }
                    else {
                        console.log('WRONG');
                        this.tempSequence = __spreadArrays(this.sequence);
                    }
                    console.log("TEMP SEQUENCE LENGTH: " + this.tempSequence.length);
                    console.log("TEMP SEQUENCE: ", this.tempSequence);
                }
                if (this.flipperSwitchChannels.includes(channel)) {
                    console.log("FLIP CH: " + channel + ", VAL: " + value);
                    var entry = this.tempSequence.pop();
                    if (entry.channel === channel && entry.value === value) {
                        console.log('MATCH');
                    }
                    else {
                        console.log('WRONG');
                        this.tempSequence = __spreadArrays(this.sequence);
                    }
                    console.log("TEMP SEQUENCE LENGTH: " + this.tempSequence.length);
                    console.log("TEMP SEQUENCE: ", this.tempSequence);
                }
                if (this.tempSequence.length < 1) {
                    this.emitGameEvent({ eventType: events_1.GameEventType.StateChange, state: game_states_enum_1.GameStates.EnterSequence });
                }
                break;
        }
    };
    return Engine;
}(event_emitter_1.EventEmitter));
exports.Engine = Engine;
//# sourceMappingURL=engine.js.map