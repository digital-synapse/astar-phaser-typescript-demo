
class Game {

    constructor() {
        var winW = document.body.offsetWidth;
        var winH = document.body.offsetHeight;
        this.game = new Phaser.Game(winW,winH, Phaser.WEBGL, '', this);

        this.progranisms = new Array<Progranism>();
        this.maxProgranisms = 300;        
    }
        
    private game: Phaser.Game;
    
    private preload() {
        this.game.load.image('sphere', '../assets/sphere.png');
    }
    
    private create() {
        this.game.scale.setExactFit();
        this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        for (var i=0; i < this.maxProgranisms; i++){
            var p = new Progranism(this.game, 'sphere'); 
            this.progranisms.push(p);
        }
    }
    
    private update() {
       
    }
    
    
    public maxProgranisms : number;
    public progranisms : Array<Progranism>; 
   
}