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
var Handler = laya.utils.Handler;
var Loader = laya.net.Loader;
var MyAppSettings = /** @class */ (function (_super) {
    __extends(MyAppSettings, _super);
    function MyAppSettings() {
        var _this = _super.call(this) || this;
        var settings = _this;
        settings.designWidth = 1280; //640;
        settings.designHeight = 720;
        settings.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
        settings.screenMode = Laya.Stage.SCREEN_VERTICAL;
        settings.showStats = true;
        settings.statsX = 0;
        settings.statsY = 500;
        settings.frameRate = Laya.Stage.FRAME_SLOW;
        settings.maxUILayer = UILayer.MAX_NUM;
        settings.alertWidget = GameAlert;
        settings.wcWidget = GameWC;
        return _this;
    }
    return MyAppSettings;
}(AppSettings));
// app entry.
var app = /** @class */ (function () {
    function app() {
        var url = 'http://s1.babykylin.com';
        var url = 'http://localhost';
        // var url = 'http://118.178.178.152'
        //modules init
        HttpMgr.inst.configure(url, 9000);
        //initialize
        var settings = new MyAppSettings();
        bk.configure(settings);
        bk.start('preloading');
    }
    return app;
}());
new app();
//# sourceMappingURL=App.js.map