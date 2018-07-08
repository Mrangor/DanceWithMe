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
var UI_ExitGame = /** @class */ (function (_super) {
    __extends(UI_ExitGame, _super);
    function UI_ExitGame() {
        return _super.call(this, 'Basic', 'UI_ExitGame', UILayer.GAME) || this;
    }
    UI_ExitGame.prototype.onCreated = function () {
        var btnList = ['btn_setting', 'btn_exit', 'btn_dispress'];
        for (var i = 0; i < btnList.length; ++i) {
            var btnName = btnList[i];
            this._view.getChild(btnName).asButton.onClick(this, this.onBtnClicked, [btnName]);
        }
    };
    UI_ExitGame.prototype.onBtnClicked = function (btnName) {
        if (btnName == 'btn_setting') {
        }
        else if (btnName == 'btn_exit') {
            RoomMgr.inst.wantQuitRoom();
        }
        else if (btnName == 'btn_dispress') {
            RoomMgr.inst.wantQuitRoom();
        }
    };
    return UI_ExitGame;
}(Page));
//# sourceMappingURL=UI_ExitGame.js.map