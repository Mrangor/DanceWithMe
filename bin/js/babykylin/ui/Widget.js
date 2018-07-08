/*
* 挂件：所有弹窗的基类
*/
var Widget = /** @class */ (function () {
    /**
     *
     * @param pkg   FairyGUI包名
     * @param comp  FairyGUI组件名
     * @param layer UI层级
     */
    function Widget(pkg, comp, layer) {
        this._relations = new Array();
        this._component = null;
        this._package = null;
        this._timer = -1;
        this._view = null; //挂件实例对象
        this._layer = 0;
        this._package = pkg;
        this._component = comp;
        Widget._pool.push(this);
    }
    Widget.clearPool = function () {
        while (Widget._pool.length) {
            var w = Widget._pool[0];
            w.hide();
        }
    };
    Widget.prototype.hide = function () {
        var root = this._view;
        if (!root || !root.parent) {
            return;
        }
        //如果是MASK，则需要移除
        if (root.parent.data) {
            root = root.parent;
        }
        if (root.parent) {
            root.removeFromParent();
        }
        if (root) {
            root.dispose();
        }
        var idx = Widget._pool.indexOf(this);
        Widget._pool.splice(idx, 1);
        this.onDispose();
        clearInterval(this._timer);
    };
    Object.defineProperty(Widget.prototype, "package", {
        get: function () {
            return this._package;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "component", {
        get: function () {
            return this._component;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "view", {
        get: function () {
            return this._view;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "layer", {
        get: function () {
            return this._layer;
        },
        enumerable: true,
        configurable: true
    });
    Widget.prototype.keepSize = function () {
        this.addRelation(fairygui.RelationType.Size);
    };
    Widget.prototype.keepCenter = function () {
        this.addRelation(fairygui.RelationType.Center_Center);
        this.addRelation(fairygui.RelationType.Middle_Middle);
    };
    Widget.prototype.addRelation = function (relationType) {
        this._relations.push(relationType);
    };
    Widget.prototype.create = function (parent) {
        //通过当前的挂件包名和组件名，构造fairygui对象
        var obj = fairygui.UIPackage.createObject(this._package, this._component);
        var view = obj.asCom;
        this._view = view;
        //设置挂件位置关系
        for (var i = 0; i < this._relations.length; ++i) {
            var rt = this._relations[i];
            this._view.addRelation(parent, rt);
            if (rt == fairygui.RelationType.Size) {
                this._view.setSize(parent.width, parent.height);
            }
            else if (rt == fairygui.RelationType.Center_Center) {
                var y = parent.height / 2 - obj.height / 2;
                obj.y = y;
            }
            else if (rt == fairygui.RelationType.Middle_Middle) {
                var x = parent.width / 2 - obj.width / 2;
                obj.x = x;
            }
        }
        parent.addChild(this._view);
        this.onCreated();
    };
    Widget.prototype.listenButtons = function (btnList, handler) {
        for (var i = 0; i < btnList.length; ++i) {
            var btnName = btnList[i];
            this._view.getChild(btnName).asButton.onClick(this, handler, [btnName]);
        }
    };
    //开启界面更新。 （由于不是每一个界面都需要更新。所以，界面更新需要由子界面自己开启。)
    Widget.prototype.startUpdate = function (interval) {
        if (this._timer) {
            clearInterval(this._timer);
        }
        var self = this;
        this._timer = setInterval(function () {
            self.onUpdate();
        }, interval);
    };
    Widget.prototype.onCreated = function () { };
    Widget.prototype.onDispose = function () { };
    Widget.prototype.onUpdate = function () { };
    Widget._pool = new Array();
    return Widget;
}());
//# sourceMappingURL=Widget.js.map