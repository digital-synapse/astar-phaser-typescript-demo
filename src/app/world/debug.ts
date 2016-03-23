class Debug extends Phaser.Group {
    
    constructor(parentGroup: Phaser.Group){        
        var game = Game.instance;
        super(game);        
        
        this.graphics = game.add.graphics(5,5);        
        this.graphics.lineStyle(0);        
        this.graphics.beginFill(0x000000, 0.4);
        this.graphics.drawRect(0,0,100,50);
        this.graphics.endFill();                
        
        var style = { font: "bold 12px monospace", fill: "#ffffff", align: "left" };
        this.text = game.add.text(8, 6, 'Loading...', style); 
        this.text.lineSpacing = -5;
        
        this.add(this.graphics);
        this.add(this.text);
        this.fixedToCamera=true;
        //game.add.existing(this);
        parentGroup.add(this);
        this.parentGroup = parentGroup;
        this.str = [];                                                          
    }
    
    private parentGroup: Phaser.Group;
    private graphics: Phaser.Graphics;
    private text: Phaser.Text;
    private str: string[];
    
    public write( str:string ){
        this.str.push(str);
    }     
    
    public update() {
        var w =0, h=this.str.length;
        for (var i=0; i < h; i++){
            if (this.str[i].length > w) w=this.str[i].length;            
        }
        this.text.text=this.str.join('\n');
        this.graphics.height = h * 15;
        this.graphics.width = w * 8;
        this.str=[];
        this.parentGroup.bringToTop(this);
    }  
}