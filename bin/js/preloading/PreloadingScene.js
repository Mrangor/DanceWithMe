var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var PreloadingScene = /** @class */ (function (_super) {
    __extends(PreloadingScene, _super);
    function PreloadingScene() {
        var _this = _super.call(this, 1280, 720) || this;
        _this.pageRoot = null;
        _this.loadingBar = null;
        return _this;
    }
    PreloadingScene.prototype.start = function () {
        //预加载队列
        Laya.loader.load([
            { url: "res/ui/Preloading.fui", type: Loader.BUFFER }
        ], Handler.create(this, this.onPreloadingUILoaded));
    };
    PreloadingScene.prototype.update = function () {
    };
    PreloadingScene.prototype.end = function () {
        _super.prototype.end.call(this);
    };
    PreloadingScene.prototype.onPreloadingUILoaded = function () {
        fairygui.UIPackage.addPackage('res/ui/Preloading');
        this.pageRoot = UIMgr.inst.add(PreloadingPage);
        this.pageRoot.setProgress(0);
        this.startPreloadingQueue();
    };
    PreloadingScene.prototype.startPreloadingQueue = function () {
        //预加载队列
        Laya.loader.load([
            { url: "res/ui/Basic.fui", type: Loader.BUFFER },
            { url: "res/ui/Basic@atlas0.png", type: Loader.IMAGE },
        ], Handler.create(this, this.onLoaded), Handler.create(this, this.onProgress, null, false));
        //播放背景音乐
        Laya.SoundManager.playMusic('./music/bg.mp3');
    };
    PreloadingScene.prototype.onProgress = function (pro) {
        this.pageRoot.setProgress(pro);
    };
    PreloadingScene.prototype.onLoaded = function () {
        fairygui.UIPackage.addPackage('res/ui/Basic');
        setTimeout(function () {
            MasterMgr.inst.switch('login');
        }.bind(this), 200);
    };
    return PreloadingScene;
}(Scene));
//# sourceMappingURL=PreloadingScene.js.map