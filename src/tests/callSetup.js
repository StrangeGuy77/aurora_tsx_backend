const {
  setup
} = require("./setupTest");

module.exports = async function () {
  if (!process.env.TEST_HOST) {
    await setup();
  }
  return null;
};