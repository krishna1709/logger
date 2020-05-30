import { ResponseInterceptor } from "../util/response-interceptor";
import * as jwt from "jsonwebtoken";
import { appConfig } from "../config/appConfig";
const logger = require("../util/logger");

export class AuthValidator extends ResponseInterceptor {
    constructor() {
        super();
    }
    authenticationCreate(req, res) {
        if (req.body.accessKey == appConfig.security.jwt.secretKey && req.body.accessKey) {
            const authtoken = jwt.sign({}, req.body.accessKey, { expiresIn: appConfig.security.jwt.expiryTime });
            logger.info("successfully passed token");
            res.status(200).send({ "status": "pass", "ver": appConfig.version, "access_token": authtoken });
        } else {
            logger.error("invalid access key");
            return this.sendErrorResponse(res, { message: "Invalid access key" });
        }
    }

    async authenticationCheck(req, res, next) {
        try {
            const token = req.get("access_token");
            jwt.verify(token, appConfig.security.jwt.secretKey);
            logger.info("token successfully veified");
            next();
        } catch (err) {
            // err
            logger.error(`error during jwt token validation ${err}`);
            return this.sendErrorResponse(res, { "http_code": this.UNAUTHORIZED_ACCESS, "message": "Unauthorized access" });
        }
    }

}