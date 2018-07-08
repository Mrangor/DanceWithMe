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
var UI_JoinGame = /** @class */ (function (_super) {
    __extends(UI_JoinGame, _super);
    function UI_JoinGame() {
        var _this = _super.call(this, 'Basic', 'UI_JoinGame', UILayer.POPUP) || this;
        _this.idArr = [];
        _this.inputPos = 0;
        _this.keepCenter();
        return _this;
    }
    UI_JoinGame.prototype.onCreated = function () {
        var _this = this;
        var btnClose = this._view.getChild('win_frame').asCom.getChild('btn_close').asButton;
        btnClose.onClick(this, function () {
            _this.hide();
        });
        for (var i = 0; i < 6; ++i) {
            this.idArr[i] = this._view.getChild('id' + i).asLabel;
            this.idArr[i].text = '';
        }
        for (var i = 0; i <= 9; ++i) {
            var btn_1 = this._view.getChild('input_' + i).asButton;
            btn_1.onClick(this, this.onKeybord, [i]);
        }
        var btn = this._view.getChild('input_cs').asButton;
        btn.onClick(this, this.onKeybord, ['cs']);
        btn = this._view.getChild('input_sc').asButton;
        btn.onClick(this, this.onKeybord, ['sc']);
    };
    UI_JoinGame.prototype.reset = function () {
        for (var i = 0; i < this.idArr.length; ++i) {
            this.idArr[i].text = '';
        }
        this.inputPos = 0;
    };
    UI_JoinGame.prototype.onKeybord = function (key) {
        if (key == 'cs') {
            this.reset();
        }
        else if (key == 'sc') {
            if (this.inputPos > 0) {
                this.inputPos--;
                this.idArr[this.inputPos].text = '';
            }
        }
        else {
            if (this.inputPos < this.idArr.length) {
                this.idArr[this.inputPos].text = key.toString();
                this.inputPos++;
                if (this.inputPos == this.idArr.length) {
                    this.enterRoom();
                }
            }
        }
    };
    UI_JoinGame.prototype.enterRoom = function () {
        var id = '';
        for (var i = 0; i < this.idArr.length; ++i) {
            id += this.idArr[i].text;
        }
        this.onInputFinished(id);
    };
    UI_JoinGame.prototype.onInputFinished = function (roomId) {
        var onEnterRoom = function (ret) {
            WC.hide();
            if (ret.errcode == 0) {
                this.hide();
            }
            else {
                var content = "";
                if (ret.errcode == 1) {
                    content = "参数错误!";
                }
                else if (ret.errcode == 2) {
                    content = "内部网络错误!";
                }
                else if (ret.errcode == 4000) {
                    content = "token超时";
                }
                else if (ret.errcode == 4001) {
                    content = "已经在房间中";
                }
                else if (ret.errcode == 4002) {
                    content = "分配游戏服务器失败";
                }
                else if (ret.errcode == 4003) {
                    content = "获取房卡信息失败";
                }
                else if (ret.errcode == 4004) {
                    content = "获取游戏服务器地址失败";
                }
                else if (ret.errcode == 4005) {
                    content = "取消消息失败";
                }
                else if (ret.errcode == 6000) {
                    content = "sign验证失败";
                }
                else if (ret.errcode == 6002) {
                    content = "不支持的游戏类型!";
                }
                else if (ret.errcode == 6003) {
                    content = "创建房间失败!";
                }
                else if (ret.errcode == 6004) {
                    content = "房卡不足，加入房间失败!";
                }
                else if (ret.errcode == 6005) {
                    content = "金币不足";
                }
                else if (ret.errcode == 6006) {
                    content = "房间[" + roomId + "]已满!";
                }
                else if (ret.errcode == 6007) {
                    content = '房间[' + roomId + ']不存在，\n请重新输入!';
                }
                else if (ret.errcode == 6008) {
                    content = '获取房间数据失败!';
                }
                else if (ret.errcode == 6009) {
                    content = '获取游戏配置文件失败!';
                }
                else if (ret.errcode == 6010) {
                    content = '游戏类型或者模式不匹配!';
                }
                else if (ret.errcode == 6011) {
                    content = "IP地址冲突\n加入房间失败!";
                }
                else if (ret.errcode == 6012) {
                    content = "因近距离GPS限制\n加入房间失败!";
                }
                else if (ret.errcode == 6013) {
                    // if (!bk.anysdk.isHasPermission(bk.enum.E_PERMISSION.GPS)) {
                    //     Alert.show("该房间需要gps定位信息\n当前没有开启gps定位功能\n禁止进入房间！", function () {
                    //         bk.anysdk.showPermissionSetting(bk.enum.E_PERMISSION.GPS);
                    //     });
                    //     return;
                    // }
                    // else {
                    content = "GPS数据错误\n加入房间失败!";
                    //}
                }
                else {
                    content = ret.errcode;
                }
                Alert.show(content);
                this.reset();
            }
        }.bind(this);
        var gameType = '*'; //UserMgr.inst.oldGameType;
        var gameMode = 'norm'; //UserMgr.inst.oldGameMode;
        WC.show('请求进入房间...');
        UserMgr.inst.enterRoom(roomId, gameType, gameMode, onEnterRoom);
        /*
        UserMgr.inst.queryRoomInfo(gameType, gameMode, roomId, function (ret) {
            if (ret.errcode !== 0) {
                if (ret.errcode == 6007) {
                    bk.uiMgr.hideWC();
                    bk.uiMgr.alert('房间' + roomId + '不存在');
                }
            } else {
                //判断是否AA，是则弹出提示，否则直接请求进入房间
                if (ret.aa === true) {
                    bk.uiMgr.alert('房间' + roomId + '是AA制房间\n进入将消耗' + ret.cost + '房卡\n是否确定进入?',true).onYes(function (isOK) {
                        UserMgr.inst.enterRoom(roomId, onEnterRoom, gameType, gameMode);
                    });
                } else {
                    UserMgr.inst.enterRoom(roomId, onEnterRoom, gameType, gameMode);
                }
            }
        });
        */
    };
    return UI_JoinGame;
}(Widget));
//# sourceMappingURL=UI_JoinGame.js.map