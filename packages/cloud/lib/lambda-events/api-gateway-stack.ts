/* eslint-disable class-methods-use-this */
import {
  Cors,
    LambdaIntegration,
    Resource,
    RestApi
  } from 'aws-cdk-lib/aws-apigateway';
  import { IFunction } from 'aws-cdk-lib/aws-lambda';
  import { Construct } from 'constructs';
  import {
    GamePriceLambda
  } from '../lambda';
  import { BaseLambda } from '../lambda/base-lambda';
  
  export class ApiGatewayStack extends Construct {
    private readonly api: RestApi;
  
    readonly handlers: Record<string, BaseLambda> = {};
  
    readonly integrations: Record<string, LambdaIntegration> = {};
  
    readonly routes: Record<string, Resource> = {};
  
    constructor(scope: Construct, id: string,  dynamoDbTableName: string = "") {
      super(scope, id);
      this.api = new RestApi(this, 'api-gateway-stack', {
        restApiName: 'Great Catchup Stock Price API',
        defaultCorsPreflightOptions: {
          allowHeaders: [
            'Content-Type',
            'X-Amz-Date',
            'Authorization',
            'X-Api-Key',
          ],
          allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
          allowOrigins: Cors.ALL_ORIGINS,
        },
      });
  
      // lambdas
      this.handlers.gamePriceLambda = new GamePriceLambda(this, 'price-game-lambda', dynamoDbTableName);
  
      // integrations
      this.integrations.gamePriceIntegration = this.getLambdaIntegration(
        this.handlers.gamePriceLambda.handler,
      );
  
      // routes
      this.routes.gamePriceRoute = this.api.root.addResource('game-price');
  
      // base route access
      this.routes.gamePriceRoute.addMethod('ANY', this.integrations.gamePriceIntegration);

      // proxy
      this.routes.gamePriceRoute.addProxy({
        defaultIntegration: this.integrations.gamePriceIntegration,
      });
    }
  
    get handlerList(): IFunction[] {
      return Object.values(this.handlers).map((value) => value.handler);
    }
  
    private getLambdaIntegration = (handler: IFunction) =>
      new LambdaIntegration(handler, {
        requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
      });
  }
  