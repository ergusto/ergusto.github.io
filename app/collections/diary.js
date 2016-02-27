import _ from 'lodash';
import LocalStorageCollection from './base/localstorage.collection.js';

export default class Diary extends LocalStorageCollection {

	constructor() {
		super();
	}

	shell() {
		const entry = {};
		entry.identifier = '';
		entry.entries = [];
		return entry;
	}

	getItemFromDateIdentifier(identifier) {
		const entries = this.get();
		return _.find(entries, (entry) => {
			return entry.identifier == identifier;
		});
	}
	
}