/* * * * * * * * * * * * * * *
 * Created By Michael Marolt *
 * * * * * * * * * * * * * * */
var express = require('express');
var router = express.Router();
const path = require("path")
const userMatchController = require(path.normalize('../database/controller/userMatch.js'));
const passport = require(path.normalize("../routes/config/passport"));


router.post('/hate/:id',passport.authenticate("jwt", { session: false }),userMatchController.hateSong)
router.delete("/dislikeUser/:id",passport.authenticate("jwt", { session: false }),userMatchController.dislike)
router.post('/:id',passport.authenticate("jwt", { session: false }),userMatchController.like)

router.get('/user',passport.authenticate("jwt", { session: false }),userMatchController.getAllMatchedUsers)
router.get('/songs',passport.authenticate("jwt", { session: false }),userMatchController.getAllLikedSongs)

router.use('*', function(req, res, next) {
    res.send('Wrong URL');
  });
  
  module.exports = router;