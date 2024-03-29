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
var lcdi2c_1 = require("../../libs/lcdi2c");
var event_responder_1 = require("../events/event-responder");
var events_1 = require("../events/events");
var game_states_enum_1 = require("../game-states.enum");
var Display = /** @class */ (function (_super) {
    __extends(Display, _super);
    function Display(gameState$) {
        var _this = _super.call(this, gameState$) || this;
        _this.gameState$ = gameState$;
        /**
         * LCD display
         * Uses pins 3 and 5
         */
        _this.lcd = new lcdi2c_1.LCD(1, 0x27, 16, 2);
        return _this;
    }
    Display.prototype.clear = function () {
        this.lcd.clear();
    };
    Display.prototype.println = function (value, line) {
        this.lcd.println(value, line);
    };
    Display.prototype.handleStateChange = function () {
        switch (this.state) {
            case game_states_enum_1.GameStates.MainMenu:
                this.lcd.clear();
                this.lcd.println('  BOMB  POTATO  ', 1);
                this.lcd.println('Hit Blue 2 Start', 2);
                break;
            case game_states_enum_1.GameStates.EnterSequence:
                this.lcd.clear();
                this.lcd.println('Enter Sequence', 1);
                // this.lcd.println('###', 2);
                break;
            case game_states_enum_1.GameStates.FixSwitches:
                this.lcd.clear();
                this.lcd.println('Flip Switches', 1);
                this.lcd.println('Down', 2);
                break;
            case game_states_enum_1.GameStates.Defuse:
                this.lcd.clear();
                this.lcd.println('BOMB ACTIVATED', 1);
                break;
            case game_states_enum_1.GameStates.Explode:
                this.lcd.clear();
                this.lcd.println('^&@#$++_)(*&^%@#', 1);
                this.lcd.println('&%@$&^&*%$#!@#%&', 2);
                break;
        }
    };
    Display.prototype.handleMessage = function (message) {
        switch (message.message) {
            case events_1.GameMessageType.SequenceUpdate:
                /**
                 * When a sequence update happens we want to show the player how many
                 * buttons/flips they have left to enter.
                 */
                var sequenceUpdate = message.value;
                var displayText = '';
                for (var i = 0; i < sequenceUpdate.sequenceMaxLength; i++) {
                    if (this.state == game_states_enum_1.GameStates.EnterSequence) {
                        displayText += i < sequenceUpdate.sequenceLength ? ' ' : '#';
                    }
                    if (this.state == game_states_enum_1.GameStates.Defuse) {
                        displayText += i < (sequenceUpdate.sequenceMaxLength - sequenceUpdate.sequenceLength) ? ' ' : '#';
                    }
                }
                this.lcd.println('                ', 2);
                this.lcd.println(displayText, 2);
                break;
        }
    };
    Display.prototype.handleValueChange = function (channel, value) {
        // switch (channel) {
        //     case PINS.pin35_buttonWhite:
        //         this.lcd.clear();
        //         this.lcd.println('COLOR', 1);
        //         this.lcd.println('White', 2);
        //         break;
        //     case PINS.pin37_buttonYellow:
        //         this.lcd.clear();
        //         this.lcd.println('COLOR', 1);
        //         this.lcd.println('Yellow', 2);
        //         break;
        //     case PINS.pin40_buttonBlue:
        //         this.lcd.clear();
        //         this.lcd.println('COLOR', 1);
        //         this.lcd.println('Blue', 2);
        //         break;
        // }
    };
    return Display;
}(event_responder_1.EventResponder));
exports.Display = Display;
//# sourceMappingURL=display.js.map