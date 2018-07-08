/**Created by the LayaAirIDE*/
module view.modules {
	import WebGL = Laya.WebGL;
	import Loader = laya.net.Loader;
	import Handler = laya.utils.Handler;

	export class ListPage extends ui.modules.ListPageUI {
		constructor() {
			super();

			//预加载资源文件后执行回调
			Laya.loader.load(["./res/atlas/textures.atlas", "res/atlas/template/ButtonTab.atlas"], Handler.create(this, this.onLoaded));
		}
	}
}