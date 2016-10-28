export function toString(obj) {
	return Object.prototype.toString.call(obj);
}

export function isObject(obj) {
	return toString(obj) == '[object Object]';
}

export function isString(obj) {
	return toString(obj) == '[object String]';
}

export function isArray(obj) {
	return toString(obj) == '[object Array]';
}

export function hasOwnProperty(obj, property) {
	return Object.prototype.hasOwnProperty.call(obj, property);
}

export function keys(obj) {
	const objKeys = [];
	for (var property in obj) {
		if (hasOwnProperty(obj, property)) {
			objKeys.push(property);
		}
	}
	return objKeys;
}