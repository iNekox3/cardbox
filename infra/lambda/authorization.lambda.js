async function checkAuthorization(event) {
  const requestAuthorizationToken = event.headers.authorization;
  return {
    isAuthorized: requestAuthorizationToken === process.env.AUTHORIZATION_TOKEN,
  };
}

exports.checkAuthorization = checkAuthorization;
