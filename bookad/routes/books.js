var express = require('express');
var router = express.Router();
var controller = require('../controller/book');

router.get('/search', controller.search.html);

router.route('/add')
  .get(controller.add.html)
  .post(controller.add);

router.route('/:_id')
  .get(controller.detail.html)
  .put(controller.modify)
  .delete(controller.delete);

router.get('/:_id/modify', controller.modify.html)

module.exports = router;
