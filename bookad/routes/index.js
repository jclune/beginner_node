var express = require('express');
var router = express.Router();
var controller = require('../controller/index');

router.get('/', controller.index.html);

module.exports = router;
