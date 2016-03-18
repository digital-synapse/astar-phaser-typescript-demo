// <reference path="../game.ts"/>
/// <reference path="../random.ts"/>

const PI2 = Math.PI*2;
class MotionSprite extends Phaser.Sprite {
 
    constructor(){                
        var x= Random.int(Game.instance.width);
        var y= Random.int(Game.instance.height);
        var game = Game.instance;
        super(game,x,y,'progranism');
        this.scale = new Phaser.Point(0.5,0.5);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.setTarget(Random.int(game.width), Random.int(game.height));
        this.rotation = Random.double(2*Math.PI);
        this.velocity = Random.double(50);
        this.turnRadius = 1/this.velocity;         
    }
    
    public turnRadius:number;
    public velocity:number;
    
    private pointFromPolar(magnitude:number, angle:number, degrees:boolean = false) {
        return new Phaser.Point(1,0).setMagnitude(magnitude).rotate(0,0,angle,degrees);
    }
    
    private getAngleFromPoint( firstPoint:Phaser.Point, secondPoint:Phaser.Point):number {

        if((secondPoint.x > firstPoint.x)) {//above 0 to 180 degrees

            return Math.atan2((secondPoint.x - firstPoint.x), (firstPoint.y - secondPoint.y));

        }
        else if((secondPoint.x < firstPoint.x)) {//above 180 degrees to 360/0

            return  PI2- Math.atan2((firstPoint.x - secondPoint.x), (firstPoint.y - secondPoint.y));

        }//End if((secondPoint.x > firstPoint.x) && (secondPoint.y <= firstPoint.y))

        return Math.atan2(0 ,0);

    }    
    
    public setTarget(x:number, y:number){
        if (!this.hasTarget){
            this.target = new Phaser.Point(x,y);
            this.hasTarget=true;
        }
    }    
    private hasTarget: boolean;
    private target:Phaser.Point;
    public body: Phaser.Physics.Arcade.Body;
    
    public update(){
        
        var angle = this.getAngleFromPoint(this.position, this.target);
        if ((angle -this.rotation) < 0){
            this.rotation -= this.turnRadius;
        }
        else {
            this.rotation += this.turnRadius;
        }
        this.body.velocity= this.pointFromPolar(this.velocity,this.rotation);
    }        
}