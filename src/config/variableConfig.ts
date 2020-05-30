import { ResponseInterceptor } from "../util/response-interceptor";
const responseInterceptor = new ResponseInterceptor();


export const variableConfig = {
    internalError: {
        http_code: responseInterceptor.INTERNAL_ERROR,
        message: "Interna error"
    },
};