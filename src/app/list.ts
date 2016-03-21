/// <reference path="./exceptions.ts"/>

// a quick and dirty linked list
// note this is map based, so the same object cant be added to the list twice
class List<T extends IHashCode> {
    
    constructor (){
       this.counter=0; 
       this.map={};
    }        
    private map: any;
    private counter:number;
    
    public get length() {
        return this.counter;
    }
    
    public getIterator(){
        var keys=Object.keys(this.map);
        var i=0;
        var len = keys.length;
        var ctx=this;
        return { 
            hasMore: ():boolean =>{
               return (i < len); 
            },
            next: ():T =>{
                if (i < len){
                    return ctx.map[keys[i++]].data;
                }
            }
        };
    }
    
    public add( item: T ){
        if (!item) 
            throw new NullReferenceException();
        
        var node=new ListNode<T>();
        node.data = item;
        node.hashCode = item.getHashCode()
        if (!this.map[node.hashCode]) this.counter++;
        this.map[node.hashCode] = node;                                       
    }
    
    public remove( item: T ){
        if (!item || this.counter==0) return;
            //throw new NullReferenceException('item passed to List.remove was not defined!')
        var hashCode = item.getHashCode();
        if (this.map[hashCode]){
            delete this.map[hashCode];
            this.counter--;
        }
    }
}

class ListNode<T> {
    
    public hashCode: number;
    public data: T;
    
}

interface IHashCode {
    getHashCode: ()=>number;
}