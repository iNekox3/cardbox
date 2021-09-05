const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const dynamodb = new DynamoDBClient({ region: process.env.AWS_REGION });

async function handler() {
  const params = {
    TableName: process.env.AWS_DYNAMODB_TABLE_NAME,
    Key: marshall({
      [process.env.AWS_DYNAMODB_PARTITION_KEY]: process.env.TEST_USER,
    }),
  };

  try {
    const data = await dynamodb.send(new GetItemCommand(params));
    console.log("Success", unmarshall(data.Item));
  } catch (err) {
    console.log("Error", err);
  }
}

exports.handler = handler;
