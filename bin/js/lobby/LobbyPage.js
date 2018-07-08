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
* 子游戏大厅页
*/
var LobbyPage = /** @class */ (function (_super) {
    __extends(LobbyPage, _super);
    function LobbyPage() {
        var _this = _super.call(this, "Lobby", "PageLobby", UILayer.GAME) || this;
        _this.cashRefresher = null;
        return _this;
    }
    LobbyPage.prototype.onCreated = function () {
        new LayoutHallTitle(this._view.getChild('layout_hall_title').asCom);
        new LayoutBtns(this._view.getChild('layout_btns').asCom);
        var gameList = this._view.getChild('sub_game_list').asCom;
        for (var i = 0; i < gameList.numChildren; ++i) {
            var child = gameList.getChildAt(i);
            var btn = child.asButton;
            if (btn != null) {
                btn.onClick(this, this.onBtnClicked, [btn]);
            }
        }
        //加载真正的背景
        var url = './res/bg/lobby_platform_bg.jpg';
        Laya.loader.load(url, Handler.create(this, function (tex) {
            this._view.getChild('bg').asLoader.onExternalLoadSuccess(tex);
        }));
    };
    LobbyPage.prototype.onBtnClicked = function (sender) {
        if (sender.name == 'btn_enter_room') {
            UIMgr.inst.popup(UI_JoinGame);
        }
        else if (sender.name == 'btn_0010001') {
            MasterMgr.inst.switch('0010001');
        }
        else if (sender.name == 'btn_0030001') {
            MasterMgr.inst.switch('0030001');
        }
    };
    LobbyPage.prototype.refreshCashes = function () {
        UserMgr.inst.refreshCashes(function () {
            this.txtGems.text = UserMgr.inst._info.gems.toString();
        }.bind(this));
    };
    LobbyPage.prototype.onDispose = function () {
    };
    return LobbyPage;
}(Page));
//# sourceMappingURL=LobbyPage.js.map