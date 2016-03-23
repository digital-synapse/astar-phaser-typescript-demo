/// <reference path="./world/pathfinder.ts"/>
/// <reference path="./world/walking-sprite.ts"/>

const NUM_SPRITES=300;

class Game {

    public static instance : Phaser.Game;
    
    constructor() {
        var winW = document.body.offsetWidth;
        var winH = document.body.offsetHeight;
        Game.instance = new Phaser.Game(winW,winH, Phaser.WEBGL, '', this);
        this.sprites = new Array<WalkingSprite>();                
    }

    private preload() {
        var load = Game.instance.load;      
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

        
        //this.pathfinder.create();
        this.pathfinder.create(()=>{
            for (var i=0; i < NUM_SPRITES; i++)
                this.sprites[i] = new WalkingSprite('sprites', (i % 39)*12, this.pathfinder);
            
            game.camera.follow(this.sprites[0]);    
        });
        
        world.inputEnabled=true;
        world.events.onInputDown.add(()=>{ game.camera.unfollow(); });       
        this.cursors=game.input.keyboard.createCursorKeys(); 
        
        var graphics = game.add.graphics(5,5);        
        graphics.lineStyle(0);        
        graphics.beginFill(0x000000, 0.4);
        graphics.drawRect(0,0,100,50);
        graphics.endFill();
        graphics.fixedToCamera=true;
        this.msgbox = graphics;
        
        var style = { font: "bold 12px monospace", fill: "#ffffff", align: "left" };
        this.debug = game.add.text(8, 6, 'Loading...', style); 
        this.debug.lineSpacing = -5;
        this.debug.fixedToCamera=true;              
    }
    private msgbox: Phaser.Graphics;
    private debug: Phaser.Text;
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
        
        
        this.debug.text= 
            'FPS: '+ game.time.fps.toString() +
             (game.camera.target ?
            '\n'+
            'PX:  ' + parseInt(game.camera.target.position.x.toString()) + '\n' +
            'PY:  ' + parseInt(game.camera.target.position.y.toString())
            : '');
            
        this.msgbox.height = this.debug.text.split('\n').length * 15;
    }
        
    public sprites: Array<WalkingSprite>;
    
}
