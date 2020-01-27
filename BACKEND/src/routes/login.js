/* * * * * * * * * * * * * * *
 * Created By Michael Marolt *
 * * * * * * * * * * * * * * */
var express = require('express');
var router = express.Router();
const path = require("path");
const user = require(path.normalize("../database/models/index")).User;
const hashTool = require(path.normalize("../database/helpers/hashTool"));

//import Passport and the jwt module
const passport = require(path.normalize(__dirname + "/config/passport"));
const jwt = require("jsonwebtoken");

const jwtSecret = "Music Tinder";

router.post("/", async function (req, res, next) {
  const { email, password } = req.body;

  if (email && password) {
    let logUser = undefined;
    try {
      logUser = await user.findOne({ where: { email: email }});
    } catch (e) {
      console.log(e);
      return res.status(500).send(e)
    }
    
    if (!logUser) {
      return res.status(401).send({ error: "No such User found" });
    }
    const isMatch = await hashTool.compareHash(password, logUser.password);

    if (isMatch) {
      let payload = {
        id: logUser.id,
        email: logUser.email,
        exp: Math.round(Date.now() / 1000) + (60 * 60 * 3) // 3 = 3hours expiration date
      };

      let token = jwt.sign(payload, jwtSecret);
      res.json({
        msg: "ok",
        token: token,
        name: logUser.name,
        email: logUser.email,
        birthday: logUser.birthday,
        songDescription: logUser.songDescription
      });
    } else {
      return res.status(401).json({ error: "Password is incorrect" });
    }
  } else {
    res.status(401).json({ error: "No data provided" });
  }
});

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.send(req.user);
  }
);

module.exports = router;
