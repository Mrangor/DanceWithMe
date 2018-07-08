/*
* httpMgr：统一管理HTTP请求
*/
var HttpMgr = /** @class */ (function () {
    function HttpMgr() {
        this.addr = null;
        this.port = null;
        this.http = null;
    }
    Object.defineProperty(HttpMgr, "inst", {
        get: function () {
            if (HttpMgr._inst == null) {
                HttpMgr._inst = new HttpMgr();
            }
            return HttpMgr._inst;
        },
        enumerable: true,
        configurable: true
    });
    HttpMgr.prototype.configure = function (addr, port) {
        this.addr = addr;
        this.port = port;
        this.http = new HTTP(addr + ':' + port);
        console.log('服务器地址：', this.http);
    };
    Object.defineProperty(HttpMgr.prototype, "url", {
        get: function () {
            return this.addr + ':' + this.port;
        },
        enumerable: true,
        configurable: true
    });
    HttpMgr.prototype.getSource = function () {
        return this.http;
    };
    HttpMgr.prototype.getServerInfo = function (cb) {
        this.http.send('/get_serverinfo', null, cb);
    };
    HttpMgr.prototype.guest = function (account, cb) {
        // this.http.send('/guest', { account: account, name: 'guest_' + (Date.now() % 10000) }, cb);
        this.http.send('/guest', { account: account, name: 'guest_' + account }, cb);
    };
    HttpMgr.prototype.createRole = function (account, sign, name, cb) {
        var data = {
            account: account,
            sign: sign,
            name: name
        };
        this.http.send("/create_user", data, cb);
    };
    HttpMgr.prototype.login = function (account, sign, cb) {
        this.http.send('/login', { account: account, sign: sign }, cb);
    };
    HttpMgr.prototype.getUserCash = function (account, token, cb) {
        this.http.send('/get_user_cash', { account: account, token: token }, cb);
    };
    HttpMgr.prototype.createPrivateRoom = function (data, cb) {
        this.http.send('/create_private_room', data, cb);
    };
    HttpMgr.prototype.enterRoom = function (data, cb) {
        this.http.send('/enter_private_room', data, cb);
    };
    HttpMgr.prototype.sendRequest = function (path, data, handler) {
        this.http.send(path, data, handler);
    };
    HttpMgr._inst = null;
    return HttpMgr;
}());
//# sourceMappingURL=HttpMgr.js.map