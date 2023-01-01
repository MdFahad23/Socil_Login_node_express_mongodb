const router = require("express").Router();
const passport = require("passport");
require("../config/authGoogleConfig");

//localhost:3001/auth/google
router
  .route("/")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

//localhost:3001/auth/google/redirect
router
  .route("/callback")
  .get(passport.authenticate("google", { session: false }), (req, res) => {
    res.send(req.user);
  });

module.exports = router;
