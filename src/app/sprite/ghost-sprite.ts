
class GhostSprite extends Phaser.Sprite{
    
    constructor(game: Phaser.Game, x:number, y:number, imageKey: string, maxTrailSize:number=20, maxAlpha:number=1){
        var palette = 
            [0xFFEF5B,0xFFEA59,0xFED74B,0xFFC73A,
            0xFFB133, 0xFF9E21,0xFE8A0F, 0xFE760A,
            0xFF6100, 0xDE5300, 0xBD4900,0x953800,
            0x7C3000, 0x5A2400, 0x381900, 0x190800 ];
        
        super(game, x, y,imageKey);
        this.scale = new Phaser.Point(0.5, 0.5);
        this.tint = palette[0];
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
            //sprite.tint = this.tint;
            sprite.tint = palette[i+1];
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