import _ from 'underscore';

export default class LocalStorageBehaviour {
	
	constructor(storeName) {
		this.storeName = storeName;
	}

	get() {
		const store = localStorage.getItem(this.storeName);
		return _.isString(store) ? JSON.parse(store) : {};
	}

	clear() {
		localStorage.setItem(this.storeName, '');
	}

	set(store) {
		if (!_.isString(store)) store = JSON.stringify(store);
		localStorage.setItem(this.storeName, store);
	}

	hasContents() {
		const store = this.get();
		return store && !!_.keys(store).length;
	}

	update(callback) {
		const store = this.get();
		const updated = callback(store);
		this.set(updated);
	}

}