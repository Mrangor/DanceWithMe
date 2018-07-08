/**
 * 网络代理类
 */
var NetAgent = /** @class */ (function () {
    function NetAgent(name, reserved) {
        if (reserved === void 0) { reserved = false; }
        this.name = null;
        this.id = null;
        this._reserved = false; //是否保留，不清理
        this.handlers = {};
        this.name = name;
        this.id = NetAgent.idbase++;
        this._reserved = reserved;
        console.log('NetAgent', this.name, ':', this.id, 'has been created.');
    }
    Object.defineProperty(NetAgent.prototype, "reserved", {
        get: function () {
            return this._reserved;
        },
        enumerable: true,
        configurable: true
    });
    NetAgent.prototype.addTarget = function (target, prefix) {
        if (prefix === void 0) { prefix = null; }
        if (!target) {
            return;
        }
        if (!prefix) {
            prefix = 'onnet_';
        }
        for (var k in target) {
            if (k.search(prefix) == 0) {
                var event = k.substr(prefix.length);
                var fn = target[k];
                var tFunc = fn.bind(target);
                this.addHandler(event, tFunc);
            }
        }
    };
    NetAgent.prototype.addHandler = function (msgType, func) {
        this.handlers[msgType] = func;
    };
    //网络消息
    NetAgent.prototype.onMessage = function (msgType, data) {
        var func = this.handlers[msgType];
        if (func) {
            func(data);
        }
    };
    NetAgent.idbase = 0;
    return NetAgent;
}());
//# sourceMappingURL=NetAgent.js.map