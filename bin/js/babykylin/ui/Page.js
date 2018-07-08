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
/*
* 页面基类，继承挂件
*/
var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page(pkg, comp, layer) {
        var _this = _super.call(this, pkg, comp, layer) || this;
        _this.keepSize();
        return _this;
    }
    return Page;
}(Widget));
//# sourceMappingURL=Page.js.map