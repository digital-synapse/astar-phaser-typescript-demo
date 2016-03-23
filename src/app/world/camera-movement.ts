class CameraMovement extends Phaser.Group {
    
    constructor() {
        var game = Game.instance;
        super(game);
        this.cursors=game.input.keyboard.createCursorKeys(); 
    }
    
    public update() {
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
    private cursors: Phaser.CursorKeys;
}