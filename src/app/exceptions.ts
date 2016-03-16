
class Exception implements Error{
    public name: string;
    public message: string;
    constructor(message?: string){
        this.name = 'Exception';
        this.message = message;
    };
}
class ArgumentException extends Error {
    public name:string = 'ArgumentException';
}