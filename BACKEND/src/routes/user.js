var express = require('express');
var router = express.Router();
const userController = require('../database/controller/user.js');

/* GET users listing. */
router.post('/',userController.create);

router.get('/',userController.getAllUsers);
router.get('/:id',userController.getUserById);

router.patch('/:id',userController.changeUser);

router.delete('/:id',userController.deleteUser)


router.get('*', function(req, res, next) {
  res.send('Wrong URL');
});

module.exports = router;
