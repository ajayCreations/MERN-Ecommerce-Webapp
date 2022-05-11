//class ErrorHandler inheridet from node default class Error. 
//super is a constructor of Error (inherited)

class ErrorHandler extends Error {
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode

        Error.captureStackTrace(this,this.constructor)
    }
}

module.exports= ErrorHandler  


