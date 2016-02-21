export default class Collection {

	constructor() {
		this.models = {};
		this.callbacks = {};
		this.callbacks.main = [];
		this.idCount = 0;
		this.name = this.constructor.name;
	}

	add(model) {
		this.idCount++;
		
		model.id = this.idCount;
		
		this.models[model.id] = model;
		this.broadcast(model);

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