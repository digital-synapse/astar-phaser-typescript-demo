/// <reference path="./world/pathfinder.ts"/>
/// <reference path="./world/walking-sprite.ts"/>
/// <reference path="./world/debug.ts"/>
/// <reference path="./world/camera-movement.ts"/>
/// <reference path="./world/world.ts"/>

const NUM_SPRITES=300;

class Game {

    public static instance : Phaser.Game;
    
    constructor() {
        var winW = document.body.offsetWidth;
        var winH = document.body.offsetHeight;
        Game.instance = new Phaser.Game(winW,winH, Phaser.WEBGL, '', this);        
    }

    private preload() {
        var load = Game.instance.load;      
        load.image('world_tiles', '../assets/world1.png')
        this.pathfinder = new Pathfinder('../assets/world1.json');   
        load.spritesheet('sprites', '../assets/sprites.png',32,32);   
    } 
    
    private create() {
        var game = Game.instance;                              
        this.world = new World();
        var group = game.add.group();
        this.debug = new Debug(group);
        this.camera = new CameraMovement(); 
                
        this.pathfinder.create(()=>{
            
            for (var i=0; i < NUM_SPRITES; i++){
                var sprite = new WalkingSprite('sprites', (i % 39)*12, this.pathfinder);
                group.add(sprite);
                if (i===0) game.camera.follow(sprite);  
            }
              
        });
    }
        
    private update() {
        var game = Game.instance;
        
        this.debug.write('FPS: '+ game.time.fps.toString());        
        if (game.camera.target){
            this.debug.write('PX:  ' + parseInt(game.camera.target.position.x.toString()));
            this.debug.write('PY:  ' + parseInt(game.camera.target.position.y.toString()));
        }
    }
    
    private world: World;
    private pathfinder: Pathfinder;      
    private debug: Debug;
    private camera: CameraMovement;        
}
