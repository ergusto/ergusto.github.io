import _ from 'lodash';

export default class LocalStorageBehaviour {
	
	constructor(storeName) {
		this.storeName = storeName;
	}

	resetBrowserLocalStorage() {
		localStorage.clear();
	}

	get() {
		const store = localStorage.getItem(this.storeName);
		return _.isString(store) ? JSON.parse(store) : {};
	}

	clear() {
		localStorage.setItem(this.storeName, '');
	}

	set(store) {
		if (_.isObject(store)) store = JSON.stringify(store);
		localStorage.setItem(this.storeName, store);
	}

	hasContents() {
		const store = this.get();
		if (_.isObject(store)) {
			return store && !!_.keys(store).length;
		}
		return store && store.length;
	}

	update(callback) {
		const store = this.get();
		const updated = callback(store);
		this.set(updated);
	}

}