/*
* name;
*/
var EventMgr = /** @class */ (function () {
    function EventMgr() {
    }
    EventMgr.on = function (type, caller, listener, args) {
        if (args === void 0) { args = null; }
        return this._eventDispather.on(type, caller, listener, args);
    };
    EventMgr.once = function (type, caller, listener, args) {
        if (args === void 0) { args = null; }
        return this._eventDispather.once(type, caller, listener, args);
    };
    EventMgr.off = function (type, caller, listener, onceOnly) {
        if (onceOnly === void 0) { onceOnly = false; }
        return this._eventDispather.off(type, caller, listener, onceOnly);
    };
    EventMgr.emit = function (type, data) {
        if (data === void 0) { data = null; }
        return this._eventDispather.event(type, data);
    };
    EventMgr.offAll = function (type) {
        if (type === void 0) { type = null; }
        this._eventDispather.offAll(type);
    };
    EventMgr._eventDispather = new Laya.EventDispatcher();
    return EventMgr;
}());
//# sourceMappingURL=EventMgr.js.map