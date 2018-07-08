/*
* name;
*/
var UIMgr = /** @class */ (function () {
    function UIMgr() {
        this._layers = null; //初始化所有UI层级根节点，对应UI挂载到对应根节点上
    }
    Object.defineProperty(UIMgr, "inst", {
        get: function () {
            if (UIMgr._inst == null) {
                UIMgr._inst = new UIMgr();
            }
            return UIMgr._inst;
        },
        enumerable: true,
        configurable: true
    });
    UIMgr.prototype.getLayer = function (layer) {
        if (layer >= 0 && layer < this._layers.length) {
            return this._layers[layer];
        }
        return null;
    };
    UIMgr.prototype.configure = function (maxUILayer, alertClass, wcClass) {
        var _this = this;
        UIMgr.alertClass = alertClass;
        UIMgr.wcClass = wcClass;
        Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
        //init layers of ui.
        this._layers = new Array();
        for (var i = 0; i < maxUILayer; ++i) {
            var uiLayer = new fairygui.GComponent();
            uiLayer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
            fairygui.GRoot.inst.addChild(uiLayer);
            this._layers.push(uiLayer);
        }
        //handle resize event. keep the size of uilayers as the same as stage.
        Laya.stage.on(Laya.Event.RESIZE, this, function () {
            for (var i = 0; i < _this._layers.length; ++i) {
                var uiLayer = _this._layers[i];
                uiLayer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
            }
        });
    };
    UIMgr.prototype.setLayerMask = function (layer, packageName, compName) {
        var uiLayer = this._layers[layer];
        var comp = fairygui.UIPackage.createObject(packageName, compName).asCom;
        comp.addRelation(uiLayer, fairygui.RelationType.Size);
        uiLayer.addChildAt(comp, 0);
    };
    UIMgr.prototype.add = function (classOfWidget, parent) {
        if (parent === void 0) { parent = null; }
        var w = new classOfWidget;
        if (!parent) {
            w.create(this.getLayer(w.layer));
        }
        else {
            w.create(parent.view);
        }
        return w;
    };
    UIMgr.prototype.clear = function () {
        Widget.clearPool();
    };
    /**
     *
     * @param classOfWidget 挂件类
     * @param maskAlpha 添加mask遮罩
     */
    UIMgr.prototype.popup = function (classOfWidget, maskAlpha) {
        if (maskAlpha === void 0) { maskAlpha = 0.6; }
        var mask = null;
        if (maskAlpha >= 0) {
            var comp = fairygui.UIPackage.createObject('Basic', 'LayerMask').asCom;
            comp.getChild('mask').asGraph.alpha = maskAlpha;
            mask = comp;
            mask.data = '#LayerMask';
        }
        var w = new classOfWidget;
        if (!mask) {
            w.create(this.getLayer(w.layer));
        }
        else {
            var uiLayer = this.getLayer(w.layer);
            mask.addRelation(uiLayer, fairygui.RelationType.Size);
            mask.width = uiLayer.width;
            mask.height = uiLayer.height;
            uiLayer.addChild(mask);
            w.create(mask);
        }
        return w;
    };
    UIMgr._inst = null;
    return UIMgr;
}());
//# sourceMappingURL=UIMgr.js.map