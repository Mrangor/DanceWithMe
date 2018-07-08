
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.modules {
    export class AlertUI extends View {
		public mask:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":400,"height":300},"child":[{"type":"Image","props":{"y":-500,"x":-180,"width":720,"var":"mask","skin":"comp/blank.png","name":"mask","height":1280}},{"type":"Image","props":{"y":0,"x":0,"width":400,"skin":"comp/bg.png","sizeGrid":"46,44,21,35","height":300}},{"type":"Button","props":{"y":0,"x":375,"width":25,"skin":"comp/btn_close.png","name":"btn_close","height":25}},{"type":"Button","props":{"y":251,"x":80,"width":100,"skin":"comp/button.png","name":"btn_ok","label":"确定","height":40}},{"type":"Button","props":{"y":250,"x":230,"width":100,"skin":"comp/button.png","name":"btn_cancle","label":"取消","height":40}},{"type":"Label","props":{"y":77,"x":43,"wordWrap":true,"width":306,"valign":"middle","text":"哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈","overflow":"visible","layoutEnabled":true,"height":139,"fontSize":30,"font":"Helvetica","color":"#000000","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.modules.AlertUI.uiView);

        }

    }
}

module ui.modules {
    export class ListPageUI extends View {
		public _list:Laya.List;
		public add:Laya.Button;
		public del:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1000},"child":[{"type":"List","props":{"y":0,"x":0,"var":"_list","spaceY":5,"repeatY":12},"child":[{"type":"Box","props":{"y":0,"x":0,"renderType":"render"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":640,"skin":"textures/icon_white.png","height":80}},{"type":"CheckBox","props":{"y":5,"x":564,"skin":"comp/checkbox.png","sizeGrid":"3,6,3,3","scaleY":5,"scaleX":5,"name":"check"}},{"type":"Label","props":{"y":26,"x":36,"text":"1","name":"listNumber","fontSize":30,"font":"Arial","bold":true}},{"type":"Label","props":{"y":22,"x":254,"width":113.3984375,"text":"label1","height":40,"fontSize":40,"font":"SimHei","bold":true}}]},{"type":"Tab","props":{"y":1004,"x":1,"selectedIndex":2},"child":[{"type":"Button","props":{"y":12,"x":0,"width":324,"var":"add","skin":"template/ButtonTab/btn_LargeTabButton_Left.png","sizeGrid":"6,5,9,5","name":"item0","labelSize":36,"labelColors":"#007AFF,#007AFF,#FFFFFF","label":"增加","height":84}},{"type":"Button","props":{"y":11,"x":320,"width":324,"var":"del","skin":"template/ButtonTab/btn_LargeTabButton_Middle.png","name":"item1","labelSize":36,"labelColors":"#007AFF,#007AFF,#FFFFFF","label":"删除","height":84}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.modules.ListPageUI.uiView);

        }

    }
}
