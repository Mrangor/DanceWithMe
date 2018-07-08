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
var UI_DissolveNotice = /** @class */ (function (_super) {
    __extends(UI_DissolveNotice, _super);
    function UI_DissolveNotice() {
        var _this = _super.call(this, 'Basic', 'UI_DissolveNotice', UILayer.POPUP) || this;
        _this._endTime = -1;
        _this._info = null;
        _this.startUpdate(200);
        _this.keepCenter();
        return _this;
    }
    UI_DissolveNotice.prototype.onCreated = function () {
        this._info = this._view.getChild('info').asLabel;
        var data = RoomMgr.inst.dissoveData;
        if (!data) {
            return;
        }
        var btnList = ['btn_reject', 'btn_agree'];
        _super.prototype.listenButtons.call(this, btnList, this.onBtnClicked);
        var list = this._view.getChild('list').asList;
        for (var i = 0; i < list.numChildren; ++i) {
            var item = list.getChildAt(i).asCom;
            item.getControllerAt(0).setSelectedIndex(1);
        }
        this._endTime = Date.now() / 1000 + data.time;
        var agrees = "";
        var disagrees = "";
        for (var i = 0; i < data.states.length; ++i) {
            var b = data.states[i];
            var seat = RoomMgr.inst.seats[i];
            if (!seat) {
                break;
            }
            if (seat.userId) {
                var item = list.getChildAt(i).asCom;
                item.getControllerAt(0).setSelectedIndex(0);
                item.getChild('info').text = seat.name + '  ID:' + seat.userId;
                item.getChild('confirm_flag').visible = b;
            }
        }
        this._info.text = this.getInfoStr();
        var hasAgree = data.states[RoomMgr.inst.seatIndex];
        if (hasAgree) {
            this._view.getControllerAt(0).setSelectedIndex(1);
        }
        else {
            this._view.getControllerAt(0).setSelectedIndex(0);
        }
    };
    UI_DissolveNotice.prototype.onBtnClicked = function (btnName) {
        if (btnName == 'btn_reject') {
            RoomMgr.inst.sendRoomDissolveReject();
        }
        else if (btnName == 'btn_agree') {
            RoomMgr.inst.sendRoomDissolveAgree();
        }
        this.hide();
    };
    UI_DissolveNotice.prototype.getInfoStr = function () {
        if (this._endTime > 0) {
            var lastTime = this._endTime - Date.now() / 1000;
            if (lastTime < 0) {
                lastTime = 0;
                this._endTime = -1;
            }
            var m = Math.floor(lastTime / 60);
            var s = Math.ceil(lastTime - m * 60);
            var str = "";
            if (m > 0) {
                str += m + "分";
            }
            return str + s + "秒后房间将自动解散";
        }
        return '';
    };
    UI_DissolveNotice.prototype.onUpdate = function () {
        this._info.text = this.getInfoStr();
        if (!RoomMgr.inst.dissoveData) {
            this.hide();
        }
    };
    return UI_DissolveNotice;
}(Widget));
//# sourceMappingURL=UI_DissolveNotice.js.map