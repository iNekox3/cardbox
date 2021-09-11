const { getFlashcards, checkAuthorization } = require("./index");

const runGetFlashcards = async () => {
  const res = await getFlashcards({
    pathParameters: { user: process.env.TEST_USER },
  });
  console.log(res);
};

const runCheckAuthorization = (forceUnauthorization = false) => {
  console.log(
    checkAuthorization({
      headers: {
        Authorization: forceUnauthorization
          ? ""
          : process.env.AUTHORIZATION_TOKEN,
      },
    })
  );
};

runCheckAuthorization(true);
