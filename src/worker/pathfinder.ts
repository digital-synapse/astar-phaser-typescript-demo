/// <reference path="./pathfinder-node.ts"/>
/// <reference path="../common/classes/list.ts"/>
/// <reference path="../common/interfaces/geometry.ts"/>
/// <reference path="../common/interfaces/messages.ts"/>

class Pathfinder {
        
    constructor(params: IPathfinderInitArgs) {
        var tiles = params.tiles;
        this.nodeWidth = params.tileWidth;
        this.nodeHeight = params.tileHeight;
                
        this.nodes=[];
        var h = tiles.length;
        var w = tiles[0].length;
        this.rowWidth = w;        
        for (var y=0; y < h; y++){
            for (var x=0; x < w; x++){
                var tile = tiles[y][x];
                var node = new PathfinderNode(tile.walkable);
                this.nodes.push(node);                                
                node.position= {x:x, y:y},
                node.rect= {
                    x:x*this.nodeWidth, 
                    y:y*this.nodeHeight, 
                    width:this.nodeWidth, 
                    height:this.nodeHeight,
                    centerX:(x*this.nodeWidth)+(this.nodeWidth*0.5),
                    centerY:(y*this.nodeHeight)+(this.nodeHeight*0.5)
                }
            }            
        }
        for (var y=0; y < h; y++){
            for (var x=0; x < w; x++){
                
                var node = this.nodes[(y*w)+x];
                var adjacent:any={};
                if (y>0){
                    adjacent.nodeN = this.nodes[((y-1)*w)+x];                    
                    if (x < w-1){
                        adjacent.nodeNE = this.nodes[((y-1)*w)+(x+1)];    
                    }
                    if (x>0){
                        adjacent.nodeNW = this.nodes[((y-1)*w)+(x-1)];                        
                    }
                }
                if (x < w-1){
                    adjacent.nodeE = this.nodes[(y*w)+(x+1)];                    
                }
                if (x>0){
                    adjacent.nodeW  = this.nodes[(y*w)+(x-1)];                     
                }
                if (y < h-1){
                    adjacent.nodeS = this.nodes[((y+1)*w)+x];
                    
                    if (x < w-1){
                        adjacent.nodeSE = this.nodes[((y+1)*w)+(x+1)]; 
                    }
                    if (x>0){
                        adjacent.nodeSW = this.nodes[((y+1)*w)+(x-1)];                  
                    }                    
                }
                
                node.path = {
                    n: adjacent.nodeN,
                    s: adjacent.nodeS,
                    w: adjacent.nodeW,
                    e: adjacent.nodeE,
                    ne: adjacent.nodeNE,
                    se: adjacent.nodeSE,
                    sw: adjacent.nodeSW,
                    nw: adjacent.nodeNW
                }
                node.paths = [
                    {direction: Direction.N, node: node.path.n},
                    {direction: Direction.NE, node: node.path.ne},
                    {direction: Direction.E, node: node.path.e},
                    {direction: Direction.SE, node: node.path.se},
                    {direction: Direction.S, node: node.path.s},
                    {direction: Direction.SW, node: node.path.sw},
                    {direction: Direction.W, node: node.path.w},
                    {direction: Direction.NW, node: node.path.nw}
                ];
            }            
        }        
    }
           
    public occupy(point: IPoint){
       var node = this.findNodeAtPosition(point);
       if (node) node.occupied=true; 
    } 
    public vacate(point: IPoint){
       var node = this.findNodeAtPosition(point);
       if (node) node.occupied=false; 
    }     
    
    public move(start: IPoint, finish: IPoint){
        var startNode = this.findNodeAtPosition(start);
        var endNode = this.findNodeAtPosition(finish);
        if (startNode && endNode){
            startNode.occupied=false;
            endNode.occupied=true;
        }
    }
    public findPath(start: IPoint, finish: IPoint){
        var startNode = this.findNodeAtPosition(start);
        var endNode = this.findNodeAtPosition(finish);
        if (startNode && endNode){

            if (!endNode.walkable){
                endNode = this.findClosestNode(endNode);
            }
            startNode.occupied=false;

            var path = this.findPathAStar(startNode, endNode);            
            if (path){
                endNode.occupied=true;
                
                var result: Array<IPoint>=[];
                for (var i=0; i < path.length; i++){
                    var node = path[i];
                    var point: IPoint = {x:node.rect.centerX, y: node.rect.centerY};
                    result.push(point);
                }
                return result;
            }
        }
    }
    
