/*
* name;
*/
var HttpConn = /** @class */ (function () {
    function HttpConn(fn) {
        this.url = null;
        this.timeout = 0;
        this.responseType = null;
        this.complete = null;
        this.progress = null;
        this.error = null;
        this.complete = fn;
    }
    HttpConn.prototype.send = function () {
        var xhr = new Laya.HttpRequest();
        xhr.http.timeout = this.timeout;
        xhr.once(Laya.Event.COMPLETE, this, this.handleComplete);
        xhr.once(Laya.Event.ERROR, this, this.handleError);
        xhr.on(Laya.Event.PROGRESS, this, this.handleProcess);
        xhr.send(this.url, '', 'get', this.responseType);
    };
    HttpConn.prototype.onComplete = function (handler) {
        this.complete = handler;
        return this;
    };
    HttpConn.prototype.onError = function (handler) {
        this.error = handler;
        return this;
    };
    HttpConn.prototype.onProgress = function (handler) {
        this.progress = handler;
        return this;
    };
    HttpConn.prototype.handleComplete = function (data) {
        if (this.complete) {
            data = JSON.parse(data);
            this.complete(data);
        }
    };
    HttpConn.prototype.handleError = function (data) {
        console.log(data);
        if (this.error) {
            this.error(data);
        }
        else {
            setTimeout(function () {
                this.send();
            }.bind(this), 3000);
        }
    };
    HttpConn.prototype.handleProcess = function (data) {
        if (this.progress) {
            this.progress(data);
        }
    };
    return HttpConn;
}());
var HTTP = /** @class */ (function () {
    function HTTP(url, responseType, timeout) {
        if (responseType === void 0) { responseType = 'text'; }
        if (timeout === void 0) { timeout = 3000; }
        this.url = null;
        this.timeout = 0;
        this.responseType = null;
        this.mid = 0;
        this.token = null;
        this.url = url;
        this.timeout = timeout;
        this.responseType = responseType;
    }
    HTTP.prototype.make = function (path, data, completeHandler) {
        if (completeHandler === void 0) { completeHandler = null; }
        if (data == null) {
            data = {};
        }
        if (this.mid) {
            this.mid++;
            data.mid = this.mid;
        }
        if (this.token) {
            data.token = this.token;
        }
        var sendtext = '?';
        for (var k in data) {
            if (sendtext != "?") {
                sendtext += "&";
            }
            sendtext += (k + "=" + data[k]);
        }
        var item = new HttpConn(completeHandler);
        item.url = this.url + path + encodeURI(sendtext);
        item.timeout = this.timeout;
        item.responseType = this.responseType;
        return item;
    };
    HTTP.prototype.send = function (path, data, completeHandler) {
        if (completeHandler === void 0) { completeHandler = null; }
        var conn = this.make(path, data, completeHandler);
        conn.send();
    };
    return HTTP;
}());
//# sourceMappingURL=HTTP.js.map