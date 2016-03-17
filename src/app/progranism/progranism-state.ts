/// <reference path="../state-flags.ts"/>

class ProgranismState extends StateFlags {
    
    public static get IDLE() {return 1 << 0; }
    public static get WALKING(){ return 1 << 1; }
    public static get THINKING(){ return 1 << 2; }
    public static get HUNTING(){ return 1 << 3; }
    public static get GATHERING(){ return 1 << 4; }
    public static get MATING(){ return 1 << 5; }
    public static get SLEEPING(){ return 1 << 6; }
    public static get EATING(){ return 1 << 7; }    
    public static get ATTACKING(){ return 1 << 8; }
        
}