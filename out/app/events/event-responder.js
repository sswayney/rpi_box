"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var events_1 = require("./events");
var EventResponder = /** @class */ (function () {
    function EventResponder(gameEvents$) {
        var _this = this;
        this.gameEvents$ = gameEvents$;
        this.subscriptions = new rxjs_1.Subscription();
        this.subscriptions.add(gameEvents$.subscribe(function (gameEvent) {
            switch (gameEvent.eventType) {
                case events_1.GameEventType.ValueChange:
                    _this.handleValueChange(gameEvent.channel, gameEvent.value);
                    break;
                case events_1.GameEventType.StateChange:
                    _this.state = gameEvent.state;
                    _this.handleStateChange();
                    break;
                case events_1.GameEventType.Message:
                    _this.handleMessage(gameEvent);
                    break;
                default:
                    break;
            }
        }));
    }
    EventResponder.prototype.handleValueChange = function (channel, value) {
    };
    EventResponder.prototype.handleStateChange = function () {
    };
    EventResponder.prototype.handleMessage = function (message) {
    };
    return EventResponder;
}());
exports.EventResponder = EventResponder;
//# sourceMappingURL=event-responder.js.map