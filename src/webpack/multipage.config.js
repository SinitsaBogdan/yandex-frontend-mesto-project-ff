const path = require('path');

result = {};

result.entry = {
	home: path.join(__dirname, '../../src/index.js'),
};

result.pages = [{ chunks: ['home'], page: 'pages/home.html', template: path.join(__dirname, '../../src/index.html') }];

module.exports = result;
