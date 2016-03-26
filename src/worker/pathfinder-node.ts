/// <reference path="../common/classes/list.ts"/>
/// <reference path="../common/interfaces/geometry.ts"/>

class PathfinderNode implements IHashCode {
    
    constructor(walkable: boolean) {
        this.reset();
        this._walkable = walkable;
    }
    private _walkable:boolean;
    public get walkable(){return this._walkable && !this.occupied};
    public occupied: boolean;
    public town: boolean;
    public port: boolean;
    public dungeon: boolean;
    public rect: IRectangle;
    /// node (tile) position
    public position: IPoint; 
    public path: IPathfinderNodePaths;
    public paths: Array<IPathfinderNodePath>;
        
    public reachable: boolean;
    public explored: boolean;
    public cost: number;
    public previous: PathfinderNode;
    
    public reset() {
        this.reachable=false;
        this.explored=false;
        this.cost= Infinity;
    }
    public getHashCode(): number {
        return this.position.x + (this.position.y * 10000);
    }
}

interface IPathfinderNodePaths {
    n?: PathfinderNode,
    ne?: PathfinderNode,
    e?: PathfinderNode,
    se?: PathfinderNode,
    s?: PathfinderNode,
    sw?: PathfinderNode,
    w?: PathfinderNode,
    nw?: PathfinderNode
}

interface IPathfinderNodePath {
    direction: Direction,
    node: PathfinderNode;
}

enum Direction {
    None, N, NE, E, SE, S, SW, W, NW
}