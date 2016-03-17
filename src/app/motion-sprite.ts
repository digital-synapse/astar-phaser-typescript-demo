
class MotionSprite extends GhostSprite {
 
    constructor(){                
        var x= Random.Int(game.width);
        var y= Random.Int(game.height);
        super(game,x,y,'progranism', 10, 0.5);
        this.setTarget(Random.Int(game.width), Random.Int(game.height));
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
        
        var x = Random.Int(this.targetX-150, this.targetX+150);
        var y = Random.Int(this.targetY-150, this.targetY+150);
        this.game.physics.arcade.moveToXY(this, x,y,250);
        if (this.hasTarget 
            && Math.abs(x-this.position.x) < 300 
            && Math.abs(y-this.position.y) < 300) 
            this.hasTarget=false;
            
        super.update();
    }        
}