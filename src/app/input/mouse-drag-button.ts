class MouseDragButton extends Phaser.Group {
   
    constructor(game: Phaser.Game, button: Phaser.DeviceButton) {
        super(game);
        this.game= game;
        this.button = button;
        this.game.add.existing(this);
    }
    private button: Phaser.DeviceButton;
    
    protected dragStart(x:number, y:number){
        
    }
    protected drag(startX:number, startY:number, currentX:number, currentY:number){
        
    }
    protected dragEnd(startX:number, startY:number, endX:number, endY:number){
        
    } 
        
    update() {
        
        // handle mouse drag logic and do callbacks
        var ptr = this.game.input.activePointer;
        
        if (this.button.isDown){
            if (this.dragging){                
                if (this.dragStartX != ptr.x && this.dragStartY != ptr.y){
                    if (!this.draggingStarted){
                        this.draggingStarted=true;
                        this.dragStart(this.dragStartX, this.dragStartY);
                    }
                    else{                
                        this.drag(
                            this.dragStartX,
                            this.dragStartY,
                            ptr.x, 
                            ptr.y);
                    }
                }
                
            }
            else {
                this.dragging=true;
                this.draggingStarted=false;
                this.dragStartX=ptr.x;
                this.dragStartY=ptr.y;
            } 
        }
        else if (this.dragging) {
            this.dragging=false;
            this.draggingStarted=false;
            if (this.dragStartX != ptr.x && this.dragStartY != ptr.y){
                this.dragEnd(
                    this.dragStartX,
                    this.dragStartY,
                    ptr.x, 
                    ptr.y);                 
            }
        }
    }
    
    private dragging:boolean;
    private draggingStarted:boolean;
    private dragStartX:number;
    private dragStartY:number;    
}