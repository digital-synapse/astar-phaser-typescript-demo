// <reference path="../game.ts"/>
/// <reference path="../random.ts"/>

const PI2 = Math.PI*2;
const QPI = Math.PI/4;

class MotionSprite extends Phaser.Sprite {
 
    constructor(){                
        var x= Random.int(Game.instance.width);
        var y= Random.int(Game.instance.height);
        var game = Game.instance;
        super(game,x,y,'progranism');
        this.scale = new Phaser.Point(0.3,0.3);
        this.smoothed=true;
        this.alpha = 0.8;
        game.add.existing(this);
        game.physics.arcade.enable(this);
        //this.setTarget(Random.int(game.width), Random.int(game.height));
        this.setTarget(game.width/2, game.height/2);
        this.rotation = Random.double(-Math.PI, Math.PI);
        this.velocity = Random.double(10,50);   
         
    }
    
    public turnRadius:number;
    public velocity:number;
    
    private pointFromPolar(magnitude:number, angle:number, degrees:boolean = false) {
        return new Phaser.Point(0,1).setMagnitude(magnitude).rotate(0,0,angle,degrees);
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
    
    private vh: Array<Phaser.Point>;
    private vhi: number;
    public update(){      
        this.turnRadius = .01;
        var angle = Phaser.Math.angleBetweenPoints(this.target,this.position)+10000;
        var diff = Phaser.Math.wrapAngle((this.rotation+10000)-(angle-QPI),true); 
        if (diff < 0)
            this.rotation = Phaser.Math.wrapAngle(this.rotation - this.turnRadius, true);        
        else 
            this.rotation = Phaser.Math.wrapAngle(this.rotation + this.turnRadius, true);        
        var v= this.pointFromPolar(this.velocity,this.rotation);
        this.body.velocity=v;
    }        
}