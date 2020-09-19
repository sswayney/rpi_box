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
var pins_enum_1 = require("../../libs/pins.enum");
var event_responder_1 = require("../events/event-responder");
var game_states_enum_1 = require("../game-states.enum");
var Vibration = /** @class */ (function (_super) {
    __extends(Vibration, _super);
    function Vibration(gameState$) {
        var _this = _super.call(this, gameState$) || this;
        _this.gameState$ = gameState$;
        _this.motor = new led_1.LED(gpio, pins_enum_1.PINS.pin18_buzzer);
        return _this;
    }
    Vibration.prototype.handleStateChange = function () {
        switch (this.state) {
            case game_states_enum_1.GameStates.MainMenu:
                break;
            case game_states_enum_1.GameStates.EnterSequence:
                break;
            case game_states_enum_1.GameStates.FixSwitches:
                break;
            case game_states_enum_1.GameStates.Defuse:
                break;
            case game_states_enum_1.GameStates.Explode:
                break;
        }
    };
    Vibration.prototype.handleValueChange = function (channel, value) {
        switch (channel) {
            case pins_enum_1.PINS.pin37_buttonYellow:
                this.motor.off();
                this.motor.blink(false);
                break;
            case pins_enum_1.PINS.pin40_buttonBlue:
                this.motor.on();
                break;
            case pins_enum_1.PINS.pin35_buttonWhite:
                this.motor.blink(true);
                break;
        }
    };
    return Vibration;
}(event_responder_1.EventResponder));
exports.Vibration = Vibration;
//# sourceMappingURL=vibration.js.map