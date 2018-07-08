var MasterInfo = /** @class */ (function () {
    function MasterInfo(type, name, master_script, entry_scene, extra) {
        this.id = null;
        this.type = null; //类别 common:普通 subgame子游戏
        this.name = null; //名称 拿来看的
        this.master_script = null; //主逻辑
        this.entry_scene = null; //入口场景，如果有，会在切换主逻辑的时候自动加载
        this.game_scene = null;
        this.extra = null;
        this.enable = true;
        this.type = type;
        this.name = name;
        this.master_script = master_script;
        this.entry_scene = entry_scene;
        this.extra = extra;
    }
    MasterInfo.COMMON = 'common';
    MasterInfo.SUB_GAME = 'subgame';
    return MasterInfo;
}());
//# sourceMappingURL=MasterInfo.js.map