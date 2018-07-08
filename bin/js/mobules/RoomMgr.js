var RoomMgr = /** @class */ (function () {
    function RoomMgr() {
        this.roomId = null;
        this.maxNumOfGames = 0;
        this.numOfGames = 0;
        this.seatIndex = -1;
        this.seats = null;
        this.testSeat = null;
        this.isOver = false;
        this.conf = null;
        this.dissoveData = null;
        this.costConfs = null;
        this.gameMode = null;
        this.gameType = null;
        this.localIndexList = [];
        this.unlimitedMaxChair = null;
        this.init();
    }
    Object.defineProperty(RoomMgr, "inst", {
        get: function () {
            if (RoomMgr._inst == null) {
                RoomMgr._inst = new RoomMgr();
            }
            return RoomMgr._inst;
        },
        enumerable: true,
        configurable: true
    });
    RoomMgr.prototype.init = function () {
        this.reset();
        var agent = new NetAgent('roommgr', true);
        bk.net.addAgent(agent);
        agent.addTarget(this);
        EventMgr.on("scene_switched", this, function () {
            bk.on("room_dissolve_notice", this, this.showDissolveNotice);
            bk.on('disconnect', this, function () {
                RoomMgr.inst.dissoveData = null;
            });
            if (RoomMgr.inst.dissoveData) {
                this.showDissolveNotice();
            }
        });
    };
    RoomMgr.prototype.reset = function () {
        this.roomId = null;
        this.maxNumOfGames = 0;
        this.numOfGames = 0;
        this.seatIndex = -1;
        this.seats = null;
        this.testSeat = null;
        this.isOver = false;
        this.conf = null;
        this.dissoveData = null;
    };
    /**
     * 根据游戏类型 获取花费
     * @param  {Number} maxChair    最大人数
     * @param  {Number} turns       最大局数
     * @param  {Number} isAA        是否AA制
     * @param  {Number} gameType    游戏类型 （游戏编号）
     * @param  {Number} gameMode    游戏模式 （金币、钻石等）
     * @return {Number}             具体花费
     */
    RoomMgr.prototype.calcCost = function (maxChair, turns, isAA, gameType, gameMode) {
        var config = this.costConfs;
        if (!config || config == undefined) {
            return 0;
        }
        for (var i = 0; i < config.length; i++) {
            var tConfig = config[i];
            if (!tConfig) {
                continue;
            }
            if ((tConfig.game_mode === gameMode) && (tConfig.game_type === gameType)) {
                config = tConfig.cost_conf;
                break;
            }
        }
        if (!config) {
            return 0;
        }
        var t = config[maxChair];
        if (!t) {
            return 0;
        }
        var total = t[turns];
        if (total > 0) {
            if (isAA) {
                return total / maxChair;
            }
            return total;
        }
        return 0;
    };
    // 设定每个座位的信息
    RoomMgr.prototype.setSeatInfo = function (seatIdx, data) {
        var seat = {
            userId: data.userid,
            ip: data.ip,
            score: data.score,
            name: data.name,
            online: data.online,
            ready: data.ready,
            seatIndex: data.seatindex
        };
        this.getSeats()[seatIdx] = seat;
        return seat;
    };
    RoomMgr.prototype.getSeats = function () {
        return this.seats;
    };
    RoomMgr.prototype.showDissolveNotice = function () {
        if (!SceneMgr.inst.currentScene.isGameScene) {
            return;
        }
        UIMgr.inst.popup(UI_DissolveNotice);
    };
    RoomMgr.prototype.onLogin = function (data) {
        this.roomId = data.roomid;
        this.gameType = data.gametype;
        this.gameMode = data.gamemode;
        console.log("roomid and game type mode", data);
        this.conf = data.conf;
        this.maxNumOfGames = data.conf.numOfGames;
        this.numOfGames = data.numofgames;
        this.seats = [];
        for (var i = 0; i < data.seats.length; ++i) {
            this.setSeatInfo(i, data.seats[i]);
            if (UserMgr.inst.userId == data.seats[i].userid) {
                this.seatIndex = i;
            }
        }
        this.isOver = false;
    };
    //自己是否为房主
    RoomMgr.prototype.isOwner = function () {
        this.getSeats();
        return UserMgr.inst.userId == this.conf.creator;
    };
    //通过角色ID获取房间座位号码
    RoomMgr.prototype.getSeatIndexByID = function (userId) {
        for (var i = 0; i < this.getSeats().length; ++i) {
            var s = this.getSeats()[i];
            if (s.userId == userId) {
                return i;
            }
        }
        return -1;
    };
    //通过角色ID获取座位信息
    RoomMgr.prototype.getSeatByID = function (userId) {
        var tIdx = this.getSeatIndexByID(userId);
        var seat = this.getSeats()[tIdx];
        return seat;
    };
    // 通过服务器座位号索引获取seatInfo
    RoomMgr.prototype.getSeatByIdx = function (idx) {
        return this.getSeats()[idx];
    };
    //通过服务器座位号索引获取本地座位号索引
    RoomMgr.prototype.getLocalIndex = function (index) {
        this.getSeats();
        var tMaxChair = this.getMaxPlayerNum();
        var tLocalIndexList = this.getLocalIndexList();
        if (!tLocalIndexList) {
            var ret = (index - this.seatIndex + tMaxChair) % tMaxChair;
            return ret;
        }
        else {
            var tSelfIdx = -1;
            var tTargetIdx = -1;
            for (var i = 0; i < tLocalIndexList.length; i++) {
                if (tLocalIndexList[i] === this.seatIndex) {
                    tSelfIdx = i;
                }
                if (tLocalIndexList[i] === index) {
                    tTargetIdx = i;
                }
            }
            if (tSelfIdx === -1 || tTargetIdx === -1) {
                return -1;
            }
            else {
                return (tSelfIdx > tTargetIdx) ? (tMaxChair - (tSelfIdx - tTargetIdx)) : (tTargetIdx - tSelfIdx);
            }
        }
    };
    // 通过本地座位号索引获取seatInfo
    RoomMgr.prototype.getSeatInfoByLocalIndex = function (localIdx) {
        var tMaxChair = this.getMaxPlayerNum();
        var tIdx = (localIdx + this.seatIndex) % tMaxChair;
        var tLocalIndexList = this.getLocalIndexList();
        var tSeatList;
        if (!tLocalIndexList) {
            tSeatList = this.getSeats();
            return tSeatList[tIdx];
        }
        else {
            for (var i = 0; i < tLocalIndexList.length; i++) {
                if (tIdx === tLocalIndexList[i]) {
                    break;
                }
            }
            if (i === tLocalIndexList.length) {
                return null;
            }
            else {
                tSeatList = this.getSeats();
                return tSeatList[tLocalIndexList[i]];
            }
        }
    };
    /** 是否人数不限 */
    RoomMgr.prototype.setIsUnlimitedMaxChair = function (isUnlimited) {
        //this.unlimitedMaxChair = isUnlimited;
    };
    /** 一圈座位的转法 [0,5,4,1,3,2] */
    RoomMgr.prototype.setLocalIndexList = function (list) {
        this.localIndexList = list;
    };
    /** 一圈座位的转法 */
    RoomMgr.prototype.getLocalIndexList = function () {
        return this.localIndexList;
    };
    // 获取最大玩家数量
    RoomMgr.prototype.getMaxPlayerNum = function () {
        if (this.conf.type == "niuniu_1") {
            return 8;
        }
        if (this.unlimitedMaxChair) {
            var tMaxChair = this.getSeats().length;
            for (tMaxChair; tMaxChair > 0; tMaxChair--) {
                if (this.getSeats()[tMaxChair - 1].userId) {
                    break;
                }
            }
            return tMaxChair;
        }
        if ("numPeople" in this.conf) {
            return this.conf.numPeople;
        }
        return this.conf.maxChair;
    };
    //获取自己的座位信息
    RoomMgr.prototype.getSelfData = function () {
        return this.getSeats()[this.seatIndex];
    };
    //通过房间座位号码获取玩家名字
    RoomMgr.prototype.getName = function (index) {
        return this.getSeats()[index].name;
    };
    //通过userID获取玩家名字
    RoomMgr.prototype.getNameByUserID = function (userID) {
        var tRoomMgr = this;
        var tSeatInfo = tRoomMgr.getSeatByID(userID);
        return tSeatInfo.name;
    };
    //通过userID获取玩家IP
    RoomMgr.prototype.getIPByUserID = function (userID) {
        var ip;
        var tSeatInfo;
        var tRoomMgr = this;
        if (userID === UserMgr.inst.userId) {
            ip = UserMgr.inst.ip;
        }
        else if (tSeatInfo = tRoomMgr.getSeatByID(userID)) {
            ip = tSeatInfo.ip;
        }
        if (!ip) {
            return "掉线";
        }
        if (ip.indexOf("::ffff:") != -1) {
            ip = ip.substr(7);
        }
        return ip;
    };
    RoomMgr.prototype.clearReady = function () {
        for (var i = 0; i < this.getSeats().length; ++i) {
            this.getSeats()[i].ready = false;
        }
    };
    //准备
    RoomMgr.prototype.ownReady = function () {
        if (bk.online) {
            bk.net.send('ready');
        }
        else { //非联网状态直接设定所有人为准备状态
            var tSeats = this.getSeats();
            for (var i = 0; i < tSeats.length; i++) {
                tSeats[i].ready = true;
            }
            bk.emit("room_user_state_changed");
        }
    };
    RoomMgr.prototype.sendRoomDispress = function () {
        if (bk.online) {
            bk.net.send("dispress");
        }
    };
    RoomMgr.prototype.sendRoomExit = function () {
        if (bk.online) {
            bk.net.send("exit");
        }
    };
    RoomMgr.prototype.sendRoomDissolveRequest = function () {
        if (bk.online) {
            bk.net.send("dissolve_request");
        }
    };
    RoomMgr.prototype.wantQuitRoom = function () {
        var tRoomMgr = this;
        if (!bk.online) {
            tRoomMgr.reset();
            bk.emit("back_sub_halls");
            return;
        }
        if (tRoomMgr.numOfGames != 0) {
            Alert.show('是否要发起协商解散请求？', true).onYes(function () {
                tRoomMgr.sendRoomDissolveRequest();
            });
            return;
        }
        var isCreator = tRoomMgr.isOwner();
        if (isCreator) {
            Alert.show('解散未开始的房间不扣房卡，是否要解散？', true).onYes(function () {
                tRoomMgr.sendRoomDispress();
            });
        }
        else {
            Alert.show('确定要退出吗？', true).onYes(function () {
                tRoomMgr.sendRoomExit();
            });
        }
    };
    //同意解散房间
    RoomMgr.prototype.sendRoomDissolveAgree = function () {
        if (!bk.online) {
            bk.emit("back_sub_halls");
        }
        else {
            bk.net.send("dissolve_agree");
        }
    };
    // 拒绝解散房间
    RoomMgr.prototype.sendRoomDissolveReject = function () {
        if (!bk.online) {
        }
        else {
            bk.net.send("dissolve_reject");
        }
    };
    //===========网络消息相关处理函数================
    RoomMgr.prototype.onnet_dissolve_notice_push = function (data) {
        this.dissoveData = data;
        bk.emit("room_dissolve_notice", data);
    };
    RoomMgr.prototype.onnet_dissolve_cancel_push = function (data) {
        this.dissoveData = null;
        bk.emit("room_dissolve_cancel", data);
    };
    RoomMgr.prototype.onnet_exit_result = function (data) {
        this.isOver = true;
        this.reset();
        var entry = MasterMgr.current.setting.entry_scene;
        if (entry) {
            SceneMgr.inst.replace(entry);
        }
        else {
            MasterMgr.inst.switch('lobby');
        }
    };
    RoomMgr.prototype.onnet_dispress_push = function (data) {
        this.reset();
        this.isOver = true;
        var entry = MasterMgr.current.setting.entry_scene;
        if (entry) {
            SceneMgr.inst.replace(entry);
        }
        else {
            MasterMgr.inst.switch('lobby');
        }
    };
    RoomMgr.prototype.onnet_exit_notify_push = function (data) {
        var userId = data;
        var s = this.getSeatByID(userId);
        if (s != null) {
            s.userId = 0;
            s.name = "";
            bk.emit("room_user_state_changed", s);
        }
    };
    RoomMgr.prototype.onnet_new_user_comes_push = function (data) {
        //GameLogic.updateData("new_user_comes_push", data);
        // console.log(data);
        var seatIndex = data.seatindex;
        var curSeat = this.getSeats()[seatIndex];
        if (curSeat.userId > 0) {
            curSeat.online = true;
        }
        else {
            data.online = true;
            curSeat = this.setSeatInfo(seatIndex, data);
        }
        console.log(curSeat.ip);
        bk.emit('room_new_user', curSeat);
    };
    //Gps获取位置事件监听 
    RoomMgr.prototype.onnet_location_push = function (data) {
        if (data) {
            bk.emit("check_location", data);
        }
    };
    RoomMgr.prototype.onnet_user_state_push = function (data) {
        //console.log(data);
        var userId = data.userid;
        var seat = this.getSeatByID(userId);
        seat.online = data.online;
        bk.emit('room_user_state_changed', seat);
    };
    RoomMgr.prototype.onnet_room_user_ready_push = function (data) {
        //console.log(data);
        var userId = data.userid;
        var seat = this.getSeatByID(userId);
        seat.ready = data.ready;
        bk.emit('room_user_ready', seat);
        bk.emit("room_user_state_changed", seat);
    };
    RoomMgr.prototype.onnet_game_num_push = function (data) {
        this.numOfGames = data;
        bk.emit('room_game_num', data);
    };
    RoomMgr.prototype.onnet_room_close_push = function (data) {
        this.isOver = true;
        this.dissoveData = data;
        bk.emit('room_close', data);
    };
    RoomMgr.prototype.onnet_room_seats_changed_push = function (data) {
        var seats = this.getSeats();
        this.seats = [];
        for (var i = 0; i < data.length; ++i) {
            var userId = data[i];
            for (var k in seats) {
                var s = seats[k];
                if (s.userId == userId) {
                    this.seats[i] = s;
                    s.seatIndex = i;
                    break;
                }
            }
            if (userId == UserMgr.inst.userId) {
                this.seatIndex = i;
            }
        }
        bk.emit('room_user_state_changed', null);
    };
    RoomMgr._inst = null;
    return RoomMgr;
}());
//# sourceMappingURL=RoomMgr.js.map