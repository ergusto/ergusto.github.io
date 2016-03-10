import _ from 'lodash';
import Collection from './collection.js';
import LocalStorageBehaviour from '../../behaviours/localstorage.js';

export default class LocalStorageCollection extends Collection {

	constructor() {
		super();
		if (window && window.localStorage) {
			// always add bevhaiour in the constructor
			this.storeName = 'ergusto:collection:' + this.name;
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
			if (model) {
				const models = _.isArray(model) ? model : [model];
				models.forEach((created) => {
					if (created && created.id) {
						this.addOrUpdateModelToLocalStorage(created);
					}
				});
			}
		});

		this.onUpdate((model) => {
			if (model) {
				const models = _.isArray(model) ? model : [model];
				models.forEach((updated) => {
					if (updated && updated.id) {
						this.addOrUpdateModelToLocalStorage(updated);
					}
				})
			}
		});

		this.onRemove((model) => {
			if (model) {
				const models = _.isArray(model) ? model : [model];
				models.forEach((removed) => {
					if (removed && removed.id) {
						this.removeModelFromLocalStorage(removed);
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

	addOrUpdateModelToLocalStorage(model) {
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