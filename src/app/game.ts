/// <reference path="./world/pathfinder.ts"/>
/// <reference path="./world/walking-sprite.ts"/>
/// <reference path="./world/debug.ts"/>
/// <reference path="./world/camera-movement.ts"/>
/// <reference path="./world/world.ts"/>
/// <reference path="./input/rectangle-select.ts"/>
/// <reference path="./input/camera-scroll.ts"/>

const NUM_SPRITES=300;

class Game {    
    public static start() { new Game(); }
    
    constructor() {
        var winW = document.body.offsetWidth;
        var winH = document.body.offsetHeight;
        this.game = new Phaser.Game(winW,winH, Phaser.WEBGL, '', this);        
    }
    private game: Phaser.Game;
    
    private preload() {              
        this.game.load.image('world_tiles', '../assets/world1.png')
        this.pathfinder = new Pathfinder(this.game,'../assets/world1.json');   
        this.game.load.spritesheet('sprites', '../assets/sprites.png',32,32);   
    } 
    
    private create() {    
        // prevent browser context menu on right click
        this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); } 
                               
        this.world = new World(this.game);        
        this.debug = new Debug(this.world);
        this.camera = new CameraMovement(this.game); 
        this.rectSelect = new RectangleSelect(this.game);   
        this.cameraScroll = new CameraScroll(this.game);
        this.sprites = [];
           
        this.pathfinder.create(()=>{
            
            for (var i=0; i < NUM_SPRITES; i++){
                var sprite = new WalkingSprite(this.game, 'sprites', (i % 39)*12, this.pathfinder);
                this.sprites.push(sprite);
                this.world.add(sprite);
                if (i===0) this.game.camera.follow(sprite);  
            }
              
        });
        
        this.rectSelect.select((x1,y1,x2,y2)=>{
            for (var i=0; i < NUM_SPRITES; i++){
                var sprite = this.sprites[i];
                sprite.selected=
                    (sprite.position.x-this.game.camera.x >=x1 &&
                    sprite.position.y-this.game.camera.y >=y1 &&
                    sprite.position.x-this.game.camera.x <=x2 &&
                    sprite.position.y-this.game.camera.y <=y2);       
                if (sprite.selected)
                    sprite.stop();      
            }
        });    
        
        var ptr = this.game.input;
        ptr.activePointer.leftButton.onUp.add((x:number, y:number)=>{
            for (var i=0; i < NUM_SPRITES; i++){
                var sprite = this.sprites[i];
                if (sprite.selected){
                    sprite.walkTo(new Phaser.Point(ptr.worldX,ptr.worldY))
                }             
            }
            
        },this,0);        
    }
        
    private update() {
        this.debug.write('FPS: '+ this.game.time.fps.toString());        
        if (this.game.camera.target){
            this.debug.write('PX:  ' + parseInt(this.game.camera.target.position.x.toString()));
            this.debug.write('PY:  ' + parseInt(this.game.camera.target.position.y.toString()));
        }
        this.debug.write('CX:  ' + parseInt(this.game.camera.x.toString()));
        this.debug.write('CY:  ' + parseInt(this.game.camera.y.toString()));
    }   
    
    private sprites: WalkingSprite[];
    private world: World;
    private pathfinder: Pathfinder;      
    private debug: Debug;
    private camera: CameraMovement;
    private rectSelect: RectangleSelect;
    private cameraScroll: CameraScroll;
}

