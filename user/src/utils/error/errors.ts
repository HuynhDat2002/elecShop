import { Status_Codes } from "./statusCodes";

class BaseError extends Error{
    public readonly message: string;
    public readonly status: number;
    public readonly name:string;

    constructor(name:string,status:number,description:string){
        super(description);
        this.name=name;
        this.status=status;
        this.message=description;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}

//500 internal error
export class APIError extends BaseError{
    constructor(description="api error"){
        super(
            'api internal server error',
            Status_Codes.INTERNAL_SERVER_ERROR,
            description
        );
    }
}

//400 validation error
export class ValidationError extends BaseError{
    constructor(description="bad request"){
        super(
            'bad request',
            Status_Codes.BAD_REQUEST,
            description
        );
    }
}

//401 authorize error
export class AuthorizeError extends BaseError{
    constructor(description="access denied"){
        super(
            'access denied',
            Status_Codes.UNAUTHORIZED,
            description
        );
    }
}

//403 forbidden error
export class ForbiddenError extends BaseError{
    constructor(description="forbidden error"){
        super(
            'forbidden error',
            Status_Codes.FORBIDDEN,
            description
        );
    }
}

//404 notfound error
export class NotFound extends BaseError{
    constructor(description="not found"){
        super(
            'not found',
            Status_Codes.NOT_FOUND,
            description
        );
    }
}