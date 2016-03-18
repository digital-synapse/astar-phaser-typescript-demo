class StateFlags {  
    
    private _state:number = 0;
    
    public get current() { return this._state; }
    public contains( state: number){
        return (this._state & state) !== 0;
    }
    public any( ...states:number[] ){
        for (var i=0; i < states.length; i++){
            var state = states[i];
            if (this.contains(state)) return true;
        }
        return false;
    }
    public all( ...states:number[] ){
        for (var i=0; i < states.length; i++){
            var state = states[i];
            if (!this.contains(state)) return false;
        }
        return true;
    }    
    public add ( ...states:number[]){
        for (var i=0; i < states.length; i++){
            var state = states[i];
            this._state |= state;
        }
    }
    public remove ( ...states:number[]){
        for (var i=0; i < states.length; i++){
            var state = states[i];        
            this._state &= ~state;
        }
    }
    public clear(){
        this._state = 0;
    }
}