// global
var game:Phaser.Game;

class Game {

    constructor() {
        var winW = document.body.offsetWidth;
        var winH = document.body.offsetHeight;
        game = new Phaser.Game(winW,winH, Phaser.WEBGL, '', this);

        this.progranisms = new Array<Progranism>();
        this.maxProgranisms = 300;        
    }
        
    //private game: Phaser.Game;
    
    private preload() {
        game.load.image('progranism', '../assets/sphere.png');
    }
    
    private create() {
        game.scale.setExactFit();
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        for (var i=0; i < this.maxProgranisms; i++){
            var p = new Progranism(); 
            this.progranisms.push(p);
        }
    }
    
    private update() {
       
    }
    
    
    public maxProgranisms : number;
    public progranisms : Array<Progranism>; 
   
}