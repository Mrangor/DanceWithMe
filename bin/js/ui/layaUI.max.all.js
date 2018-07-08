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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var modules;
    (function (modules) {
        var AlertUI = /** @class */ (function (_super) {
            __extends(AlertUI, _super);
            function AlertUI() {
                return _super.call(this) || this;
            }
            AlertUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.modules.AlertUI.uiView);
            };
            AlertUI.uiView = { "type": "View", "props": { "width": 400, "height": 300 }, "child": [{ "type": "Image", "props": { "y": -500, "x": -180, "width": 720, "var": "mask", "skin": "comp/blank.png", "name": "mask", "height": 1280 } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 400, "skin": "comp/bg.png", "sizeGrid": "46,44,21,35", "height": 300 } }, { "type": "Button", "props": { "y": 0, "x": 375, "width": 25, "skin": "comp/btn_close.png", "name": "btn_close", "height": 25 } }, { "type": "Button", "props": { "y": 251, "x": 80, "width": 100, "skin": "comp/button.png", "name": "btn_ok", "label": "确定", "height": 40 } }, { "type": "Button", "props": { "y": 250, "x": 230, "width": 100, "skin": "comp/button.png", "name": "btn_cancle", "label": "取消", "height": 40 } }, { "type": "Label", "props": { "y": 77, "x": 43, "wordWrap": true, "width": 306, "valign": "middle", "text": "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈", "overflow": "visible", "layoutEnabled": true, "height": 139, "fontSize": 30, "font": "Helvetica", "color": "#000000", "align": "center" } }] };
            return AlertUI;
        }(View));
        modules.AlertUI = AlertUI;
    })(modules = ui.modules || (ui.modules = {}));
})(ui || (ui = {}));
(function (ui) {
    var modules;
    (function (modules) {
        var ListPageUI = /** @class */ (function (_super) {
            __extends(ListPageUI, _super);
            function ListPageUI() {
                return _super.call(this) || this;
            }
            ListPageUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.modules.ListPageUI.uiView);
            };
            ListPageUI.uiView = { "type": "View", "props": { "width": 640, "height": 1000 }, "child": [{ "type": "List", "props": { "y": 0, "x": 0, "var": "_list", "spaceY": 5, "repeatY": 12 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "renderType": "render" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 640, "skin": "textures/icon_white.png", "height": 80 } }, { "type": "CheckBox", "props": { "y": 5, "x": 564, "skin": "comp/checkbox.png", "sizeGrid": "3,6,3,3", "scaleY": 5, "scaleX": 5, "name": "check" } }, { "type": "Label", "props": { "y": 26, "x": 36, "text": "1", "name": "listNumber", "fontSize": 30, "font": "Arial", "bold": true } }, { "type": "Label", "props": { "y": 22, "x": 254, "width": 113.3984375, "text": "label1", "height": 40, "fontSize": 40, "font": "SimHei", "bold": true } }] }, { "type": "Tab", "props": { "y": 1004, "x": 1, "selectedIndex": 2 }, "child": [{ "type": "Button", "props": { "y": 12, "x": 0, "width": 324, "var": "add", "skin": "template/ButtonTab/btn_LargeTabButton_Left.png", "sizeGrid": "6,5,9,5", "name": "item0", "labelSize": 36, "labelColors": "#007AFF,#007AFF,#FFFFFF", "label": "增加", "height": 84 } }, { "type": "Button", "props": { "y": 11, "x": 320, "width": 324, "var": "del", "skin": "template/ButtonTab/btn_LargeTabButton_Middle.png", "name": "item1", "labelSize": 36, "labelColors": "#007AFF,#007AFF,#FFFFFF", "label": "删除", "height": 84 } }] }] }] };
            return ListPageUI;
        }(View));
        modules.ListPageUI = ListPageUI;
    })(modules = ui.modules || (ui.modules = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map