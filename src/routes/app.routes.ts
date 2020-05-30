import { RoutingComponents } from "./routing-components";
import { userTradeSchema } from "../payload-schema/user-trade-schema";
import { SchemaValidator } from "../util/schema-validator";
import { AuthValidator } from "../util/auth-validator";


export class AppRoutes {
  AppGetRoutes: any[];
  AppPostRoutes: any[];
  AppUpdateRoutes: any[];
  AppDeleteRoutes: any[];

  constructor() {
    const routingComponents: RoutingComponents = new RoutingComponents();
    const schemaValidator: SchemaValidator = new SchemaValidator();
    const authValidator: AuthValidator = new AuthValidator();

    /**
    * GET Data APIs list
    */
    this.AppGetRoutes = [
      {
        path: "/trades/users/:userID",
        component: [
          authValidator.authenticationCheck.bind(routingComponents),
          routingComponents.getUserTradeByUserID.bind(routingComponents)
        ]
      },
      {
        path: "/trades",
        component: [
          authValidator.authenticationCheck.bind(routingComponents),
          routingComponents.getUserTrade.bind(routingComponents)
        ]
      },
      {
        path: "/stocks/:stockSymbol/trades",
        component: [
          authValidator.authenticationCheck.bind(routingComponents),
          routingComponents.getUserTradeByStockSymbol.bind(routingComponents)
        ]
      },
      {
        path: "/stocks/:stockSymbol/price",
        component: [
          authValidator.authenticationCheck.bind(routingComponents),
          routingComponents.getHighestAndLowestPriceStock.bind(routingComponents)
        ]
      },
      // If url doesnot exist
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      }
    ];

    /**
    * POST APIs list
    */
    this.AppPostRoutes = [
      {
        path: "/auth/token",
        component: [
          authValidator.authenticationCreate.bind(routingComponents),
        ]
      },
      {
        path: "/trades",
        component: [
          authValidator.authenticationCheck.bind(routingComponents),
          schemaValidator.validateBodyPayload.bind(schemaValidator, userTradeSchema),
          routingComponents.createUserTrade.bind(routingComponents)
        ]
      },
      // If url doesnot exist
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      }
    ];

    /**
     * Update APIs list
     */
    this.AppUpdateRoutes = [
      // If url doesnot exist
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      }
    ];

    /**
     * Deleting APIs list
     */
    this.AppDeleteRoutes = [
      {
        path: "/trades",
        component: [
          authValidator.authenticationCheck.bind(routingComponents),
          routingComponents.deleteUserTrade.bind(routingComponents)
        ]
      },
      // If url doesnot exist
      {
        path: "*",
        component: [
          routingComponents.pageNotFound.bind(routingComponents)
        ]
      }
    ];
  }

}