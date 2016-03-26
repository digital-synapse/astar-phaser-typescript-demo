class SelectedSprite extends Phaser.Sprite {
 
 
    constructor(game: Phaser.Game, spriteKey:string){
        super(game,0,0,spriteKey);
        
        this.graphics = game.make.graphics(0,0);     
        this.addChild(this.graphics);
                
    }
    private graphics : Phaser.Graphics;
    
    private _selected:boolean;
    public get selected() { return this._selected; };
    public set selected(selected:boolean) {
        this._selected = selected;        
        this.graphics.clear();
        if (selected){
            var rect = this.getLocalBounds();
            this.graphics.lineStyle(1, 0x00EE00);               
            this.graphics.beginFill(0x000000, 0.1);                         
            this.graphics.drawRect(rect.x,rect.y,this.height,this.width);
            this.graphics.endFill();
        }                
    }
        
}