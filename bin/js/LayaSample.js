var WebGL = Laya.WebGL;
var Loader = laya.net.Loader;
var Handler = laya.utils.Handler;
var listPageUI = ui.modules.ListPageUI;
var list = /** @class */ (function () {
    function list() {
        //初始化舞台宽高
        Laya.init(640, 1136, WebGL);
        Laya.stage.bgColor = "#ffffff";
        //预加载资源文件后执行回调
        Laya.loader.load(["./res/atlas/textures.atlas", "res/atlas/template/ButtonTab.atlas"], Handler.create(this, this.onLoaded));
    }
    list.prototype.onLoaded = function () {
        //实例UI界面
        this.listP = new listPageUI();
        //添加UI界面到舞台
        Laya.stage.addChild(this.listP);
    };
    return list;
}());
new list();
//# sourceMappingURL=LayaSample.js.map