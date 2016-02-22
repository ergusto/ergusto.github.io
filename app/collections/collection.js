import _ from 'underscore';
import Tools from '../lib/tools.js';

export default class Collection {

	constructor() {
		this.models = {};
		this.events = {};
		this.events.change = [];
		this.events.create = [];
		this.events.update = [];
		this.events.remove = [];

		this.name = this.constructor.name;
	}

	// events basics

	getEvent(eventName) {
		return this.events[eventName];
	}

	register(eventName, callback) {
		const event = this.getEvent(eventName);
		if (event) event.push(callback);
	}

	broadcast(eventName, model) {
		const event = this.getEvent(eventName);
		if (event) {
			event.forEach((callback) => {
				callback.call(this, model);
			})
		}
	}

	// add models you don't want to instantiate with a new id
	// e.g., models that already have an id, such as when 
	// retrieved from local storage

	onAdd(callback) {
		this.register('add', callback);
	}

	onChange(callback) {
		this.register('change', callback);
	}

	onCreate(callback) {
		this.register('create', callback);
	}

	onUpdate(callback) {
		this.register('update', callback);
	}

	onRemove(callback) {
		this.register('remove', callback);
	}

	// triggering any event also triggers change event.

	triggerChange() {
		this.broadcast('change');
	}

	triggerAdd(model) {
		this.broadcast('add', model);
		this.triggerChange();
	}

	triggerCreate(model) {
		this.broadcast('create', model);
		this.triggerChange();
	}

	triggerUpdate(model) {
		this.broadcast('update', model);
		this.triggerChange();
	}

	triggerRemove(model) {
		this.broadcast('remove', model);
		this.triggerChange();
	}

	// change models

	create(model) {
		model.id = Tools.generateID();
		this.models[model.id] = model;
		this.triggerCreate(model);
		return model;
	}

	createMany(models) {
		const created = models.map((model) => {
			model.id = Tools.generateID();
			this.models[model.id] = model;
			return model;
		});
		this.triggerCreate(created);
		return created;
	}

	add(model) {
		this.models[model.id] = model;
		this.triggerAdd(model);
		return model;
	}

	addMany(models) {
		models.forEach((model) => {
			this.models[model.id] = model;
		});
		this.triggerAdd(models);
		return models;
	}

	update(model) {
		const id = model.id;
		if (id) {
			this.models[id] = model;
			this.triggerUpdate(model);
		}
		return model;
	}

	remove(model) {
		let id;
		if (_.isObject(model)) {
			id = model.id;
		} else {
			model = this.get(model);
			id = model.id;
		}
		delete this.models[id];
		this.triggerRemove(model);
	}

	// query models

	get(id) {
		if (id) return this.models[id];
		return Object.keys(this.models).map(key => this.models[key]);
	}

}