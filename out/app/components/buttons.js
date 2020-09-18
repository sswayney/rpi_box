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
var button_led_1 = require("../../libs/button-led");
var pins_enum_1 = require("../../libs/pins.enum");
var event_responder_1 = require("../events/event-responder");
var game_states_enum_1 = require("../game-states.enum");
var Buttons = /** @class */ (function (_super) {
    __extends(Buttons, _super);
    function Buttons(gameState$) {
        var _this = _super.call(this, gameState$) || this;
        _this.gameState$ = gameState$;
        /**
         * Buttons with LEDS
         */
        _this.blue = new button_led_1.ButtonLED(gpio, pins_enum_1.PINS.pin40_buttonBlue, pins_enum_1.PINS.pin38_buttonBlue);
        _this.yellow = new button_led_1.ButtonLED(gpio, pins_enum_1.PINS.pin37_buttonYellow, pins_enum_1.PINS.pin36_buttonYellow);
        _this.white = new button_led_1.ButtonLED(gpio, pins_enum_1.PINS.pin35_buttonWhite, pins_enum_1.PINS.pin33_buttonWhite);
        return _this;
    }
    Buttons.prototype.handleStateChange = function () {
        this.blue.led.blink(false);
        this.yellow.led.blink(false);
        this.white.led.blink(false);
        switch (this.state) {
            case game_states_enum_1.GameStates.Explode:
                this.blue.led.blink(true, 250);
                this.yellow.led.blink(true, 300);
                this.white.led.blink(true, 500);
                break;
        }
    };
    Buttons.prototype.blink = function (doBlink) {
        console.log('Buttons: doBlink', doBlink);
    };
    Buttons.prototype.handleValueChange = function (channel, value) {
        switch (channel) {
            case this.blue.button.pin:
                value ? this.blue.led.on() : this.blue.led.off();
                break;
            case this.yellow.button.pin:
                value ? this.yellow.led.on() : this.yellow.led.off();
                break;
            case this.white.button.pin:
                value ? this.white.led.on() : this.white.led.off();
                break;
        }
    };
    return Buttons;
}(event_responder_1.EventResponder));
exports.Buttons = Buttons;
//# sourceMappingURL=buttons.js.map