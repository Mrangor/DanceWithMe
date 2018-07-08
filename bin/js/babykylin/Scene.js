/**
 * 场景基类
 */
var Scene = /** @class */ (function () {
    function Scene(designWidth, designHeight, isGameScene) {
        if (isGameScene === void 0) { isGameScene = false; }
        this._isGameScene = false;
        this._designWidth = -1;
        this._designHeight = -1;
        this._designWidth = designWidth;
        this._designHeight = designHeight;
        this._isGameScene = isGameScene;
    }
    Object.defineProperty(Scene.prototype, "isGameScene", {
        get: function () {
            return this._isGameScene;
        },
        enumerable: true,
        configurable: true
    });
    Scene.prototype.getDesignResolution = function () {
        if (this._designHeight < 0 || this._designWidth < 0) {
            return null;
        }
        return new Laya.Point(this._designWidth, this._designHeight);
    };
    Scene.prototype.getRes = function () {
    };
    Scene.prototype.start = function () {
    };
    Scene.prototype.update = function () {
    };
    Scene.prototype.end = function () {
    };
    return Scene;
}());
//# sourceMappingURL=Scene.js.map