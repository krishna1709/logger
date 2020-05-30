import { UserTradeController } from "../controllers/user-trade-controller";
import { ResponseInterceptor } from "../util/response-interceptor";

export class RoutingComponents extends ResponseInterceptor {
    userTradeController: UserTradeController;

    constructor() {
        super();
        this.userTradeController = new UserTradeController();
    }

    // page not found.  
    pageNotFound(req, res, next) {
        this.sendErrorResponse(res, {message: "URL does not exist with given method"});
    }

    //create user trade
    createUserTrade(req, res, next) {
        this.userTradeController.createUserTrade(req, res, next);
    }

    //get trade list
    getUserTrade(req, res, next){
        this.userTradeController.getUserTrade(req, res, next);
    }

    //get trade list by userId
    getUserTradeByUserID(req, res, next){
        this.userTradeController.getUserTradeByUserID(req, res, next);
    }

    //get trade list by stockSymbol and trade type
    getUserTradeByStockSymbol(req, res, next){
        this.userTradeController.getUserTradeByStockSymbol(req, res, next);
    }

    //get highest and lowest stock price 
    getHighestAndLowestPriceStock(req, res, next){
        this.userTradeController.getHighestAndLowestPriceStock(req, res, next);
    }

    // delete trade list
    deleteUserTrade(req, res, next){
        this.userTradeController.deleteUserTrade(req, res, next);   
    }
}