/// <reference path="./pathfinder.ts"/>


function add(arr: number[], valueToAdd:number){    
    for (var i=0; i < arr.length; i++){
        arr[i]=arr[i] + valueToAdd;
    }
    return arr;
}

class WalkingSprite extends Phaser.Sprite {
    
    constructor(spriteKey:string, startIndex:number, pathfinder: Pathfinder){
        var game = Game.instance;
        super(game,0,0,spriteKey);

        this.anchor.setTo(0.5,0.8);        
        this.animations.add('walk-up',add([0,1,2,1], startIndex),4,true);
        this.animations.add('walk-down',add([3,4,5,4], startIndex),4,true);
        this.animations.add('walk-left',add([6,7,8,7], startIndex),4,true);
        this.animations.add('walk-right',add([9,10,11,10], startIndex),4,true); 
        this.animations.add('idle-up',add([2], startIndex),4,true);
        this.animations.add('idle-down',add([5], startIndex),4,true);
        this.animations.add('idle-left',add([8], startIndex),4,true);
        this.animations.add('idle-right',add([11], startIndex),4,true);
        this.animations.play('idle-down');
        
        this.pathfinder = pathfinder;
        game.add.existing(this);
        
        this.position = pathfinder.getRandomWalkablePoint();
        this.walkToARandomPlace();      
                
        this.inputEnabled=true;
        this.events.onInputDown.add(this.onClicked,this);
    }
              
    private pathfinder: Pathfinder;
    private tweenFrame: number;
    private lastPosition: Phaser.Point;
    private lastDirection: Direction;
    
    private onClicked() {
        Game.instance.camera.follow(this);
    }
    
    private onTweeningComplete() {
        switch(this.lastDirection){
            case Direction.E: this.animations.play('idle-right'); break;
            case Direction.S: this.animations.play('idle-down'); break;
            case Direction.W: this.animations.play('idle-left'); break;
            case Direction.N: this.animations.play('idle-up'); break;
        }
        this.walkToARandomPlace();
    }
    private onTweeningUpdate(twn:any,percent:any,twnData:any)
    {
        this.tweenFrame++;
        if (this.tweenFrame>5){
            this.tweenFrame=0;
            
            var position = this.position;
            var lastPosition = this.lastPosition;
            var dif = new Phaser.Point(position.x-lastPosition.x, position.y-lastPosition.y);
            var adif = new Phaser.Point(Math.abs(dif.x), Math.abs(dif.y));
            lastPosition= new Phaser.Point(position.x,position.y);
            var direction = this.lastDirection;
            if (dif.x > 0){
                direction = Direction.E;
            }
            else if (dif.x < 0){
                direction = Direction.W;
            }
            if (adif.y >= adif.x){
                if (dif.y > 0){
                    direction = Direction.S;
                }
                else if (dif.y < 0 ){
                    direction = Direction.N;
                }
            }
            var change = this.lastDirection != direction;
            this.lastDirection = direction;
            
            if (change){  
                if (direction == Direction.E) this.animations.play('walk-right');
                else if (direction == Direction.S) this.animations.play('walk-down');
                else if (direction == Direction.N) this.animations.play('walk-up');
                else if (direction == Direction.N) this.animations.play('walk-left');
            }  
                   
        }
    }
    
    private walkToARandomPlace() {
        if (!this.tryWalkToARandomPlace()){
            setTimeout(()=>{this.walkToARandomPlace()},200);
        }
    }
    private static pathfinderLocked:boolean;
    private tryWalkToARandomPlace():boolean {
        if (WalkingSprite.pathfinderLocked) return false;
        WalkingSprite.pathfinderLocked=true;
        {            
            var game = Game.instance;      
            var path= this.pathfinder.findPath(this.position, this.pathfinder.getRandomWalkablePoint());

            var dest:any = { x: [], y: [] };
            var xx:number[]=[], yy:number[]=[];
            var dist=0;
            for (var i=path.length-1; i >=0; i--){
            dest.x.push(path[i].x);
            dest.y.push(path[i].y);
            if ( i >0) dist+= Phaser.Math.distance(path[i].x, path[i].y, path[i-1].x, path[i-1].y);  
            }                        
            
            //var tween= game.add.tween(this).to(dest, dist*1000);
            var tween= game.add.tween(this.position).to(dest, dist * 25);            
            tween.interpolation((v:number[],k:number)=>{return Phaser.Math.catmullRomInterpolation(v,k);});       
            this.lastDirection = Direction.S;
            this.tweenFrame=0;
            this.lastPosition = new Phaser.Point(this.position.x, this.position.y);
            tween.onUpdateCallback(this.onTweeningUpdate,this);  
            tween.onComplete.add(this.onTweeningComplete,this);
            tween.repeat(0);
            tween.start();  
        }
        WalkingSprite.pathfinderLocked = false;
        return true;
    }
}