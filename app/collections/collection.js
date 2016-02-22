import _ from 'underscore';

export default class Collection {

	constructor() {
		this.models = {};
		this.callbacks = [];
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
		const store = this.getFromLocalStorage();
		store[model.id] = model;
		this.setLocalStorage(store);
	}

	removeModelFromLocalStorageById(id) {
		const store = this.getFromLocalStorage();
		delete store[id];
		this.setLocalStorage(store);
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

	update(model) {
		const id = model.id;
		if (id) {
			this.models[id] = model;
			this.broadcast(model);
		}
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

	register(callback) {
		this.callbacks.push(callback);
	}

	broadcast() {
		this.callbacks.forEach((callback) => {
			callback.call(this);
		});
	}

}