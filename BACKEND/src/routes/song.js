/* * * * * * * * * * * * * * *
 * Created By Michael Marolt *
 * * * * * * * * * * * * * * */
var express = require('express');
var router = express.Router();
const SongController = require('../database/controller/song.js');
const passport = require("./config/passport");

router.post('/',SongController.create);

router.get('/',SongController.getAllSongs);
router.get('/:id',SongController.getSongById)

router.delete('/:id',SongController.deleteSong)

router.use('*', function(req, res, next) {
    res.send('Wrong URL');
  });
  
  module.exports = router;