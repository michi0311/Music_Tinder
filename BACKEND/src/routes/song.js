/* * * * * * * * * * * * * * *
 * Created By Michael Marolt *
 * * * * * * * * * * * * * * */
var express = require('express');
var router = express.Router();
const path = require("path")
const SongController = require(path.normalize('../database/controller/song.js'));
const passport = require(path.normalize("../routes/config/passport"));

router.post('/addPlaylist',passport.authenticate("jwt", { session: false }),SongController.addPlaylistToDB)
router.post('/',SongController.create);

router.get('/',SongController.getAllSongs);
router.get('/:id',SongController.getSongById);

router.delete('/:id',SongController.deleteSong)

router.use('*', function(req, res, next) {
    res.send('Wrong URL');
  });
  
  module.exports = router;