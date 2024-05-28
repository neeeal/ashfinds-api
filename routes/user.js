const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.get);
router.get('/:user_id', userController.getOne);

router.post('/', userController.post);

module.exports = router;