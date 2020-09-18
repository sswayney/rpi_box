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
var event_responder_1 = require("./event-responder");
var EventEmitter = /** @class */ (function (_super) {
    __extends(EventEmitter, _super);
    function EventEmitter(gameEvents$, emitGameEvent) {
        var _this = _super.call(this, gameEvents$) || this;
        _this.gameEvents$ = gameEvents$;
        _this.emitGameEvent = emitGameEvent;
        return _this;
    }
    return EventEmitter;
}(event_responder_1.EventResponder));
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=event-emitter.js.map