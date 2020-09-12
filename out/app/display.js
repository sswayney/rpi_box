"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lcdi2c_1 = require("../libs/lcdi2c");
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
    return Display;
}());
exports.Display = Display;
//# sourceMappingURL=display.js.map