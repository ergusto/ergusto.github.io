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
		this.initialiseEvents();

		if (this.hasLocallyStoredModels) {
			const storeList = this.getListFromLocalStorage();
			this.addMany(storeList);
		} else {
			this.addDefaults();
		}
	}

	initialiseEvents() {
		
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

	}

	addDefaults() {
		if (this.defaultModels) {
			const defaults = this.defaultModels();
			this.createMany(defaults);
		}
	}

	_hasLocallyStoredModels() {
		const store = this.getLocalStorage();
		return store && !!_.keys(store).length;
	}

	addModelToLocalStorage(model) {
		const store = this.getLocalStorage();
		store[model.id] = model;
		this.setLocalStorage(store);
	}

	removeModelFromLocalStorageById(id) {
		const store = this.getLocalStorage();
		delete store[id];
		this.setLocalStorage(store);
	}

	removeModelFromLocalStorage(model) {
		this.removeModelFromLocalStorageById(model.id);
	}

	getListFromLocalStorage() {
		const store = this.getLocalStorage();
		return _.keys(store).map(function(id) {
			return store[id];
		});
	}

	getLocalStorage() {
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

}