module Modules {
    import WebGL = Laya.WebGL;
    import Loader = laya.net.Loader;
    import Handler = laya.utils.Handler;

    import listPageUI = ui.modules.ListPageUI;
    export class list {
        private listP: listPageUI;
        constructor() {
            //初始化舞台宽高
            Laya.init(640, 1136, WebGL);
            Laya.stage.bgColor = "#ffffff";
            //预加载资源文件后执行回调
            Laya.loader.load(["./res/atlas/textures.atlas", "res/atlas/template/ButtonTab.atlas"], Handler.create(this, this.onLoaded));
        }
        private onLoaded(): void {
            //实例UI界面
            this.listP = new listPageUI();
            //添加UI界面到舞台
            Laya.stage.addChild(this.listP);
        }
    }
}
new Modules.list();