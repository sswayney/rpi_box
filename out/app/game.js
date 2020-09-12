"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gpio = require("rpi-gpio");
var buttons_1 = require("./buttons");
var count_down_1 = require("./count-down");
var display_1 = require("./display");
var switches_1 = require("./switches");
/**
 * Main Game
 */
var Game = /** @class */ (function () {
    function Game() {
        /**
         * Switches
         */
        this.switches = new switches_1.Switches();
        /**
         * Buttons
         */
        this.buttons = new buttons_1.Buttons();
        /**
         * Count down that uses the 7 segment display
         */
        this.countDown = new count_down_1.CountDown();
        /**
         * LCD display
         */
        this.display = new display_1.Display();
        this.updaters = [];
        this.updaters.push(this.buttons);
        this.updaters.push(this.countDown);
        this.updaters.push(this.display);
    }
    Game.prototype.start = function () {
        /**
         * Value change listener
         */
        gpio.on('change', this.channelValueListener());
    };
    Game.prototype.channelValueListener = function () {
        var _this = this;
        var lastValues = new Map();
        return function (channel, value) {
            if (lastValues.get(channel) !== value) {
                lastValues.set(channel, value);
                console.log('Channel ' + channel + ' value is now ' + value);
                /**
                 * Pass update values to all update able components
                 */
                _this.updaters.forEach(function (u) { return u.update(channel, value); });
            }
        };
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map