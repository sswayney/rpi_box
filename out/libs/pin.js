"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Basic pin
 */
var Pin = /** @class */ (function () {
    function Pin(_gpio, _pin) {
        this._gpio = _gpio;
        this._pin = _pin;
    }
    Object.defineProperty(Pin.prototype, "pin", {
        get: function () {
            return this._pin;
        },
        enumerable: true,
        configurable: true
    });
    return Pin;
}());
exports.Pin = Pin;
//# sourceMappingURL=pin.js.map