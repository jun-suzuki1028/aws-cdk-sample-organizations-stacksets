import { CfnStackSet,Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as fs from 'fs'
import * as path from 'path'

export class StacksetsTestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //指定したパスのYAMLファイルをStringに変換
    const templateFilePath = path.resolve(__dirname, `../template/CustomGuardrailsStack.yaml`)
    const templateToString = fs.readFileSync(templateFilePath).toString()

    //スタックを展開するリージョンを指定
    const regions =  ["ap-northeast-1"]
    //スタックを展開するOUを指定 (r-xxx or ou-xxxxx-xxxxxxxx)
    const organizationalUnitIds =  ["oou-xxxxx-xxxxxxxx"]

    new CfnStackSet(this, 'S3StackSet', {
      stackSetName: `S3StackSet`,
      permissionModel: 'SERVICE_MANAGED',
      capabilities: ['CAPABILITY_NAMED_IAM'],
      autoDeployment: {
        enabled: true,
        retainStacksOnAccountRemoval: false
      },
      stackInstancesGroup: [
        {
          regions: regions,
          deploymentTargets: {
            organizationalUnitIds: organizationalUnitIds,
          },
        },
      ],
      //callAs:"DELEGATED_ADMIN",委任先から実行する場合はコメントアウトを外す
      templateBody: templateToString
    })
  }
  }