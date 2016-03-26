/// <reference path="./mouse-drag-button.ts"/>
class CameraScroll extends MouseDragButton {
    
    constructor(game: Phaser.Game) {
        super(game, game.input.activePointer.rightButton);

    }

    protected dragStart(x:number, y:number){        
        this.game.canvas.style.cursor = 'all-scroll';
    }

    protected dragEnd(startX:number, startY:number, endX:number, endY:number){        
        this.game.canvas.style.cursor = 'default';
    } 
    protected drag(startX:number, startY:number, currentX:number, currentY:number){
        this.game.camera.x += ((currentX - startX) * 0.25);
        this.game.camera.y += ((currentY - startY) * 0.25);       
    }
}