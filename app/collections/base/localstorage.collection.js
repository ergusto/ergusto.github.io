import _ from 'underscore';
import Collection from './collection.js';
import LocalStorageBehaviour from '../../lib/behaviours/localstorage.js';

export default class LocalStorageCollection extends Collection {

	constructor() {
		super()
		if (window.localStorage) {
			// always add bevhaiour in the constructor
			this.storeName = 'ERGUSTO:collection:' + this.constructor.name;
			this.store = new LocalStorageBehaviour(this.storeName);
			this.setUpLocalStorage();
		} else {
			this.usingLocalStorage = false;
			this.addDefaults();
		}
	}

	setUpLocalStorage() {
		this.usingLocalStorage = true;
		this.hasLocallyStoredModels = this.store.hasContents();
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

	addDefaults() {
		if (this.defaultModels) {
			const defaults = this.defaultModels();
			this.createMany(defaults);
		}
	}

	addModelToLocalStorage(model) {
		this.store.update((store) => {
			store[model.id] = model;
			return store;
		});
	}

	removeModelFromLocalStorageById(id) {
		this.store.update((store) => {
			delete store[id];
			return store;
		});
	}

	removeModelFromLocalStorage(model) {
		this.removeModelFromLocalStorageById(model.id);
	}

	getListFromLocalStorage() {
		const store = this.store.get();
		return _.keys(store).map(function(id) {
			return store[id];
		});
	}

}