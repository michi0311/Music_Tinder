/* * * * * * * * * * * * * * *
 * Created By Michael Marolt *
 * * * * * * * * * * * * * * */
var express = require('express');
var router = express.Router();
const userMatchController = require('../database/controller/userMatch.js');
const passport = require("./config/passport");

router.post('/:id',passport.authenticate("jwt", { session: false }),userMatchController.like)
router.delete('/:id',passport.authenticate("jwt", { session: false }),userMatchController.dislike)

router.use('*', function(req, res, next) {
    res.send('Wrong URL');
  });
  
  module.exports = router;