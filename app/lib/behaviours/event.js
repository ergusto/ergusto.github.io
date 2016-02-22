import _ from 'underscore';

export default class EventBehaviour {

	constructor() {
		this.events = {};
	}

	get(eventName) {
		let event = this.events[eventName];
		if (!event) {
			event = this.events[eventName] = [];
		}
		return event;
	}

	register(eventName, callback) {
		const event = this.get(eventName);
		event.push(callback);
	}

	broadcast(eventName, model) {
		const event = this.get(eventName);
		event.forEach((callback) => {
			callback.call(this, model);
		});
	}

}