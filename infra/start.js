const { getFlashcards } = require(".");

const run = async () => {
  const res = await getFlashcards({
    pathParameters: { user: process.env.TEST_USER },
  });
  console.log(res);
};

run();
