import _ from 'underscore';

export default class Collection {

	constructor() {
		this.models = {};
		this.callbacks = {};
		this.callbacks.main = [];
		this.idCount = 0;
		this.name = this.constructor.name;

		if (localStorage) {
			this.setUpLocalStorage();
		} else {
			this.addDefaults();
		}

	}

	setUpLocalStorage() {
		this.localStorageName = 'ERGUSTO:collection:' + this.name;
		this.hasLocallyStoredItems = this._hasLocallyStoredItems();
		this.register((item) =>  {
			if (!this.hasLocallyStoredItems) this.hasLocallyStoredItems = true;
			this.addItemToLocalStorage(item);
		});
		if (this.hasLocallyStoredItems) {
			const storeList = this.getListFromLocalStorage();
			this.add(storeList);
		} else {
			this.addDefaults();
		}
	}

	addDefaults() {
		if (this.defaultModels) {
			const defaults = this.defaultModels();
			this.add(defaults);
		}
	}

	_hasLocallyStoredItems() {
		const store = this.getFromLocalStorage();
		return store && _.keys(store).length;
	}

	addItemToLocalStorage(item) {
		const stored = this.getFromLocalStorage();
		stored[item.id] = item;
		this.setLocalStorage(stored);
	}

	removeItemFromLocalStorageById(id) {
		const stored = this.getFromLocalStorage();
		delete stored[id];
		this.setLocalStorage(stored);
	}

	getListFromLocalStorage() {
		const store = this.getFromLocalStorage();
		return _.keys(store).map(function(id) {
			return store[id];
		});
	}

	getFromLocalStorage() {
		const store = localStorage.getItem(this.localStorageName);
		return _.isString(store) ? JSON.parse(store) : {};
	}

	clearLocalStorage() {
		localStorage.setItem(this.localStorageName, '');
	}

	setLocalStorage(store) {
		if (!_.isString(store)) store = JSON.stringify(store);
		localStorage.setItem(this.localStorageName, store);
	}

	addModel(model) {
		this.idCount++;
		
		model.id = this.idCount;
		
		this.models[model.id] = model;
		this.broadcast(model);

		return model;
	}

	add(model) {
		const isArray = _.isArray(model);
		const models = isArray ? model : [model];
		models.forEach((model) => {
			this.addModel(model);
		});
	}

	get(id) {
		if (id) return this.models[id];
		return Object.keys(this.models).map(key => this.models[key]);
	}

	remove(model) {
		if (_.isObject(model)) {
			id = model.id;
		} else {
			id = model;
		}
		delete this.models[id];
		this.removeItemFromLocalStorageById(id);
		this.broadcast();
	}

	register(callback, id) {
		if (id) {
			const callbacks = this.callbacks[id] || [];
			callbacks.push(callback);
			this.callbacks[id] = callbacks;
		} else {
			this.callbacks.main.push(callback);
		}
	}

	broadcast(item) {
		if (item) {
			const callbacks = this.callbacks[item.id] || [];
			callbacks.forEach((callback) => {
				callback.call(this, item);
			});
		}
		this.callbacks.main.forEach((callback) => {
			callback.call(this, item);
		});
	}

}