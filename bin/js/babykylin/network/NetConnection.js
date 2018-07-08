var NetConnection = /** @class */ (function () {
    function NetConnection(crypto) {
        if (crypto === void 0) { crypto = null; }
        this.ip = '';
        this.sio = null;
        this.lastRecieveTime = null;
        this.lastSendTime = null;
        this.delayMS = null;
        this.agents = [];
        this.timerPing = -1;
        this.timerTimeout = -1;
        this.crypto = null;
        this.onEventShowBind = null;
        this.http = null;
        if (!crypto) {
            crypto = new EmptyCrypto();
        }
        this.crypto = crypto;
        this.onEventShowBind = this.onEventShow.bind(this);
    }
    NetConnection.prototype.set = function (addr, port) {
        this.ip = addr + ':' + port;
        var httpheader = '';
        if (addr.indexOf(httpheader) == -1) {
            httpheader = 'http://';
        }
        this.http = new HTTP(httpheader + addr + ':' + port, 'text');
    };
    NetConnection.prototype.addAgent = function (agent) {
        var idx = this.agents.indexOf(agent);
        if (idx != -1) {
            return;
        }
        console.log('new agent', agent);
        this.agents.push(agent);
        console.log('this.agents', this.agents);
    };
    NetConnection.prototype.removeAgent = function (agent) {
        console.log('removeAgent', agent);
        var idx = this.agents.indexOf(agent);
        if (idx != -1) {
            this.agents.splice(idx, 1);
        }
    };
    NetConnection.prototype.clearAgent = function (agent) {
        var arr = [];
        for (var i = 0; i < this.agents.length; ++i) {
            var agent_1 = this.agents[i];
            if (agent_1.reserved) {
                arr.push(agent_1);
            }
        }
        this.agents = arr;
    };
    NetConnection.prototype.onEventShow = function () {
        this.ping();
    };
    NetConnection.prototype.init = function () {
        this.ip = '';
        this.sio = null;
    };
    NetConnection.prototype.dispatchEvent = function (type, data) {
        if (data === void 0) { data = null; }
        for (var k in this.agents) {
            var agent = this.agents[k];
            agent.onMessage(type, data);
        }
    };
    NetConnection.prototype.gamemsgHandler = function (param) {
        console.log('[Debug] - gamemsghandler called.');
        var isStr = (typeof param === 'string');
        if (isStr === true) {
            param = JSON.parse(param);
        }
        if (param == null || param.msg == null) {
            console.log('[Error] - param [' + param + '] or msg is null.');
            return;
        }
        var gamemsg = this.crypto.decode(param.msg);
        var msgobj = JSON.parse(gamemsg);
        if (msgobj != null) {
            var event = msgobj.event;
            var data = msgobj.data;
            if (event != "disconnect" && typeof (data) == "string") {
                data = JSON.parse(data);
            }
            console.log(("on net event : [" + event + "]   ["), data, "]");
            this.dispatchEvent(event, data);
        }
    };
    NetConnection.prototype.connect = function (fnConnect, fnError) {
        var timer = setTimeout(function () {
            console.log('connect timeout');
            close();
        }, 10000);
        this.connectInternal(function (data) {
            clearTimeout(timer);
            fnConnect(data);
        }, function (data) {
            clearTimeout(timer);
            fnError(data);
        });
    };
    NetConnection.prototype.connectInternal = function (fnConnect, fnError) {
        var opts = {
            'reconnection': false,
            'force new connection': true,
            'transports': ['websocket', 'polling']
        };
        var self = this;
        self.sio = Laya.Browser.window.io.connect(self.ip, opts);
        self.sio.on('connect', function (data) {
            if (self.sio) {
                self.sio.connected = true;
                fnConnect(data);
                self.startHearbeat();
            }
        });
        self.sio.on('disconnect', function (data) {
            console.log("disconnect");
            if (self.sio) {
                self.sio.connected = false;
                self.close();
            }
        });
        self.sio.on('connect_failed', function () {
            console.log('connect_failed');
        });
        //register game event
        self.sio.on('gamemsg', function (data) {
            self.gamemsgHandler(data);
        });
    };
    NetConnection.prototype.startHearbeat = function () {
        clearInterval(this.timerPing);
        clearInterval(this.timerTimeout);
        //cc.game.off(cc.game.EVENT_SHOW,this.onEventShowBind);
        var self = this;
        this.sio.on('game_pong', function () {
            // console.log('game_pong');
            self.lastRecieveTime = Date.now();
            self.delayMS = self.lastRecieveTime - self.lastSendTime;
            // console.log(self.delayMS);
        });
        this.lastRecieveTime = Date.now();
        //cc.game.on(cc.game.EVENT_SHOW,this.onEventShowBind);
        this.timerPing = setInterval(function () {
            self.ping();
        }, 5000);
        this.timerTimeout = setInterval(function () {
            if (Date.now() - self.lastRecieveTime > 10000) {
                self.close();
            }
        }, 500);
    };
    NetConnection.prototype.send = function (event, data) {
        if (data === void 0) { data = null; }
        if (!this.sio || !this.sio.connected) {
            return;
        }
        if (data !== null && (typeof (data) == "object")) {
            data = JSON.stringify(data);
            //console.log(data);              
        }
        console.log(("send net event : [" + event + "]   ["), data, "]");
        //加密
        var senddata = {
            event: event,
            data: data,
            mid: ++HttpMgr.inst.getSource().mid,
        };
        var sendstr = JSON.stringify(senddata);
        sendstr = this.crypto.encode(sendstr);
        this.sio.emit('gamemsg', { msg: sendstr });
    };
    NetConnection.prototype.ping = function () {
        if (this.sio) {
            this.lastSendTime = Date.now();
            this.sio.emit('game_ping');
        }
    };
    NetConnection.prototype.close = function () {
        if (!this.sio) {
            return;
        }
        console.log('close');
        if (this.sio.connected) {
            this.sio.connected = false;
            this.sio.disconnect();
        }
        this.dispatchEvent('disconnect');
        this.sio = null;
        this.delayMS = null;
        clearInterval(this.timerPing);
        clearInterval(this.timerTimeout);
        //cc.game.off(cc.game.EVENT_SHOW,this.onEventShowBind);
    };
    NetConnection.prototype.test = function (fnResult) {
        this.http.make('/hi', null, function (data) {
            var isOnline = !data || data.errcode == 0;
            fnResult(isOnline);
        }.bind(this)).send();
    };
    NetConnection.prototype.getSio = function () {
        return this.sio;
    };
    NetConnection.prototype.getDelayMS = function () {
        return this.delayMS;
    };
    NetConnection.prototype.getSignalStrength = function () {
        var delayMS = this.delayMS;
        if (!delayMS || delayMS >= 1000) {
            return 3;
        }
        else if (delayMS >= 500) {
            return 2;
        }
        else if (delayMS >= 200) {
            return 1;
        }
        else if (delayMS >= 0) {
            return 0;
        }
    };
    return NetConnection;
}());
//# sourceMappingURL=NetConnection.js.map