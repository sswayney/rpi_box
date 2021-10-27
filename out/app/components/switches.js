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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var gpio = require("rpi-gpio");
var switch_1 = require("../../libs/switch");
var event_emitter_1 = require("../events/event-emitter");
var events_1 = require("../events/events");
var game_states_enum_1 = require("../game-states.enum");
var pins_enum_1 = require("../pins.enum");
/**
 * Switches
 * Handles game play concerning the switches state changes and events
 *
 * Emits: FixSwitches and what ever the previous state was before the FixSwitches state was emitted.
 */
var Switches = /** @class */ (function (_super) {
    __extends(Switches, _super);
    function Switches(gameEvents$, emitGameEvent) {
        var _this = _super.call(this, gameEvents$, emitGameEvent) || this;
        _this.gameEvents$ = gameEvents$;
        _this.emitGameEvent = emitGameEvent;
        // The green switch object
        _this.green = new switch_1.Switch(gpio, pins_enum_1.PINS.pin12_servo);
        // The red switch object
        _this.red = new switch_1.Switch(gpio, pins_enum_1.PINS.pin16_red_switch2);
        _this.ready = Promise.all([_this.green.ready, _this.red.ready]);
        return _this;
    }
    Switches.prototype.handleStateChange = function () {
        var _this = this;
        if ([game_states_enum_1.GameStates.EnterSequence, game_states_enum_1.GameStates.Defuse].includes(this.state)) {
            /**
             * Why emit fix switches? If player is entering a sequence or defusing(and have to start
             * over again, then all switches have to go back to the starting state of down.
             *
             * Remember, we are responding to the state changing. So this is the beginning of the state.
             */
            this.readyForSequenceStart().then(function (ready) {
                if (!ready) {
                    _this.stateBeforeFixSwitches = _this.state;
                    _this.emitGameEvent({ eventType: events_1.GameEventType.StateChange, state: game_states_enum_1.GameStates.FixSwitches });
                }
            });
        }
    };
    Switches.prototype.handleValueChange = function (channel, value) {
        var _this = this;
        if ([pins_enum_1.PINS.pin12_servo, pins_enum_1.PINS.pin16_red_switch2].includes(channel)) {
            if (this.state === game_states_enum_1.GameStates.FixSwitches) {
                /**
                 *  We are in the fix switch state. Check if they are fixed and put
                 *  back the original state before we told player to fix them.
                 */
                this.readyForSequenceStart().then(function (ready) {
                    if (ready) {
                        _this.emitGameEvent({ eventType: events_1.GameEventType.StateChange, state: _this.stateBeforeFixSwitches });
                    }
                });
            }
        }
    };
    /**
     * Check all switches are down/false
     * @returns {Promise<boolean>}
     */
    Switches.prototype.readyForSequenceStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var greenVal, redVal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.green.getValue()];
                    case 1:
                        greenVal = _a.sent();
                        return [4 /*yield*/, this.red.getValue()];
                    case 2:
                        redVal = _a.sent();
                        return [2 /*return*/, !greenVal && !redVal];
                }
            });
        });
    };
    return Switches;
}(event_emitter_1.EventEmitter));
exports.Switches = Switches;
//# sourceMappingURL=switches.js.map