/*
* BK is short of Babykylin;
*/
function urlParse() {
    var params = {};
    if (window.location == null) {
        return params;
    }
    var name, value;
    var str = window.location.href; //取得整个地址栏
    var num = str.indexOf("?");
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
    var arr = str.split("&"); //各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            params[name] = value;
        }
    }
    return params;
}
var bk = /** @class */ (function () {
    function bk() {
    }
    Object.defineProperty(bk, "args", {
        get: function () {
            if (this._args == null) {
                this._args = urlParse();
            }
            return this._args;
        },
        enumerable: true,
        configurable: true
    });
    bk.configure = function (settings) {
        this.settings = settings;
        //design resolutions.
        this.setDesignResolution(settings.designWidth, settings.designHeight);
        //stats panel.
        if (settings.showStats) {
            //laya.utils.Stat.show(settings.statsX,settings.statsY);
        }
        Laya.stage.frameRate = settings.frameRate;
        this.initModules();
        Laya.stage.on(Laya.Event.RESIZE, this, function () {
            console.log('screen resize');
            // this.adjustScaleMode();
        });
    };
    bk.initModules = function () {
        UIMgr.inst.configure(this.settings.maxUILayer, this.settings.alertWidget, this.settings.wcWidget);
        bk.net = new NetConnection();
    };
    /**
     * 初始化场景舞台
     * @param dw 宽
     * @param dh 高
     */
    bk.setDesignResolution = function (dw, dh) {
        Laya.init(dw, dh);
        Laya.stage.width = dw;
        Laya.stage.height = dh;
        //align
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        //
        if (dw > dh) {
            //横屏
            Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        }
        else {
            //横屏
            Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        }
        this.adjustScaleMode();
    };
    bk.adjustScaleMode = function () {
        //这个宽高是真实的宽高。
        var rw = Laya.Browser.width;
        var rh = Laya.Browser.height;
        var dw = Laya.stage.desginWidth;
        var dh = Laya.stage.desginHeight;
        //
        if (dw > dh) {
            if (rh > rw) {
                var t = rw;
                rw = rh;
                rh = t;
            }
        }
        else {
            if (rh < rw) {
                var t = rw;
                rw = rh;
                rh = t;
            }
        }
        //确保不能低于最低高度
        if (rw / rh > dw / dh) {
            Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
        }
        else {
            Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        }
    };
    bk.start = function (startMaster) {
        //keep this in the end line.
        MasterMgr.inst.switch(startMaster);
        var sprite = new Laya.EventDispatcher();
        Time.time = Date.now();
        setInterval(function () {
            Time.deltaTime = Date.now() - Time.time;
            Time.time = Date.now();
            Time.frameCount++;
            bk.update();
        }, 1000 / 30);
    };
    bk.registerUpdater = function (target, fnUpdate) {
        bk._updaters.push({
            target: target,
            fn: fnUpdate,
        });
    };
    /**
     * 游戏所有更新统一调用
     */
    bk.update = function () {
        for (var k in bk._updaters) {
            var up = bk._updaters[k];
            up.fn.apply(up.target);
        }
    };
    bk.on = function (type, caller, listener, args) {
        if (args === void 0) { args = null; }
        this._eventDispather.on(type, caller, listener, args);
    };
    bk.off = function (type, caller, listener, onceOnly) {
        if (onceOnly === void 0) { onceOnly = false; }
        this._eventDispather.off(type, caller, listener, onceOnly);
    };
    bk.emit = function (type, data) {
        if (data === void 0) { data = null; }
        this._eventDispather.event(type, data);
    };
    bk.reset = function () {
        this._eventDispather.offAll();
    };
    bk.settings = null;
    //managers
    bk.net = null;
    bk.online = true;
    bk._updaters = [];
    bk._eventDispather = new Laya.EventDispatcher();
    bk._args = null;
    return bk;
}());
//# sourceMappingURL=BabyKylin.js.map