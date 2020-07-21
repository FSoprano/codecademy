// models/quote.js
const {mongoose} = require('../database.js');

const quoteSchema = new mongoose.Schema(
  {
    quote: String,
    attributed: String,
    source: String
  }
);

module.exports = mongoose.model('Quote', quoteSchema);