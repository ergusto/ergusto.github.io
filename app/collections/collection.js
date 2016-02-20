export default class Collection {

	constructor() {
		this.models = {};
		this.callbacks = {};
		this.callbacks.main = [];
		this.idCount = 0;
	}

	add(model) {
		const collection = this;
		collection.idCount++;
		
		model.id = collection.idCount;
		
		collection.models[model.id] = model;
		collection.broadcast(model);

		return model;
	}

	get(id) {
		if (id) return this.models[id];
		return Object.keys(this.models).map(key => this.models[key]);
	}

	remove(id) {
		delete this.models[id];
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
		const collection = this;
		if (item) {
			const callbacks = collection.callbacks[item.id] || [];
			callbacks.forEach(function(callback) {
				callback.call(collection, item);
			});
		}
		collection.callbacks.main.forEach(function(callback) {
			callback.call(collection, item);
		});
	}

}