    private margin:number = 6; // hardcoded yuck!
    private rowWidth:number;
    private nodeWidth:number;
    private nodeHeight:number;
    private nodes: Array<PathfinderNode>;    
    
    // these values include the margin
    private left: number;
    private top: number;
    private right: number;
    private bottom: number
    
    // should be way faster than searching through the whole list
    // for this to work the nodes collection cannot be reorderd
    private findNodeAtPosition(position: IPoint): PathfinderNode{
        if (position.x < this.left || position.y < this.top || 
            position.x >= this.right || position.y >= this.bottom)
            return undefined;      
        var x = position.x / this.nodeWidth;
        var y = position.y / this.nodeHeight;
        var ix = parseInt(x.toString());
        var iy = parseInt(y.toString());        
        return this.nodes[(iy*this.rowWidth)+ix];
    }
    
    private findPathAStar(startNode: PathfinderNode, endNode: PathfinderNode){
        if (!endNode.walkable || !startNode.walkable)
            return null; //End node and Start node must be walkable!
        
        var reachable= new List<PathfinderNode>();                
        var explored= new List<PathfinderNode>();
        reachable.add(startNode);
        startNode.previous=undefined; // make sure we stop here when we build the path
        startNode.cost=0;
        
        var node: PathfinderNode;
        while (reachable.length > 0){
            
            // choose some node we know how to reach
            node = this.chooseNode(reachable, endNode);
            
            // If we just got to the goal node, build and return the path
            if (node == endNode){             
                this.cleanup(reachable, explored);
                return this.buildPath(endNode);
            }
                
            // dont repeat ourselves
            reachable.remove(node);
            explored.add(node);
            node.explored=true; // speed opt. faster than searching the list
            
            // Where can we get from here that we havent explored before?
            for (var i=0; i < node.paths.length; i++){
                var adjacentNode = node.paths[i].node;
                if (!adjacentNode.explored && adjacentNode.walkable){
                    
                    //first time we see this node?
                    if (!adjacentNode.reachable){
                        reachable.add(adjacentNode);
                        adjacentNode.reachable=true;
                    }
                    
                    // If this is a new path, or a shorter path than what we have, keep it.
                    if (node.cost+1 < adjacentNode.cost){
                        adjacentNode.previous = node;
                        adjacentNode.cost = node.cost+1;
                    }
                }
            }
        }        
        //oops all done so we need to cleanup after ourselves
        this.cleanup(explored);
                 
        // If we got here, no path was found :(         
        return null;        
    }
    private cleanup(...lists:Array<List<PathfinderNode>>) {
        for (var i=0; i < lists.length; i++){
            var list = lists[i];
            var iterator= list.getIterator();
            while (iterator.hasMore()){
                var node = iterator.next();
                node.reset();
            };
        }
        
    }
    
    private buildPath(toNode: PathfinderNode): Array<PathfinderNode>{
        var path:Array<PathfinderNode>=[];
        while (toNode != undefined){
            path.push(toNode);
            toNode=toNode.previous;
        }
        return path;
    }
    private chooseNode(reachable: List<PathfinderNode>, goalNode:PathfinderNode): PathfinderNode {
        var minCost = Infinity;
        var bestNode:PathfinderNode=undefined;
        var context=this;
        
        var iterator= reachable.getIterator();
        var node: PathfinderNode;
        while (node = iterator.next()){
           var costStartToNode = node.cost;
           var costNodeToGoal = context.estimateCost(node,goalNode);
           var totalCost = costStartToNode + costNodeToGoal;
           
           if (minCost > totalCost){
               minCost = totalCost;
               bestNode = node;
           }                      
        }

        return bestNode;
    }
    private estimateCost(fromNode:PathfinderNode, toNode:PathfinderNode):number {
        var xdif = toNode.position.x - fromNode.position.x;
        var ydif = toNode.position.y - fromNode.position.y;
        var cost= Math.sqrt(Math.abs(xdif*2) + Math.abs(ydif*2));        
        return cost;
    }
    
    private findClosestNode(node: PathfinderNode){
        
        var nodes = new Array<PathfinderNode>();        
        var index=0;
        while (!node.walkable){
            for (var i=0; i < node.paths.length; i++){
                var n= node.paths[i].node;
                if (!n.explored){
                    n.explored=true;
                    nodes.push(n);
                }
            }
            node = nodes[index++];
        }
        // cleanup
        for (var i=0; i < nodes.length; i++){
            nodes[i].reset();
        }
        return node; // the closest walkable node
    }
}