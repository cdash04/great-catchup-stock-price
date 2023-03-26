import { Construct } from "constructs";
import { BaseLambda } from "../lambda/base-lambda";
import { PriceGameWorkerLambda } from "../lambda";
import { Rule, Schedule } from "aws-cdk-lib/aws-events";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import { IFunction } from "aws-cdk-lib/aws-lambda";

export class CronEventStack extends Construct {
  readonly handlers: Record<string, BaseLambda> = {};
  readonly rules: Record<string, Rule> = {};

  constructor(scope: Construct, id: string, dynamoDbTableName: string = "") {
    super(scope, id);

    this.handlers.priceGameWorkerLambda = new PriceGameWorkerLambda(
      this,
      "price-game-worker-lambda",
      dynamoDbTableName,
    );

    this.rules.priceGameWorkerRule = new Rule(this, "price-game-worker-rule", {
      schedule: Schedule.expression("rate(12 hours)"),
    });

    this.rules.priceGameWorkerRule.addTarget(new LambdaFunction(this.handlers.priceGameWorkerLambda.handler));
  }

  get handlerList(): IFunction[] {
    return Object.values(this.handlers).map((value) => value.handler);
  }
}
