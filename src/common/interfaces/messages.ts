/// <reference path="./geometry.ts"/>

interface IPathfinderTileProperties {    
    walkable: boolean;
    cost?: boolean;
}

interface IPathfinderFindPathArgs {
    start: IPoint;
    finish: IPoint;
}
interface IPathfinderMoveArgs {
    start: IPoint;
    finish: IPoint;
}

interface IPathfinderInitArgs{
    tiles: IPathfinderTileProperties[][];
    tileWidth:number;
    tileHeight:number;
}

interface IWorkerRequest {
    requestToken?: number;
    pathfinderInit?: IPathfinderInitArgs;
    pathfinderFindPath?: IPathfinderFindPathArgs;
    pathfinderOccupy?: IPoint;
    pathfinderVacate?: IPoint;
    pathfinderMove?: IPathfinderMoveArgs
}
interface IWorkerResponse {
    requestToken: number;
    pathfinderInit?: boolean;
    pathfinderFindPath?: IPoint[];
}