/*
* name;
*/
var User = /** @class */ (function () {
    function User() {
        this.gender = null;
        this.userId = null;
        this.name = null;
        this.age = null;
        this.imgUrl = 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er2Nx1hgJhpzpStfZ60SLia5sf1riaz5C6eibHBhH0Tl6XicMlxiculiaib4jMjaS0LPU8moE1D4UYMX1gKA/132';
    }
    return User;
}());
var UserMgr = /** @class */ (function () {
    function UserMgr() {
        this._account = null;
        this._sign = null;
        this._token = null;
        this._info = new User();
        this.oldGameMode = null;
        this.oldGameType = null;
    }
    Object.defineProperty(UserMgr, "inst", {
        get: function () {
            if (UserMgr._inst == null) {
                UserMgr._inst = new UserMgr();
            }
            return UserMgr._inst;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserMgr.prototype, "userId", {
        get: function () {
            return this._info.userId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserMgr.prototype, "name", {
        get: function () {
            return this._info.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserMgr.prototype, "gems", {
        get: function () {
            return this._info.gems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserMgr.prototype, "coins", {
        get: function () {
            return this._info.coins;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserMgr.prototype, "ip", {
        get: function () {
            return this._info.ip;
        },
        enumerable: true,
        configurable: true
    });
    UserMgr.prototype.doLoginAsGuest = function () {
        var onAuth = function (data) {
            if (data.errcode == -10) {
            }
            else {
                HttpMgr.inst.getSource().token = data.token;
                HttpMgr.inst.getSource().mid = data.mid;
                this.login(data.account, data.sign);
            }
        }.bind(this);
        var account = bk.args['account'];
        if (account == null || account == '') {
            account = Laya.LocalStorage.getItem('account');
            if (account == null || account == '') {
                account = Date.now();
                Laya.LocalStorage.setItem('account', account);
            }
        }
        console.log('当前登录账号：', account);
        // account = this.getTestUserAccount()
        HttpMgr.inst.guest(account, onAuth);
        WC.show('正在登陆中...');
    };
    UserMgr.prototype.onLogin = function (ret) {
        if (ret.errcode !== 0) {
            Alert.show('登录失败-错误码:' + ret.errcode + ',重新登录!');
        }
        else {
            if (!ret.userid) {
                if (this._account && this._account.indexOf('wx_') == 0) {
                    WC.hide();
                    Laya.LocalStorage.removeItem("wx_account");
                    Laya.LocalStorage.removeItem("wx_sign");
                    return;
                }
                //jump to register user info.
                //bk.utils.loadScene("createrole");
                HttpMgr.inst.createRole(this._account, this._sign, 'guest_' + Date.now() % 10000, function () {
                    this.login(this._account, this._sign);
                }.bind(this));
            }
            else {
                console.log(ret);
                this._account = ret.account;
                this._token = ret.token;
                this._info.userId = ret.userid;
                this._info.name = ret.name;
                this._info.lv = ret.lv;
                this._info.exp = ret.exp;
                this._info.coins = ret.coins;
                this._info.gems = ret.gems;
                this._info.roomData = ret.roomid;
                this._info.gender = ret.sex;
                this._info.ip = ret.ip;
                if (ret.roomid) {
                    this.enterRoom(ret.roomid, ret.gametype, ret.gamemode, function (ret) {
                        if (ret.errcode != 0) {
                            MasterMgr.inst.switch('lobby');
                        }
                    });
                }
                else {
                    MasterMgr.inst.switch('lobby');
                }
            }
        }
    };
    UserMgr.prototype.login = function (account, sign) {
        this._account = account;
        this._sign = sign;
        HttpMgr.inst.login(account, sign, this.onLogin.bind(this));
    };
    UserMgr.prototype.refreshCashes = function (cb) {
        HttpMgr.inst.getUserCash(this._account, this._token, function (data) {
            this._info.gems = data.gems;
            this._info.coins = data.coins;
            if (cb) {
                cb();
            }
        }.bind(this));
    };
    UserMgr.prototype.createRoom = function (conf, gameType, gameMode, forOthers, callback) {
        conf.for_others = forOthers;
        var data = {
            account: UserMgr.inst._account,
            token: UserMgr.inst._token,
            conf: JSON.stringify(conf),
            for_others: forOthers,
            gametype: gameType,
            gamemode: gameMode
        };
        HttpMgr.inst.createPrivateRoom(data, callback);
    };
    UserMgr.prototype.enterRoom = function (roomId, gameType, gameMode, callback) {
        var onEnter = function (ret) {
            self = this;
            //self.lastRoomId = roomId;
            if (ret.errcode !== 0) {
                WC.hide();
                switch (ret.errcode) {
                    case 4002:
                        Alert.show("加入游戏失败，服务器无法响应");
                        break;
                    case 6:
                        /*
                            if (!bk.anysdk.isHasPermission(bk.enum.E_PERMISSION.GPS)) {
                                Alert.show("该房间需要gps定位信息\n当前没有开启gps定位功能\n禁止进入房间！", function () {
                                    bk.anysdk.showPermissionSetting(bk.enum.E_PERMISSION.GPS);
                                });
                            }
                            else {
                                Alert.show("进入房间[" + roomId + "]失败！\nGPS数据错误.");
                            }
                        */
                        break;
                    case 7:
                        Alert.show("进入房间[" + roomId + "]失败！\n因为GPS限制.");
                        break;
                }
                if (callback != null) {
                    callback(ret);
                }
            }
            else {
                if (callback != null) {
                    callback(ret);
                }
                console.log('连接服务器', ret.roomid);
                MasterMgr.inst.switch(ret.game_type, true);
                GameNetMgr.inst.connectGameServer(ret);
            }
        };
        var data = {
            roomid: roomId,
            gametype: gameType,
            gamemode: gameMode,
            token: UserMgr.inst._token,
        };
        HttpMgr.inst.enterRoom(data, onEnter);
    };
    UserMgr._inst = null;
    return UserMgr;
}());
//# sourceMappingURL=UserMgr.js.map