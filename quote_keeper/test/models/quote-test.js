// test/models/quote-test.js
const {assert} = require('chai');
const {mongoose, databaseUrl, options, connectAndDrop, disconnect} = require('../../database');
const Quote = require('../../models/quote');

describe('Quote', () => {
  beforeEach(connectAndDrop);
  afterEach(disconnect);
  describe('#quote', () => {
    it('is a string', () => {
      const quoteAsInt = 1;
      const citation = new Quote({quote: quoteAsInt});
      assert.isString(citation.quote);
      assert.strictEqual(citation.quote, quoteAsInt.toString())
    });
  });
    describe('#attributed', () => {
    it('is a string', () => {
      const attributed = 'James Baldwin';
      const citation = new Quote({attributed});
      assert.isString(citation.attributed);
      assert.strictEqual(citation.attributed, attributed);
    });
  });
  describe('#source', () => {
    it('is a string', () => {
      const source = 'Notes of a Native Son';
      const citation = new Quote({source});
      assert.isString(citation.source);
      assert.strictEqual(citation.source, source);
    });
  });
});