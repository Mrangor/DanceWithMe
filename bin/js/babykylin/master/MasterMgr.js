/**
 *
 */
var MasterMgr = /** @class */ (function () {
    function MasterMgr() {
        this.settings = null;
        this.masterCache = {};
        this._current = null;
        this.settings = MasterSettings.masters;
    }
    Object.defineProperty(MasterMgr, "inst", {
        get: function () {
            if (MasterMgr._inst == null) {
                MasterMgr._inst = new MasterMgr();
            }
            return MasterMgr._inst;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MasterMgr, "current", {
        get: function () {
            return MasterMgr._inst._current;
        },
        enumerable: true,
        configurable: true
    });
    MasterMgr.prototype.switch = function (id, dontLoadScene, params) {
        if (dontLoadScene === void 0) { dontLoadScene = false; }
        if (params === void 0) { params = null; }
        var cfg = this.settings[id];
        if (this._current && this._current.setting.id == id) {
            console.log('no need switch.');
            return;
        }
        if (!cfg) {
            console.log('can not find settings with id:', id);
            return false;
        }
        if (cfg.enable == false) {
            return false;
        }
        cfg.id = id;
        if (this._current) {
            this._current.exit(); //退出当前场景时，对网络等模块和数据进行重置
        }
        if (!this.masterCache[cfg.master_script]) {
            var MasterClass = cfg.master_script;
            this.masterCache[cfg.master_script] = new MasterClass();
        }
        this._current = this.masterCache[cfg.master_script];
        this._current.setting = cfg;
        this._current.enter(params); //在自己的Master逻辑初始化网络等模块和数据
        if (cfg.entry_scene && !dontLoadScene) {
            SceneMgr.inst.replace(cfg.entry_scene);
        }
        return true;
    };
    MasterMgr._inst = null;
    return MasterMgr;
}());
//# sourceMappingURL=MasterMgr.js.map