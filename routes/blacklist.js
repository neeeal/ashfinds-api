const express = require('express');
const router = express.Router();
const blacklistController = require('../controllers/blacklist');

router.get('/', blacklistController.get);

module.exports = router;