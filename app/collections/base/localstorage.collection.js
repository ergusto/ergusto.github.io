import _ from 'underscore';
import Collection from './collection.js';

export default class LocalStorageCollection extends Collection {

	constructor() {
		super()
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
		this.initialiseLocalStorageEvents();

		if (this.hasLocallyStoredModels) {
			const storeList = this.getListFromLocalStorage();
			this.addMany(storeList);
		} else {
			this.addDefaults();
		}
	}

	initialiseLocalStorageEvents() {
		
		this.onCreate((model) => {
			if (!this.hasLocallyStoredModels) this.hasLocallyStoredModels = true;
			if (model) {
				const models = _.isArray(model) ? model : [model];
				models.forEach((model) => {
					if (model && model.id) {
						this.addModelToLocalStorage(model);
					}
				});
			}
		});

		this.onUpdate((model) => {
			if (model) {
				const models = _.isArray(model) ? model : [model];
				models.forEach((model) => {
					if (model && model.id) {
						this.addModelToLocalStorage(model);
					}
				})
			}
		});

		this.onRemove((model) => {
			if (model) {
				const models = _.isArray(model) ? model : [model];
				models.forEach((model) => {
					if (model && model.id) {
						this.removeModelFromLocalStorage(model);
					}
				});
			}
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

	addDefaults() {
		if (this.defaultModels) {
			const defaults = this.defaultModels();
			this.createMany(defaults);
		}
	}

	_hasLocallyStoredModels() {
		const store = this.getFromLocalStorage();
		return store && !!_.keys(store).length;
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

	removeModelFromLocalStorage(model) {
		this.removeModelFromLocalStorageById(model.id);
	}

	getListFromLocalStorage() {
		const store = this.getFromLocalStorage();
		return _.keys(store).map(function(id) {
			return store[id];
		});
	}

}