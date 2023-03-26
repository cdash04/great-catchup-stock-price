import { Table, ITable, AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { IGrantable, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class DynamoDbStack extends Construct {
  readonly table: ITable;

  readonly accessTablePolicy: PolicyStatement;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.table = new Table(this, 'price-game-table', {
      partitionKey: { name: 'pk', type: AttributeType.STRING },
      sortKey: { name: 'sk', type: AttributeType.STRING },
    });
  }

  grantReadWriteAccess(grantees: IGrantable[]) {
    grantees.forEach((grantee) => this.table?.grantReadWriteData(grantee));
  }
}
