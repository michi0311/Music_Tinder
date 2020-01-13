/* * * * * * * * * * * * * * *
 * Created By Michael Marolt *
 * * * * * * * * * * * * * * */
var express = require('express');
var router = express.Router();
const path = require("path")
const userMatchController = require(path.normalize('../database/controller/userMatch.js'));
const passport = require(path.normalize("../routes/config/passport"));

router.post('/:id',passport.authenticate("jwt", { session: false }),userMatchController.like)
router.delete('/:id',passport.authenticate("jwt", { session: false }),userMatchController.dislike)

router.use('*', function(req, res, next) {
    res.send('Wrong URL');
  });
  
  module.exports = router;