/*
* name;
*/
var LayoutSubBtns = /** @class */ (function () {
    function LayoutSubBtns(comp) {
        var btnList = ['btn_lobby', 'btn_mall', 'btn_zhanji', 'btn_mine'];
        for (var i = 0; i < btnList.length; ++i) {
            var btnName = btnList[i];
            comp.getChild(btnName).asButton.onClick(this, this.onBtnClicked, [btnName]);
        }
        var btnList = ['btn_guize', 'btn_kefu', 'btn_setting'];
        var menu = comp.getChild('menu').asCom;
        for (var i = 0; i < btnList.length; ++i) {
            var btnName = btnList[i];
            menu.getChild(btnName).asButton.onClick(this, this.onBtnClicked, [btnName]);
        }
    }
    LayoutSubBtns.prototype.onBtnClicked = function (sender) {
        if (sender == 'btn_lobby') {
            MasterMgr.inst.switch('lobby');
        }
        else if (sender == 'btn_mall') {
            Alert.show('买买买，真土豪');
        }
        else if (sender == 'btn_kefu') {
            Alert.show('请联系优乐棋牌官方微信号[还没注册]');
        }
        else if (sender == 'btn_setting') {
        }
        else if (sender == 'btn_mine') {
            Alert.show('我的前半生！');
        }
        //转发给子游戏场景处理
        else if (sender == 'btn_zhanji') {
            bk.emit("btn_zhanji_clicked");
        }
        else if (sender == 'btn_guize') {
            bk.emit("btn_guize_clicked");
        }
    };
    return LayoutSubBtns;
}());
//# sourceMappingURL=LayoutSubBtns.js.map