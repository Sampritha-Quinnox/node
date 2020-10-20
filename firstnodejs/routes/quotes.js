var express = require('express');
var router = express.Router();
var quote = require("../controller/quoteController.js");


router.get('/', function(req, res) {
  quote.list(req, res);
});

router.get('/show/:id', function(req, res) {
  quote.show(req, res);
});

router.get('/create', function(req, res) {
  quote.create(req, res);
});


router.post('/save', function(req, res) {
  quote.save(req, res);
});

router.get('/exit',function(req,res)
{
  res.render('data', { title: 'GET QUOTES' });
})

module.exports = router;
