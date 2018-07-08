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
* name;
*/
var PreloadingPage = /** @class */ (function (_super) {
    __extends(PreloadingPage, _super);
    function PreloadingPage() {
        var _this = _super.call(this, "Preloading", "Preloading", UILayer.GAME) || this;
        _this.loadingBar = null;
        return _this;
    }
    PreloadingPage.prototype.onCreated = function () {
        this.loadingBar = this._view.getChild('loadingTxt').asTextField;
        this.setProgress(0);
    };
    PreloadingPage.prototype.setProgress = function (value) {
        var progress = Math.floor(value * 100);
        this.loadingBar.text = 'Loading... ' + progress + '%';
    };
    return PreloadingPage;
}(Page));
//# sourceMappingURL=PreloadingPage.js.map