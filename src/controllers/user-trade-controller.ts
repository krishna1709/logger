import { ResponseInterceptor } from "../util/response-interceptor";
import { UserTradeModel } from "../models/user-trade-model";
import { variableConfig } from "../config/variableConfig";
const logger = require("../util/logger");
const moment = require("moment");


export class UserTradeController extends ResponseInterceptor {
    constructor() {
        super();
    }

    async createUserTrade(req, res, next) {

        try {
            const userTradeData = await UserTradeModel.find({ id: req.body.id });
            if (userTradeData.length > 0) {
                return this.sendErrorResponse(res, { message: "trade id already exist" });
            }
            // attach id in document
            const tradedata = req.body;
            tradedata["user"]["id"] = req.body.id;
            tradedata["timestamp"] = moment().format("YYYY-MM-DD HH:mm:ss");
            // insert data in mongo
            const tradeData = await UserTradeModel(tradedata).save();
            logger.info(`Data successfully inserted ${tradeData}`);
            //sending response to client
            return this.sendSuccess(res, "Data successfully inserted", tradeData);
        }
        catch (error) {
            logger.error(`error during insert user trade: ${error}`);
            return this.sendErrorResponse(res, variableConfig.internalError);
        }
    }

    async getUserTrade(req, res, next) {
        try {
            //fetching data from mongo db
            const userTradedata = await UserTradeModel.find({}, { _id: 0 }).sort({ id: 1 });
            logger.info("All data fetched successfully");
            const message = userTradedata.length > 0 ? "Data found" : "No data found";
            //sending response to client
            return this.sendSuccess(res, message, userTradedata);
        }
        catch (error) {
            logger.error(`error during get user trade list: ${error}`);
            return this.sendErrorResponse(res, variableConfig.internalError);
        }
    }

    async getUserTradeByUserID(req, res, next) {
        try {
            //fetching data from mongo db
            const userTradedata = await UserTradeModel.find({ "user.id": req.params.userID }, { _id: 0 });
            if (userTradedata.length == 0) {
                return this.sendErrorResponse(res, { http_code: this.RECORD_NOT_FOUND, message: "No data found" });
            }
            logger.info("data fetched successfully");
            //sending response to client
            return this.sendSuccess(res, "Data found", userTradedata[0]);
        }
        catch (error) {
            logger.error(`error during get user trade list: ${error}`);
            return this.sendErrorResponse(res, variableConfig.internalError);
        }
    }

    async getUserTradeByStockSymbol(req, res, next) {
        try {
            //fetching data from mongo db
            const userTradedata = await UserTradeModel.find({ "symbol": req.params.stockSymbol, "type": req.query.type, "timestamp": { $gte: req.query.start, $lte: req.query.end } }, { _id: 0 });
            if (userTradedata.length == 0) {
                return this.sendErrorResponse(res, { http_code: this.RECORD_NOT_FOUND, message: "No data found" });
            }
            logger.info("data fetched successfully");
            //sending response to client
            return this.sendSuccess(res, "Data found", userTradedata);
        }
        catch (error) {
            logger.error(`error during get user trade list: ${error}`);
            return this.sendErrorResponse(res, variableConfig.internalError);
        }
    }

    async getHighestAndLowestPriceStock(req, res, next) {
        try {
            //fetching data from mongo db
            const maxTradeData = await UserTradeModel.find({ "symbol": req.params.stockSymbol, "timestamp": { $gte: req.query.start, $lte: req.query.end } }, { _id: 0 }).sort({ price: -1 }).limit(1); //max
            const minTradedata = await UserTradeModel.find({ "symbol": req.params.stockSymbol, "timestamp": { $gte: req.query.start, $lte: req.query.end } }, { _id: 0 }).sort({ price: +1 }).limit(1); //min

            if (maxTradeData.length == 0 && minTradedata.length == 0) {
                return this.sendErrorResponse(res, { http_code: this.RECORD_NOT_FOUND, message: "No data found" });
            }
            logger.info("data fetched successfully");
            //sending response to client
            const responseData = {
                symbol: req.params.stockSymbol,
                highest: maxTradeData[0]["price"],
                lowest: minTradedata[0]["price"]
            };
            return this.sendSuccess(res, "Data found", responseData);
        }
        catch (error) {
            logger.error(`error during get user trade list: ${error}`);
            return this.sendErrorResponse(res, variableConfig.internalError);
        }
    }

    async deleteUserTrade(req, res, next) {
        try {
            //deleting all data from mongo db
            await UserTradeModel.deleteMany({});
            logger.info("All data deleted successfully");
            //sending response to client
            return this.sendSuccess(res, "All data deleted successfully");
        }
        catch (error) {
            logger.error(`error during delete user trade list: ${error}`);
            return this.sendErrorResponse(res, variableConfig.internalError);
        }
    }
}