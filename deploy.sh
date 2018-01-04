#@author :abdelhamid.belgacem


# deploy DB Feed
aws cloudformation package --template-file template-dynamodb.yml --output-template-file out-template-dynamodb.yml --s3-bucket feed-hello-deploy
aws cloudformation deploy --template-file out-template-dynamodb.yml --stack-name abdelhamid-feed-dynamodb
rm out-template-dynamodb.yml

# Lambda + API Feed
aws cloudformation package --template-file template-api.yml --output-template-file out-template-api.yml --s3-bucket feed-hello-deploy
aws cloudformation deploy --template-file out-template-api.yml --stack-name abdelhamid-feed --parameter-overrides DynamoDBStack=abdelhamid-feed-dynamodb --capabilities CAPABILITY_IAM
rm out-template-api.yml




# deploy DB Profile
aws cloudformation package --template-file profile-template-dynamodb.yml --output-template-file out-profile-template-dynamodb.yml --s3-bucket profile-hello-deploy
aws cloudformation deploy --template-file out-profile-template-dynamodb.yml --stack-name abdelhamid-profile-dynamodb
rm out-profile-template-dynamodb.yml

# Lambda + API Profile
aws cloudformation package --template-file profile-template-api.yml --output-template-file out-profile-template-api.yml --s3-bucket profile-hello-deploy
aws cloudformation deploy --template-file out-profile-template-api.yml --stack-name abdelhamid-profile --parameter-overrides DynamoDBStack=abdelhamid-profile-dynamodb --capabilities CAPABILITY_IAM
rm out-profile-template-api.yml