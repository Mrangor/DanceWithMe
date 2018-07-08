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
var LoginScene = /** @class */ (function (_super) {
    __extends(LoginScene, _super);
    function LoginScene() {
        return _super.call(this, 1280, 720) || this;
    }
    LoginScene.prototype.getRes = function () {
        return [
            { url: "res/ui/Login.fui", type: Loader.BUFFER },
            { url: "res/ui/Login@atlas0.png", type: Loader.IMAGE },
            { url: "res/ui/Login@atlas_osvme.jpg", type: Loader.IMAGE },
        ];
    };
    LoginScene.prototype.start = function () {
        fairygui.UIPackage.addPackage('res/ui/Login');
        UIMgr.inst.add(LoginPage);
    };
    LoginScene.prototype.update = function () {
    };
    LoginScene.prototype.end = function () {
        _super.prototype.end.call(this);
    };
    return LoginScene;
}(Scene));
//# sourceMappingURL=LoginScene.js.map