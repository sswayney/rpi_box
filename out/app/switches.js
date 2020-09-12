"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gpio = require("rpi-gpio");
var pins_enum_1 = require("../libs/pins.enum");
var switch_1 = require("../libs/switch");
var Switches = /** @class */ (function () {
    function Switches() {
        this.green = new switch_1.Switch(gpio, pins_enum_1.PINS.pin12_green_switch1);
        this.red = new switch_1.Switch(gpio, pins_enum_1.PINS.pin16_red_switch2);
    }
    return Switches;
}());
exports.Switches = Switches;
//# sourceMappingURL=switches.js.map