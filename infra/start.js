const { handler } = require(".");

const run = async () => {
  const res = await handler({
    pathParameters: { user: process.env.TEST_USER },
  });
  console.log(res);
};

run();
