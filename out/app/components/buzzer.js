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
var gpio = require("rpi-gpio");
var led_1 = require("../../libs/led");
var pins_enum_1 = require("../pins.enum");
var event_responder_1 = require("../events/event-responder");
var events_1 = require("../events/events");
var game_states_enum_1 = require("../game-states.enum");
var Buzzer = /** @class */ (function (_super) {
    __extends(Buzzer, _super);
    function Buzzer(gameState$) {
        var _this = _super.call(this, gameState$) || this;
        _this.gameState$ = gameState$;
        _this.buzzer = new led_1.LED(gpio, pins_enum_1.PINS.pin18_buzzer);
        return _this;
    }
    Buzzer.prototype.handleStateChange = function () {
        var _this = this;
        this.buzzer.off();
        this.buzzer.blink(false);
        switch (this.state) {
            case game_states_enum_1.GameStates.MainMenu:
                break;
            case game_states_enum_1.GameStates.EnterSequence:
                this.buzzer.blip(100);
                break;
            case game_states_enum_1.GameStates.FixSwitches:
                break;
            case game_states_enum_1.GameStates.Defuse:
                this.buzzer.blip(100);
                break;
            case game_states_enum_1.GameStates.Explode:
                setTimeout(function () { return _this.buzzer.on(); }, 100);
                break;
        }
    };
    Buzzer.prototype.handleValueChange = function (channel, value) {
        // switch (channel) {
        //     case PINS.pin35_buttonWhite:
        //         this.buzzer.blip(100);
        //         break;
        //     case PINS.pin37_buttonYellow:
        //         this.buzzer.blink(false);
        //         break;
        //     case PINS.pin40_buttonBlue:
        //         this.buzzer.blink(true, 1000, 200);
        //         break;
        // }
    };
    Buzzer.prototype.handleMessage = function (message) {
        switch (message.message) {
            case events_1.GameMessageType.FiveSecondsLeft:
                /**
                 * Start beeping as we count down 5 seconds left!
                 */
                this.buzzer.blink(true, 1000, 200);
                break;
        }
    };
    return Buzzer;
}(event_responder_1.EventResponder));
exports.Buzzer = Buzzer;
//# sourceMappingURL=buzzer.js.map