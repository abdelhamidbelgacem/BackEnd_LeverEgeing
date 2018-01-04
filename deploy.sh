#@author :abdelhamid.belgacem


# deploy DB
aws cloudformation package --template-file template-dynamodb.yml --output-template-file out-template-dynamodb.yml --s3-bucket feed-hello-deploy
aws cloudformation deploy --template-file out-template-dynamodb.yml --stack-name abdelhamid-feed-dynamodb
rm out-template-dynamodb.yml

# Lambda + API
aws cloudformation package --template-file template-api.yml --output-template-file out-template-api.yml --s3-bucket feed-hello-deploy
aws cloudformation deploy --template-file out-template-api.yml --stack-name abdelhamid-feed --parameter-overrides DynamoDBStack=abdelhamid-feed-dynamodb --capabilities CAPABILITY_IAM
rm out-template-api.yml
