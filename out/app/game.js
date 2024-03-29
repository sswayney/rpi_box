"use strict";
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
var rxjs_1 = require("rxjs");
var pins_enum_1 = require("./pins.enum");
var buttons_1 = require("./components/buttons");
var buzzer_1 = require("./components/buzzer");
var clock_timer_1 = require("./components/clock-timer");
var display_1 = require("./components/display");
var switches_1 = require("./components/switches");
var vibration_1 = require("./components/vibration");
var engine_1 = require("./engine");
var events_1 = require("./events/events");
var game_states_enum_1 = require("./game-states.enum");
/**
 * Main Game
 */
var Game = /** @class */ (function () {
    function Game() {
        /**
         * Engine
         */
        this.engine = new engine_1.Engine(this.gameEvents$, this.emitGameEvent);
        /**
         * Switches
         */
        this.switches = new switches_1.Switches(this.gameEvents$, this.emitGameEvent);
        /**
         * Buttons
         */
        this.buttons = new buttons_1.Buttons(this.gameEvents$, this.emitGameEvent);
        /**
         * Count down that uses the 7 segment display
         */
        this.countDown = new clock_timer_1.ClockTimer(this.gameEvents$, this.emitGameEvent);
        /**
         * LCD display
         */
        this.display = new display_1.Display(this.gameEvents$);
        /**
         * Buzzer sound
         */
        this.buzzer = new buzzer_1.Buzzer(this.gameEvents$);
        /**
         * Vibration motor
         */
        this.vibration = new vibration_1.Vibration(this.gameEvents$);
    }
    Object.defineProperty(Game.prototype, "gameEvents$", {
        get: function () {
            return Game._gameEvents.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Starts the game.
     * @returns {Promise<void>}
     */
    Game.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Start');
                        // console.log('Red switch Val', await this.switches.red.getValue());
                        // console.log('Green switch Val', await this.switches.green.getValue());
                        return [4 /*yield*/, this.switches.ready];
                    case 1:
                        // console.log('Red switch Val', await this.switches.red.getValue());
                        // console.log('Green switch Val', await this.switches.green.getValue());
                        _a.sent();
                        return [4 /*yield*/, this.buttons.ready];
                    case 2:
                        _a.sent();
                        this.emitGameEvent({ eventType: events_1.GameEventType.StateChange, state: game_states_enum_1.GameStates.MainMenu });
                        /**
                         * Value change listener
                         */
                        gpio.on('change', this.channelValueListener());
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates the main handler of value changes from the channels
     * @returns {(...args: any[]) => void}
     * @private
     */
    Game.prototype.channelValueListener = function () {
        var _this = this;
        var lastValues = new Map();
        // Pins that should not emit events/values/changes
        var nonValueChangeEmitPins = [pins_enum_1.PINS.pin15_vibration_motor, pins_enum_1.PINS.pin3_lcd, pins_enum_1.PINS.pin5_lcd, pins_enum_1.PINS.pin7_dio,
            pins_enum_1.PINS.pin11_clk, pins_enum_1.PINS.pin18_buzzer, pins_enum_1.PINS.pin33_buttonWhiteLED,
            pins_enum_1.PINS.pin36_buttonYellowLED, pins_enum_1.PINS.pin38_buttonBlueLED];
        return function (channel, value) {
            // If there was no change, don't emit a value change event
            if (lastValues.get(channel) !== value) {
                lastValues.set(channel, value);
                // Filter out channels that shouldn't be emitting value change events to the game.
                if (nonValueChangeEmitPins.includes(channel))
                    return;
                console.log('Channel ' + channel + ' value is now ' + value, new Date().toISOString());
                _this.emitGameEvent({ eventType: events_1.GameEventType.ValueChange, channel: channel, value: value });
            }
        };
    };
    /**
     * Emits a new game state to all listeners
     * @param {GameEventTypes} gameState
     */
    Game.prototype.emitGameEvent = function (gameState) {
        console.log("Game:emitGameEvent gameState:" + JSON.stringify(gameState));
        Game._gameEvents.next(gameState);
    };
    Game._gameEvents = new rxjs_1.Subject();
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map