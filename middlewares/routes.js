const authGoogleRouter = require("../routes/authGoogleRouter");

module.exports = (app) => {
  app.use("/auth/google", authGoogleRouter);
};
