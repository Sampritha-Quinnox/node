var mongoose = require("mongoose");
var Quote = require("../models/quote");

var quoteController = {};

quoteController.list = function(req, res) {
  Quote.find({}).exec(function (err, quotes) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/quotes/index", {quotes: quotes});
    }
  });
};


quoteController.show = function(req, res) {
  Quote.findOne({_id: req.params.id}).exec(function (err, quote) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/quotes/show", {quote: quote});
    }
  });
};


quoteController.create = function(req, res) {
  res.render("../views/quotes/create");
};

quoteController.save = function(req, res) {
  var quote = new Quote(req.body);

  quote.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/quotes/create");
    } else {
      console.log("Successfully created an quotes.");
      res.redirect("/quotes/show/"+quote._id);
    }
  });
};

module.exports = quoteController;
