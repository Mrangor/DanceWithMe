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
var LoginPage = /** @class */ (function (_super) {
    __extends(LoginPage, _super);
    //   private scene:LoginScene;
    function LoginPage() {
        return _super.call(this, 'Login', 'PageLogin', UILayer.GAME) || this;
        //        this.scene = bk.sceneMgr.currentScene as LoginScene;
    }
    LoginPage.prototype.onCreated = function () {
        this._view.getChild('btn_guest').asButton.onClick(this, function () {
            UserMgr.inst.doLoginAsGuest();
        });
    };
    return LoginPage;
}(Page));
//# sourceMappingURL=LoginPage.js.map