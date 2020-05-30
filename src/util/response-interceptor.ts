import { appConfig } from "../config/appConfig";


export class ResponseInterceptor {
    RESPONSE_SUCCESS = 200;
    BAD_REQUEST = 400;
    UNAUTHORIZED_ACCESS= 401;
    RECORD_NOT_FOUND = 404;
    METHOD_NOT_ALLOWED = 405;
    UNSUPPORTED_MEDIA = 415;
    BAD_GATEWAY = 502;
    INTERNAL_ERROR = 500;
    
    sendSuccess(res, message?:string, data?:any) {
        const responseData = {
            status: "pass",
            ver: appConfig.version,
        };
        if(message && message != ""){
            responseData["message"]=message;
        }
        if(data && data != ""){
            responseData["data"]=data;
        }
        res.status(this.RESPONSE_SUCCESS).send(responseData);
    }

    sendErrorResponse(res, error_obj) {
        const http_code = error_obj.http_code || this.BAD_REQUEST;
        const responseData = {
            status: "fail",
            ver: appConfig.version,
        };
        if(error_obj.message && error_obj.message != ""){
            responseData["message"]=error_obj.message;
        }
        res.status(http_code).send(responseData);
    }
}
