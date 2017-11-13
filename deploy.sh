# deploy DB
aws cloudformation package --template-file template-dynamodb.yml --output-template-file out-template-dynamodb.yml --s3-bucket sms-hello-deploy
aws cloudformation deploy --template-file out-template-dynamodb.yml --stack-name aly-sms-dynamodb
rm out-template-dynamodb.yml

# Lambda + API
aws cloudformation package --template-file template-api.yml --output-template-file out-template-api.yml --s3-bucket sms-hello-deploy
aws cloudformation deploy --template-file out-template-api.yml --stack-name aly-sms --parameter-overrides DynamoDBStack=aly-sms-dynamodb --capabilities CAPABILITY_IAM
rm out-template-api.yml
