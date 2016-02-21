import _ from 'underscore';

export default class Collection {

	constructor() {
		this.models = {};
		this.callbacks = {};
		this.callbacks.main = [];
		this.idCount = 0;
		this.name = this.constructor.name;

		if (window.localStorage) {
			this.usingLocalStorage = true;
			this.setUpLocalStorage();
		} else {
			this.usingLocalStorage = false;
			this.addDefaults();
		}

	}

	setUpLocalStorage() {
		this.localStorageName = 'ERGUSTO:collection:' + this.name;
		this.hasLocallyStoredModels = this._hasLocallyStoredModels();
		this.register((model) =>  {
			if (!this.hasLocallyStoredModels) this.hasLocallyStoredModels = true;
			if (model && this.usingLocalStorage) this.addModelToLocalStorage(model);
		});
		if (this.hasLocallyStoredModels) {
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

	_hasLocallyStoredModels() {
		const store = this.getFromLocalStorage();
		return store && _.keys(store).length;
	}

	addModelToLocalStorage(model) {
		const stored = this.getFromLocalStorage();
		stored[model.id] = model;
		this.setLocalStorage(stored);
	}

	removeModelFromLocalStorageById(id) {
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
		let id;
		if (_.isObject(model)) {
			id = model.id;
		} else {
			id = model;
		}
		delete this.models[id];
		if (this.usingLocalStorage) {
			this.removeModelFromLocalStorageById(id);
		}
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

	broadcast(model) {
		if (model) {
			const callbacks = this.callbacks[model.id] || [];
			callbacks.forEach((callback) => {
				callback.call(this, model);
			});
		}
		this.callbacks.main.forEach((callback) => {
			callback.call(this, model);
		});
	}

}