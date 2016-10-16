import { buildQueryString } from './tools.js';

const Embedly = {};
Embedly.baseUrl = 'https://api.embedly.com/1/extract';

Embedly.fetch = function(url, callback) {

	const params = {url: url};
	const queryStr = buildQueryString(params);
	const apiEndpoint = this.baseUrl + queryStr;

	fetch(apiEndpoint).then((response) => {
		callback(false, response);
	}).catch((err) => {
		callback(err, false);
	});

}

export default Embedly;