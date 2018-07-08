/*
* Alert模块
*/
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
var Alert = /** @class */ (function (_super) {
    __extends(Alert, _super);
    function Alert(pkg, comp, layer) {
        return _super.call(this, pkg, comp, layer) || this;
    }
    Object.defineProperty(Alert, "BTN_OK", {
        get: function () { return 0x1; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Alert, "BTN_CANCEL", {
        get: function () { return 0x2; },
        enumerable: true,
        configurable: true
    });
    ;
    Alert.show = function (content, needCancel) {
        if (needCancel === void 0) { needCancel = false; }
        var alert = UIMgr.inst.add(UIMgr.alertClass);
        alert.setContext(content, needCancel);
        return alert;
    };
    Alert.prototype.onCreated = function () {
        this.content = this._view.getChild('content').asTextField;
        var btnOK = this._view.getChild('btn_ok').asButton;
        var self = this;
        btnOK.onClick(this, function () {
            self.hide();
            if (self.okHandler) {
                self.okHandler(Alert.BTN_OK);
            }
            if (self.handler) {
                self.handler(Alert.BTN_OK);
            }
        }.bind(this));
        var btnCancel = this._view.getChild('btn_cancel').asButton;
        btnCancel.onClick(this, function () {
            self.hide();
            if (self.cancelHandler) {
                self.cancelHandler(Alert.BTN_CANCEL);
            }
            if (self.handler) {
                self.handler(Alert.BTN_CANCEL);
            }
        }.bind(this));
    };
    Alert.prototype.setContext = function (content, needCancel) {
        this.content.text = content;
        this.needCancel = needCancel;
        var btnCancel = this._view.getChild('btn_cancel').asButton;
        var btnOK = this._view.getChild('btn_ok').asButton;
        btnCancel.visible = this.needCancel;
        if (this.needCancel) {
            btnOK.x = this._view.width / 2 - btnOK.width / 2 - 150;
            btnCancel.x = this._view.width / 2 - btnCancel.width / 2 + 150;
        }
        else {
            btnOK.x = this._view.width / 2 - btnOK.width / 2;
        }
    };
    Alert.prototype.on = function (fn) {
        this.handler = fn;
        return this;
    };
    Alert.prototype.onYes = function (fn) {
        this.okHandler = fn;
        return this;
    };
    Alert.prototype.onNO = function (fn) {
        this.cancelHandler = fn;
        return this;
    };
    return Alert;
}(Page));
//# sourceMappingURL=Alert.js.map