const { getFlashcards } = require("./lambda/flashcards.lambda");
const { checkAuthorization } = require("./lambda/authorization.lambda");

module.exports = {
  getFlashcards,
  checkAuthorization,
};
