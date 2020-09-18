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
Object.defineProperty(exports, "__esModule", { value: true });
var event_emitter_1 = require("./events/event-emitter");
var game_states_enum_1 = require("./game-states.enum");
var Engine = /** @class */ (function (_super) {
    __extends(Engine, _super);
    function Engine(gameEvents$, emitGameEvent) {
        var _this = _super.call(this, gameEvents$, emitGameEvent) || this;
        _this.gameEvents$ = gameEvents$;
        _this.emitGameEvent = emitGameEvent;
        _this.sequence = [];
        _this.currentSequence = [];
        return _this;
    }
    Engine.prototype.handleStateChange = function () {
        switch (this.state) {
            case game_states_enum_1.GameStates.EnterSequence:
                this.sequence = [];
                this.currentSequence = [];
                break;
            case game_states_enum_1.GameStates.FixSwitches:
                break;
            case game_states_enum_1.GameStates.Defuse:
                break;
            case game_states_enum_1.GameStates.Explode:
                break;
        }
    };
    Engine.prototype.handleValueChange = function (channel, value) {
        if (this.state === game_states_enum_1.GameStates.EnterSequence) {
            console.log("CH: " + channel + ", VAL: " + value);
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
    };
    return Engine;
}(event_emitter_1.EventEmitter));
exports.Engine = Engine;
//# sourceMappingURL=engine.js.map