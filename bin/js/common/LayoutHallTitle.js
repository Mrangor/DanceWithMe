/*
* name;
*/
var LayoutHallTitle = /** @class */ (function () {
    function LayoutHallTitle(component) {
        component.getChild('name').asLabel.text = UserMgr.inst._info.name + ' ID:' + UserMgr.inst._info.userId;
        var url = UserMgr.inst._info.imgUrl;
        url = HttpMgr.inst.url + '/image?url=' + encodeURIComponent(url) + '.jpg';
        component.getChild('icon').asLoader.url = url;
        component.getChild('gems').asLabel.text = UserMgr.inst._info.gems.toString();
        component.getChild('icon').asButton.onClick(this, this.onBtnClicked, ['icon']);
    }
    LayoutHallTitle.prototype.onBtnClicked = function (sender) {
        console.log("on " + sender + " clicked");
        Alert.show("on " + sender + " clicked");
    };
    return LayoutHallTitle;
}());
//# sourceMappingURL=LayoutHallTitle.js.map