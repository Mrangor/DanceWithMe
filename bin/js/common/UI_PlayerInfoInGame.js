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
var UI_PlayerInfoInGame = /** @class */ (function (_super) {
    __extends(UI_PlayerInfoInGame, _super);
    function UI_PlayerInfoInGame() {
        var _this = _super.call(this, 'Basic', 'UI_PlayerInfoInGame', UILayer.POPUP) || this;
        _this._userId = -1;
        _this.isTenTimes = true; //道具10连发
        _this.seatObj = null;
        _this.keepCenter();
        _this.initEventHandler();
        return _this;
    }
    UI_PlayerInfoInGame.prototype.onCreated = function () {
        var _this = this;
        var btnClose = this._view.getChild('btn_mask').asButton;
        btnClose.onClick(this, function () {
            _this.hide();
            _this.clear();
        });
        this.initDaoJu();
    };
    UI_PlayerInfoInGame.prototype.initEventHandler = function () {
        bk.on('init_user_info', this, this.initPlayerInfo);
    };
    UI_PlayerInfoInGame.prototype.clear = function () {
        bk.off('init_user_info', this, this.initPlayerInfo);
        this._userId = null;
        this.seatObj = null;
        this.isTenTimes = null;
    };
    UI_PlayerInfoInGame.prototype.initPlayerInfo = function (data) {
        console.log('用户Id:', data);
        var userId = data.userId;
        if (!userId) {
            console.error('userId is null');
            return;
        }
        this._userId = userId;
        this.isTenTimes = data.isTenTimes;
        this.seatObj = data.seatObj;
        var seatIndex = RoomMgr.inst.getSeatIndexByID(userId);
        var seat = RoomMgr.inst.getSeatByIdx(seatIndex);
        this._view.getChild('userId').asLabel.text = '用户ID：' + userId.toString();
        this._view.getChild('name').asLabel.text = '用户昵称：' + seat.name;
        this._view.getChild('level').asLabel.text = '等级：贫农2(Lv.2)';
        this._view.getChild('level2').asLabel.text = '贫农2';
        var total_score = "\u6218\u7EE9\uFF1A8\u80DC/16\u8D1F 33%";
        this._view.getChild('total_score').asLabel.text = total_score;
        var url = UserMgr.inst._info.imgUrl;
        url = HttpMgr.inst.url + '/image?url=' + encodeURIComponent(url) + '.jpg';
        this._view.getChild('icon').asLoader.url = url;
        this._view.getChild('daoju').visible = UserMgr.inst.userId != userId;
        this._view.getChild('n1').visible = false;
    };
    /**
     * 初始化道具
     */
    UI_PlayerInfoInGame.prototype.initDaoJu = function () {
        var daojuRoot = this._view.getChild('daoju').asCom;
        for (var index = 1; index < daojuRoot._children.length; index++) {
            var element = daojuRoot.getChild('n' + index);
            if (element) {
                element.asButton.onClick(this, this.onDaoJuItemClicked, ['n' + index]);
            }
        }
    };
    UI_PlayerInfoInGame.prototype.onDaoJuItemClicked = function (data) {
        console.log('道具发送目标用户：' + data, this._userId);
        var content = {
            target: this._userId,
            sender: UserMgr.inst.userId,
            daoju: data,
            isTenTimes: this.isTenTimes
        };
        bk.net.send('daoju', content);
        this.hide();
    };
    return UI_PlayerInfoInGame;
}(Widget));
//# sourceMappingURL=UI_PlayerInfoInGame.js.map