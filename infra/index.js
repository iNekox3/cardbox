const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const { corsHeaders } = require("./cors");

const dynamodb = new DynamoDBClient({ region: process.env.AWS_REGION });

// GET /getFlashcards/{user}
async function getFlashcards(event) {
  const response = {
    isBase64Encoded: false,
    statusCode: 200,
    headers: {
      "content-type": "application/json",
    },
    body: "",
  };

  try {
    const user = event.pathParameters.user;

    const params = {
      TableName: process.env.AWS_DYNAMODB_TABLE_NAME,
      Key: marshall({
        [process.env.AWS_DYNAMODB_PARTITION_KEY]: user,
      }),
    };

    const { Item } = await dynamodb.send(new GetItemCommand(params));

    response.headers = corsHeaders;
    response.body = JSON.stringify({
      message: "Successfully retrieved flashcards.",
      flashcards: Item ? unmarshall(Item).flashcards : [],
    });
  } catch (err) {
    console.error(err);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "Failed to get flashcards.",
      errorMsg: err.message,
      errorStack: err.stack,
    });
  }

  return response;
}

exports.handler = getFlashcards;
