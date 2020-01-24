/* * * * * * * * * * * * * * *
 * Created By Michael Marolt *
 * * * * * * * * * * * * * * */
var express = require('express');
var router = express.Router();
const path = require("path")
const userController = require(path.normalize('../database/controller/user.js'));
const passport = require(path.normalize("../routes/config/passport"));

/* GET users listing. */
router.post('/',userController.create);

router.get('/',passport.authenticate("jwt", { session: false }),userController.getAllUsers);
router.get('/random',passport.authenticate("jwt", { session: false }),userController.getRandomUser);
router.get('/:id',passport.authenticate("jwt", { session: false }),userController.getUserById);

router.patch('/',passport.authenticate("jwt", { session: false }),userController.changeUser);

router.delete('/:id',passport.authenticate("jwt", { session: false }),userController.deleteUser)


router.use('*', function(req, res, next) {
  res.send('Wrong URL');
});

module.exports = router;
