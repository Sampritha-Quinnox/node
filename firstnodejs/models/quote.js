var mongoose = require('mongoose');

var QuoteSchema = new mongoose.Schema({
  name: String,
  quotedesc: String,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quote', QuoteSchema);
