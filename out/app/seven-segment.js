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
var pins_enum_1 = require("../libs/pins.enum");
var tm1637_1 = require("../libs/tm1637");
var SevenSegment = /** @class */ (function (_super) {
    __extends(SevenSegment, _super);
    function SevenSegment() {
        return _super.call(this, gpio, pins_enum_1.PINS.pin11_clk, pins_enum_1.PINS.pin7_dio) || this;
    }
    return SevenSegment;
}(tm1637_1.TM1637));
exports.SevenSegment = SevenSegment;
//# sourceMappingURL=seven-segment.js.map