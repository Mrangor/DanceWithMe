var Modules;
(function (Modules) {
    var WebGL = Laya.WebGL;
    var Handler = laya.utils.Handler;
    var listPageUI = ui.modules.ListPageUI;
    var list222 = /** @class */ (function () {
        function list222() {
            //初始化舞台宽高
            Laya.init(640, 1136, WebGL);
            Laya.stage.bgColor = "#ffffff";
            //预加载资源文件后执行回调
            Laya.loader.load(["./res/atlas/textures.atlas", "res/atlas/template/ButtonTab.atlas"], Handler.create(this, this.onLoaded));
        }
        list222.prototype.onLoaded = function () {
            //实例UI界面
            this.listP = new listPageUI();
            //添加UI界面到舞台
            Laya.stage.addChild(this.listP);
        };
        return list222;
    }());
    Modules.list222 = list222;
})(Modules || (Modules = {}));
new Modules.list222();
//# sourceMappingURL=Modules.js.map