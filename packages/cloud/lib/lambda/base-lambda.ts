import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, IFunction, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class BaseLambda extends Construct {
  readonly lambdaCodeDirectory = 'app/handler';

  readonly handler: IFunction;

  constructor(
    name: string,
    file: string,
    scope: Construct,
    id: string,
    options: Omit<NodejsFunctionProps, 'runtime' | 'entry'> = {},
  ) {
    super(scope, id);

    this.handler = new NodejsFunction(this, `${name}-handler`, {
      runtime: Runtime.NODEJS_16_X,
      entry: `${this.lambdaCodeDirectory}/${file}.ts`,
      ...options,
      environment: {
        ...options.environment,
      },
    });
  }

  addPolicy(policy: PolicyStatement) {
    this.handler.addToRolePolicy(policy);
  }
}
