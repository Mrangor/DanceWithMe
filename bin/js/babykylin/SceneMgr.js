/*
* 场景管理器
*实现场景切换
*/
var SceneMgr = /** @class */ (function () {
    function SceneMgr() {
        this._currentScene = null;
        bk.registerUpdater(this, this.update);
    }
    Object.defineProperty(SceneMgr, "inst", {
        get: function () {
            if (SceneMgr._inst == null) {
                SceneMgr._inst = new SceneMgr();
            }
            return SceneMgr._inst;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneMgr.prototype, "currentScene", {
        get: function () { return this._currentScene; },
        enumerable: true,
        configurable: true
    });
    SceneMgr.prototype.start = function (typeOfScene) {
        if (this._currentScene) {
            throw new Error('SceneMgr:start can be called only once.');
        }
        this.replace(typeOfScene);
    };
    SceneMgr.prototype.replace = function (typeOfScene) {
        var nextScene = new typeOfScene();
        var size = nextScene.getDesignResolution(); //获取预设场景宽高
        bk.setDesignResolution(size.x, size.y); //初始化下一个场景宽高
        //如果有场景预设资源则加载后在切换场景
        var res = nextScene.getRes();
        if (res && res.length) {
            Laya.loader.load(res, Handler.create(this, this.onLoaded, [nextScene]), Handler.create(this, this.onProgress, null, false));
        }
        else {
            this.onLoaded(nextScene);
        }
    };
    SceneMgr.prototype.onLoaded = function (nextScene) {
        //重置掉之前注册的事件
        bk.reset();
        if (this._currentScene) {
            this._currentScene.end();
            UIMgr.inst.clear();
        }
        this._currentScene = nextScene;
        this._currentScene.start();
        EventMgr.emit('scene_switched');
    };
    SceneMgr.prototype.onProgress = function () {
    };
    SceneMgr.prototype.update = function () {
        if (this._currentScene) {
            this._currentScene.update();
        }
    };
    SceneMgr._inst = null;
    return SceneMgr;
}());
//# sourceMappingURL=SceneMgr.js.map