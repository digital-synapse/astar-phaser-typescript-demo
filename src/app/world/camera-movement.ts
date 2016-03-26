class CameraMovement extends Phaser.Group {
    
    constructor(game: Phaser.Game) {
        super(game);
        this.cursors=game.input.keyboard.createCursorKeys(); 
    }
    
    public update() {
        if (this.cursors.up.isDown) {
            this.game.camera.y -= 10;            
        }
        else if (this.cursors.down.isDown)
        {
            this.game.camera.y += 10;
        }

        if (this.cursors.left.isDown)
        {
            this.game.camera.x -= 10;
        }
        else if (this.cursors.right.isDown)
        {
            this.game.camera.x += 10;
        }          
    }
    private cursors: Phaser.CursorKeys;
}