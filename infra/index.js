const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

const dynamodb = new DynamoDBClient({ region: process.env.AWS_REGION });

async function handler() {
  const params = {
    TableName: process.env.AWS_DYNAMODB_TABLE_NAME,
    Key: {
      [process.env.AWS_DYNAMODB_PARTITION_KEY]: { S: process.env.TEST_USER },
    },
  };

  try {
    const data = await dynamodb.send(new GetItemCommand(params));
    console.log("Success", data);
  } catch (err) {
    console.log("Error", err);
  }
}

exports.handler = handler;
