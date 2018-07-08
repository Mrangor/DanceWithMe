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
* 大厅场景类：
*/
var LobbyScene = /** @class */ (function (_super) {
    __extends(LobbyScene, _super);
    function LobbyScene() {
        return _super.call(this, 1280, 720) || this;
    }
    LobbyScene.prototype.getRes = function () {
        return [
            { url: "res/ui/Lobby.fui", type: Loader.BUFFER },
            { url: "res/ui/Lobby@atlas0.png", type: Loader.IMAGE },
        ];
    };
    LobbyScene.prototype.start = function () {
        fairygui.UIPackage.addPackage('res/ui/Lobby');
        UIMgr.inst.add(LobbyPage);
    };
    LobbyScene.prototype.update = function () {
    };
    LobbyScene.prototype.end = function () {
        _super.prototype.end.call(this);
    };
    return LobbyScene;
}(Scene));
//# sourceMappingURL=LobbyScene.js.map