/// <reference path="./mouse-drag-button.ts"/>
class RectangleSelect extends MouseDragButton {
    
    constructor(game: Phaser.Game, onSelect?: (startX:number, startY:number, endX:number, endY:number)=>void) {
        super(game, game.input.activePointer.leftButton);
        this.onSelect = onSelect;
        this.graphics = game.add.graphics(0,0);                 
        this.graphics.fixedToCamera=true;          
        this.add(this.graphics);       
    }
    public select(onSelect: (startX:number, startY:number, endX:number, endY:number)=>void){
        this.onSelect = onSelect;
    }
    protected dragStart(x:number, y:number){
        this.graphics.clear();
        this.graphics.position.x=x;
        this.graphics.position.y=y;
    }
    protected drag(startX:number, startY:number, currentX:number, currentY:number){
        var width = currentX-startX;
        var height = currentY-startY;
        this.graphics.clear();
        this.graphics.lineStyle(1, 0x00EE00);                
        this.graphics.beginFill(0x000000, 0.1);
        this.graphics.drawRect(startX,startY,width,height);
        this.graphics.endFill();        
    }
    protected dragEnd(startX:number, startY:number, endX:number, endY:number){
        this.graphics.clear();
        var fn= ()=>{this.onSelect(startX, startY, endX, endY)};
        fn();
    }    
    
    private onSelect: (startX:number, startY:number, endX:number, endY:number)=>void;
    private graphics: Phaser.Graphics; 
}