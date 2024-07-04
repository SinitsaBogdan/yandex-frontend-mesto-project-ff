const path = require('path');

result = {};

result.entry = {
	home: path.join(__dirname, '../../src/index.js'),
	home: { import: path.join(__dirname, '../../src/components/pages/home/Home.js'), filename: 'js/home.js' },
};

result.pages = [
	{ chunks: ['home'], page: 'pages/home.html', template: path.join(__dirname, '../../src/components/pages/home/Home.pug') },
];

module.exports = result;
