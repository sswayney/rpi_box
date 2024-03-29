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
var event_emitter_1 = require("../events/event-emitter");
var game_states_enum_1 = require("../game-states.enum");
var pins_enum_1 = require("../pins.enum");
var Buttons = /** @class */ (function (_super) {
    __extends(Buttons, _super);
    function Buttons(gameState$, emitGameEvent) {
        var _this = _super.call(this, gameState$, emitGameEvent) || this;
        _this.gameState$ = gameState$;
        _this.emitGameEvent = emitGameEvent;
        /**
         * Buttons with LEDS
         */
        _this.blue = new button_led_1.ButtonLED(gpio, pins_enum_1.PINS.pin40_buttonBlue, pins_enum_1.PINS.pin38_buttonBlueLED);
        _this.yellow = new button_led_1.ButtonLED(gpio, pins_enum_1.PINS.pin37_buttonYellow, pins_enum_1.PINS.pin36_buttonYellowLED);
        _this.white = new button_led_1.ButtonLED(gpio, pins_enum_1.PINS.pin35_buttonWhite, pins_enum_1.PINS.pin33_buttonWhiteLED);
        _this.ready = Promise.all([_this.blue.button.ready, _this.yellow.button.ready, _this.white.button.ready]);
        return _this;
    }
    Buttons.prototype.handleStateChange = function () {
        var _this = this;
        this.blue.led.blink(false);
        this.yellow.led.blink(false);
        this.white.led.blink(false);
        switch (this.state) {
            case game_states_enum_1.GameStates.MainMenu:
                this.blue.led.blink(true);
                this.yellow.led.blink(true, 10000, 5000);
                this.white.led.blink(true, 20000, 10000);
                break;
            case game_states_enum_1.GameStates.Explode:
                this.blue.led.blink(true, 100, 50);
                this.yellow.led.blink(true, 110, 55);
                this.white.led.blink(true, 120, 60);
                break;
            case game_states_enum_1.GameStates.FixSwitches:
                setTimeout(function () { return _this.blue.led.blink(true, 400, 200); }, 1);
                setTimeout(function () { return _this.yellow.led.blink(true, 400, 200); }, 100);
                setTimeout(function () { return _this.white.led.blink(true, 400, 200); }, 250);
                break;
            case game_states_enum_1.GameStates.Defuse:
                this.blue.led.on();
                this.yellow.led.on();
                this.white.led.on();
                break;
        }
    };
    Buttons.prototype.blink = function (doBlink) {
        console.log('Buttons: doBlink', doBlink);
    };
    Buttons.prototype.handleValueChange = function (channel, value) {
        var _this = this;
        if (this.state === game_states_enum_1.GameStates.Defuse) {
            /**
             * During the defusing state, we will turn them off when pressed.
             */
            switch (channel) {
                case this.blue.button.pin:
                    value ? this.blue.led.off() : setTimeout(function () { return _this.blue.led.on(); }, 250);
                    break;
                case this.yellow.button.pin:
                    value ? this.yellow.led.off() : setTimeout(function () { return _this.yellow.led.on(); }, 250);
                    break;
                case this.white.button.pin:
                    value ? this.white.led.off() : setTimeout(function () { return _this.white.led.on(); }, 250);
                    break;
            }
            return;
        }
        /**
         * Default behavior is to light up when touched
         */
        switch (channel) {
            case this.blue.button.pin:
                value ? this.blue.led.on() : setTimeout(function () { return _this.blue.led.off(); }, 250);
                break;
            case this.yellow.button.pin:
                value ? this.yellow.led.on() : setTimeout(function () { return _this.yellow.led.off(); }, 250);
                break;
            case this.white.button.pin:
                value ? this.white.led.on() : setTimeout(function () { return _this.white.led.off(); }, 250);
                break;
        }
    };
    return Buttons;
}(event_emitter_1.EventEmitter));
exports.Buttons = Buttons;
//# sourceMappingURL=buttons.js.map