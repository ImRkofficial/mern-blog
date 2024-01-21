class ApiError extends Error{
    constructor(
        statusCode,
        message="Internal server error",
        errors=[]
    ){
        super(message)
        this.statusCode =statusCode,
        this.message =message,
        this.data =null,
        this.errors =errors,
        this.success =false
    }
}

export {ApiError}