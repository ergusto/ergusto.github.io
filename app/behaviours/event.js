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

	remove(eventName, callback) {
		const event = this.get(eventName);
		const index = event.indexOf(callback);
		if (index > -1) {
			const modified = event.splice(index, 1);
			this.events[eventName] = modified;
		}
	}

	broadcast(eventName) {
		const event = this.get(eventName);
		const args = Array.prototype.slice.call(arguments, 1);
		event.forEach((callback) => {
			callback.apply(this, args);
		});
	}

}