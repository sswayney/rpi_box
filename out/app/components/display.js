"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lcdi2c_1 = require("../../libs/lcdi2c");
var pins_enum_1 = require("../../libs/pins.enum");
var Display = /** @class */ (function () {
    function Display() {
        /**
         * LCD display
         * Uses pins 3 and 5
         */
        this.lcd = new lcdi2c_1.LCD(1, 0x27, 16, 2);
        this.lcd.clear();
        this.lcd.home();
        this.lcd.println('ENTER SEQUENCE', 1);
        this.lcd.println('####', 2);
    }
    Display.prototype.clear = function () {
        this.lcd.clear();
    };
    Display.prototype.println = function (value, line) {
        this.lcd.println(value, line);
    };
    Display.prototype.update = function (channel, value) {
        switch (channel) {
            case pins_enum_1.PINS.pin35_buttonWhite:
                this.lcd.clear();
                this.lcd.println('COLOR', 1);
                this.lcd.println('White', 2);
                break;
            case pins_enum_1.PINS.pin37_buttonYellow:
                this.lcd.clear();
                this.lcd.println('COLOR', 1);
                this.lcd.println('Yellow', 2);
                break;
            case pins_enum_1.PINS.pin40_buttonBlue:
                this.lcd.clear();
                this.lcd.println('COLOR', 1);
                this.lcd.println('Blue', 2);
                break;
        }
    };
    return Display;
}());
exports.Display = Display;
//# sourceMappingURL=display.js.map