/*
* name;
*/
var LayoutBtns = /** @class */ (function () {
    function LayoutBtns(comp) {
        var btnList = [];
        for (var i = 0; i < btnList.length; ++i) {
            var btnName = btnList[i];
            comp.getChild(btnName).asButton.onClick(this, this.onBtnClicked, [btnName]);
        }
    }
    LayoutBtns.prototype.onBtnClicked = function (sender) {
        if (sender == 'btn_quick_start') {
            UIMgr.inst.popup(UI_JoinGame);
        }
    };
    return LayoutBtns;
}());
//# sourceMappingURL=LayoutBtns.js.map