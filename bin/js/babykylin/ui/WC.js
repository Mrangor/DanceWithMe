/*
* name;
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
var WC = /** @class */ (function (_super) {
    __extends(WC, _super);
    function WC(pkg, comp, layer) {
        var _this = _super.call(this, pkg, comp, layer) || this;
        _this.content = null;
        return _this;
    }
    WC.show = function (content) {
        var wc = UIMgr.inst.add(UIMgr.wcClass);
        wc.setContext(content);
    };
    WC.hide = function () {
        if (WC.cur) {
            WC.cur.hide();
            WC.cur = null;
        }
    };
    WC.prototype.onCreated = function () {
        if (WC.cur) {
            WC.cur.hide();
        }
        WC.cur = this;
        this.content = this._view.getChild('txt').asLabel;
    };
    WC.prototype.setContext = function (content) {
        this.content.text = content;
    };
    WC.cur = null;
    return WC;
}(Page));
//# sourceMappingURL=WC.js.map