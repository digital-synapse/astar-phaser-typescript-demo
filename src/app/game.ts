/// <reference path="./progranism/progranism.ts"/>
/// <reference path="./food/food.ts"/>
/// <reference path="./world/pathfinder.ts"/>
/// <reference path="./world/walking-sprite.ts"/>

class Game {

    public static instance : Phaser.Game;
    
    constructor() {
        var winW = document.body.offsetWidth;
        var winH = document.body.offsetHeight;
        Game.instance = new Phaser.Game(winW,winH, Phaser.WEBGL, '', this);

        this.progranisms = new Array<Progranism>();
        this.maxProgranisms = 1000;    
        this.food = new Array<Food>();    
        this.maxFood = 3;
        this.sprites = new Array<WalkingSprite>();
    }
        
    //private game: Phaser.Game;
    
    private preload() {
        var load = Game.instance.load;
        load.image('food', '../assets/food.png');
        load.image('progranism', '../assets/sphere.png');        
        load.image('world_tiles', '../assets/world1.png')
        this.pathfinder = new Pathfinder('../assets/world1.json');     
        load.spritesheet('sprites', '../assets/sprites.png',32,32);   
    }
    private pathfinder: Pathfinder;
    
    private create() {
        var game = Game.instance;                      
        game.scale.setExactFit();
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.time.advancedTiming = true;
        var world= game.add.sprite(0,0,'world_tiles');
        game.world.setBounds(0,0,world.width,world.height);

        this.pathfinder.create();
        
        for (var i=0; i < 100; i++)
            this.sprites[i] = new WalkingSprite('sprites', (i % 39)*12, this.pathfinder);
            
        world.inputEnabled=true;
        world.events.onInputDown.add(()=>{ game.camera.unfollow(); });
        /*
        var start=game.add.sprite(550,500,'food');
        var end=game.add.sprite(5750,2900,'food');
        start.anchor.setTo(0.5,0.9);
        end.anchor.setTo(0.5,0.9);
        
        var guy = game.add.sprite(550,500,'sprites');
        guy.animations.add('up',[0,1,2,1],4,true);
        guy.animations.add('down',[3,4,5,4],4,true);
        guy.animations.add('left',[6,7,8,7],4,true);
        guy.animations.add('right',[9,10,11,10],4,true);        
        guy.animations.play('down');
        
        guy.anchor.setTo(0.5,0.8);
        game.camera.follow(guy);
        var path= this.pathfinder.findPath(start.position, end.position);
        var dest:any = { x: [], y: [] };
        var xx:number[]=[], yy:number[]=[];
        for (var i=path.length-1; i >=0; i--){
          dest.x.push(path[i].x);
          dest.y.push(path[i].y);  
        }
                
        var tween= game.add.tween(guy).to(dest, 150000);
        tween.interpolation((v:number[],k:number)=>{return Phaser.Math.catmullRomInterpolation(v,k);});       
        var lastDirection = Direction.S;
        var lastPosition = start.position;        
        
        var frame=0;
        tween.onUpdateCallback((twn:any,percent:any,twnData:any)=>{
            frame++;
            if (frame>5){
                frame=0;
            
            var position = guy.position;
            var dif = new Phaser.Point(position.x-lastPosition.x, position.y-lastPosition.y);
            var adif = new Phaser.Point(Math.abs(dif.x), Math.abs(dif.y));
            lastPosition= new Phaser.Point(position.x,position.y);
            var direction = lastDirection;
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
            var change = lastDirection != direction;
            lastDirection = direction;
            if (change){
                
                if (direction == Direction.E) guy.animations.play('right');
                else if (direction == Direction.S) guy.animations.play('down');
                else if (direction == Direction.N) guy.animations.play('up');
                else if (direction == Direction.N) guy.animations.play('left');
            }  
            }       
        },this);  
        tween.repeat(0);
        tween.start();
*/                  
        /*
tween.onUpdateCallback(()=>{       
            var position = guy.position;
            var dif = position.subtract(lastPosition.x, lastPosition.y);
            lastPosition=position;
            var direction = lastDirection;
            if (dif.x > 0){
                direction = Direction.E;
                if (dif.y > 0 && dif.y < dif.x){
                    direction = Direction.S;
                }
                else if (dif.y < 0 && 0-dif.y < dif.x){
                    direction = Direction.N;
                }
            }
            var change = lastDirection != direction;
            lastDirection = direction;
            if (change){
                if (direction == Direction.E) guy.animations.play('right');
                else if (direction == Direction.S) guy.animations.play('down');
                else if (direction == Direction.N) guy.animations.play('up');
            }  
        })        
        */
                
        /*
        var sprite=game.add.sprite(550, 500, 'progranism');
        sprite.anchor.setTo(0.5,0.5);
        game.camera.follow(sprite);
        var path= this.pathfinder.findPath(start.position, end.position);
        var dest:any = { x: [], y: [] };
        var xx:number[]=[], yy:number[]=[];
        for (var i=path.length-1; i >=0; i--){
          dest.x.push(path[i].x);
          dest.y.push(path[i].y);  
        }
                
        var tween= game.add.tween(sprite).to(dest, 50000);
        tween.interpolation((v:number[],k:number)=>{return Phaser.Math.catmullRomInterpolation(v,k);});       
        tween.repeat(0);
        tween.start();
        */
        /*
        for (var i=0; i < this.maxProgranisms; i++){
            var p = new Progranism(); 
            this.progranisms.push(p);
        }
        */
        /*
        for (var i=0; i < this.maxFood; i++){
            var f= new Food();
            this.food.push(f);
        }
        */          
        this.cursors=game.input.keyboard.createCursorKeys();                       
    }
    private cursors: Phaser.CursorKeys;
    
    private update() {
        var game = Game.instance;
        if (this.cursors.up.isDown) {
                game.camera.y -= 10;            
        }
        else if (this.cursors.down.isDown)
        {

                game.camera.y += 10;
        }

        if (this.cursors.left.isDown)
        {
            game.camera.x -= 10;
        }
        else if (this.cursors.right.isDown)
        {
            game.camera.x += 10;
        }  
    }
    
    private render() {
        var game = Game.instance;
	    game.debug.text(game.time.fps.toString(), 2, 14, "#00ff00");
    }
    
    public maxFood: number;
    public food: Array<Food>;
    public maxProgranisms : number;
    public progranisms : Array<Progranism>; 
    public sprites: Array<WalkingSprite>;
    
}
