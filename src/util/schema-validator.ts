import { ResponseInterceptor } from "../util/response-interceptor";
const Joi = require("@hapi/joi");
const logger = require("../util/logger");

export class SchemaValidator extends ResponseInterceptor {
    constructor() {
        super();
    }
    async validateBodyPayload(schema, req, res, next) {
        try{
            const value = await schema.validateAsync(req.body, { abortEarly: false });
            logger.info("Payload Validation is Successfull");
            req.body = value;
            next();
        } catch(error){
            let str = "";
            if (error.details) {
                for (const err of error.details) {
                    str += " [ "+err.path.join(" > ") + err.message.slice(err.message.lastIndexOf("\"") + 1) + " ] ";
                }
                this.sendErrorResponse(res, { errorCode: "InvalidRequest", txnid: req.body.txnid, errorMessage: str });
            } else {
                this.sendErrorResponse(res, { errorCode: "InvalidRequest", txnid: req.body.txnid, errorMessage: "Request had invalid payload or bad request." });
            }

        }
    }
}