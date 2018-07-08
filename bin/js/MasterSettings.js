var MasterSettings = /** @class */ (function () {
    function MasterSettings() {
    }
    Object.defineProperty(MasterSettings, "crypto", {
        get: function () {
            if (MasterSettings._crypto) {
                return MasterSettings._crypto;
            }
            MasterSettings._crypto = {
                HTTP_AES_KEY: null,
                GAME_AES_KEY: null,
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MasterSettings, "masters", {
        get: function () {
            if (MasterSettings._masters) {
                return MasterSettings._masters;
            }
            MasterSettings._masters = {};
            var masters = MasterSettings._masters;
            //登陆
            masters.preloading = {
                type: 'common',
                name: '预加载',
                master_script: PreloadingMaster,
                entry_scene: PreloadingScene,
            };
            //登陆
            masters.login = {
                type: 'common',
                name: '登陆',
                master_script: LoginMaster,
                entry_scene: LoginScene,
            };
            //创建角色
            masters.create_role = {
                type: 'common',
                name: '创建角色',
            };
            //大厅
            masters.lobby = {
                type: 'common',
                name: '平台大厅',
                master_script: LobbyMaster,
                entry_scene: LobbyScene,
            };
            //子游戏
            masters['0010001'] = {
                enable: true,
                type: 'subgame',
                name: "斗地主",
                master_script: DDZMaster,
                entry_scene: DDZLobbyScene,
                game_scene: DDZGameScene,
                folder: 'subgames/ddz',
            };
            masters['0020001'] = {
                enable: true,
                type: 'subgame',
                name: "麻将",
                master_script: 'subgame_master_0020001',
                entry_scene: 'hall_0020001',
                game_scene: 'game_0020001',
                folder: 'mj_0020001',
            };
            masters['0040002'] = {
                enable: true,
                type: 'subgame',
                name: "牛牛",
                master_script: 'subgame_master_0040002',
                entry_scene: 'hall_0040002',
                game_scene: 'game_0040002',
                folder: 'niuniu_0040002',
            };
            // masters['0030001'] = {
            //     enable:true,
            //     type:'subgame',
            //     name: "十三水", 
            //     master_script:SSSMaster,
            //     entry_scene: SSSLobbyScene,
            //     game_scene:SSSGameScene,
            //     folder:'thirteen_0030001',
            // }
            masters['0110001'] = {
                enable: true,
                type: 'subgame',
                name: "诈金花",
                master_script: 'subgame_master_0110001',
                entry_scene: 'hall_0110001',
                game_scene: 'game_0110001',
                folder: 'zhajinhua_0110001',
            };
            masters['1000001'] = {
                enable: true,
                type: 'subgame',
                name: "五子棋",
                master_script: 'subgame_master_1000001',
                //entry_scene:'game_0020001',
                game_scene: 'game_1000001',
                folder: 'wuziqi_1000001',
            };
            return masters;
        },
        enumerable: true,
        configurable: true
    });
    MasterSettings._crypto = null;
    MasterSettings._masters = null;
    return MasterSettings;
}());
//# sourceMappingURL=MasterSettings.js.map