// test/routes/index-test.js
const {assert} = require('chai');
const request = require('supertest');
const { JSDOM } = require('jsdom');

const app = require('../../app');
const {connectAndDrop, disconnect} = require('../../database');
const Quote = require('../../models/quote');

const parseTextFromHTML = (htmlAsString, selector) => {
    const htmlString = new JSDOM(htmlAsString);
	const selectedElement = htmlString.window.document.querySelector(selector);
	if (selectedElement !== null) {
		return selectedElement.textContent;
	} else {
		throw new Error(`No element with selector ${selector} found in HTML string`);
	}
};

describe('/', () => {
  beforeEach(connectAndDrop);
  afterEach(disconnect);
	describe('POST', () => {
		it('responds with the quote', async () => {
			const quote = 'Our deepest fear is not that we are inadequate. Our deepest fear is that we are powerful beyond measure.';
			const attributed = 'Marianne Williamson';
			const source = 'A Return to Love: Reflections on the Principles of A Course in Miracles';

			const response = await request(app)
				.post('/')
				.type('form')
				.send({quote, attributed, source});

			assert.equal(response.status, 200);
			assert.include(parseTextFromHTML(response.text, '#quotes'), quote);
			assert.include(parseTextFromHTML(response.text, '#quotes'), attributed);
			assert.include(parseTextFromHTML(response.text, '#quotes'), source);
		});


		it('stores the quote', async () => {
			const quote = 'Nothing is so painful to the human mind as a great and sudden change.';
			const attributed = 'Mary Shelley';
			const source = 'Frankenstein';

			const response = await request(app)
				.post('/')
				.type('form')
				.send({quote, attributed, source});

			const citation = await Quote.findOne({});
			assert.strictEqual(citation.quote, quote);
			assert.strictEqual(citation.attributed, attributed);
			assert.strictEqual(citation.source, source);
		});
	});
});
