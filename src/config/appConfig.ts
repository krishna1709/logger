const dotenv = require("dotenv");
dotenv.config();
import { SECRET_KEY } from "../util/secrets";

const SERVER_PORT = Number(process.env["SERVER_PORT"]) || 3000;

export const appConfig= {
    "version": "1.0.0",
    "appName": "typescript-node-starter",
    "server": {
        "port": SERVER_PORT
    },
    "security": {
        "jwt": {
            "secretKey": SECRET_KEY,
            "expiryTime": "30d"
        }
    }
};