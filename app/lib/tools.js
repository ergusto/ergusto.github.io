import _ from 'lodash';

const twentyFourHourTimeValidator = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

export function validate24HourTime(time) {
	return time && twentyFourHourTimeValidator.test(time);
};

export function truncate(string, limit) {
	return (string.length > limit) ? string.substr(0, limit-1) + '...' : string;
};

export function generateID() {
	// Math.random should be unique because of its seeding algorithm.
	// Convert it to base 36 (numbers + letters), and grab the first 9 characters
	// after the decimal.
	return '_' + Math.random().toString(36).substr(2, 9);
};

export function isURL(string) {
	const urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
	const url = new RegExp(urlRegex, 'i');
	return string.length < 2083 && url.test(string);
};

export function isImageUrl(url) {
	if (_.isString(url)) {
		return isURL(url) && ( url.match(/\.(jpeg|jpg|gif|png)$/) != null );
	}
	return false;
};

export function containsSpaces(string) {
	return /\s/g.test(string);
};

export function buildQueryString(obj) {

	return _.map(obj, (value, key) => {
		return key + '=' + value;
	}).join('&');

};

export function generateCorrectEndHour(hour) {
	let hourDigit = Number(hour.slice(0, -3));
	hourDigit = String(hourDigit + 1);
	return hourDigit.length == 1 ? '0' + hourDigit + ':00' : hourDigit + ':00';
};