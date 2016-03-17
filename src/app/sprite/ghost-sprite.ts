
class GhostSprite extends Phaser.Sprite{
    
    constructor(game: Phaser.Game, x:number, y:number, imageKey: string, maxTrailSize:number=20, maxAlpha:number=1){
        super(game, x, y,imageKey);
        this.scale = new Phaser.Point(0.5, 0.5);
        //this.tint = 0xFF0000;
        this.alpha = maxAlpha;        
        game.add.existing(this);
        game.physics.arcade.enable(this);
        
        this.trail = new Array<Phaser.Sprite>();
        this.maxTrailLength = maxTrailSize;
        var alphaStep = (this.alpha*0.5) / this.maxTrailLength;
        for (var i=0; i < this.maxTrailLength; i++){
            var sprite = new Phaser.Sprite(game,x,y,imageKey);
            var thisStep = (alphaStep*(i+1));
            sprite.scale = new Phaser.Point(0.5-thisStep, 0.5-thisStep);
            sprite.tint = this.tint;
            sprite.alpha = this.alpha - thisStep;
            sprite.physicsEnabled=false;
            game.add.existing(sprite);
            this.trail.push(sprite);
        }        
        
        this.positionHistory = new Array<Phaser.Point>();
    }
    
    public update(){
        this.positionHistory = [new Phaser.Point(this.position.x, this.position.y)].concat(this.positionHistory);
        if (this.positionHistory.length > this.maxTrailLength)
            this.positionHistory.pop();            
            
        for (var i = 0; i < this.positionHistory.length; i++){
            this.trail[i].position = this.positionHistory[i];
        }
    }
    
    private maxTrailLength: number;
    private positionHistory: Array<Phaser.Point>;
    private trail: Array<Phaser.Sprite>;
}