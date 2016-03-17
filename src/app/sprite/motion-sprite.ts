/// <reference path="./ghost-sprite.ts"/>
/// <reference path="../game.ts"/>

class MotionSprite extends GhostSprite {
 
    constructor(){                
        var x= Random.int(Game.instance.width);
        var y= Random.int(Game.instance.height);
        var game = Game.instance;
        super(game,x,y,'progranism', 10, 0.5);
        this.setTarget(Random.int(game.width), Random.int(game.height));
    }
    
    public setTarget(x:number, y:number){
        if (!this.hasTarget){
            this.targetX=x;
            this.targetY=y;
            this.hasTarget=true;
        }
    }    
    private hasTarget: boolean;
    private targetX:number;
    private targetY:number;
    
    public update(){
        
        var x = Random.int(this.targetX-150, this.targetX+150);
        var y = Random.int(this.targetY-150, this.targetY+150);
        this.game.physics.arcade.moveToXY(this, x,y,250);
        if (this.hasTarget 
            && Math.abs(x-this.position.x) < 300 
            && Math.abs(y-this.position.y) < 300) 
            this.hasTarget=false;
            
        super.update();
    }        
}