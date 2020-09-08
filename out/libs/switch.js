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
var pin_1 = require("./pin");
/**
 * Class to abstract a switch
 */
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    function Switch(_gpio, _pin) {
        var _this = _super.call(this, _gpio, _pin) || this;
        _gpio.setup(_pin, gpio.DIR_IN, gpio.EDGE_BOTH);
        return _this;
    }
    return Switch;
}(pin_1.Pin));
exports.Switch = Switch;
//# sourceMappingURL=switch.js.map