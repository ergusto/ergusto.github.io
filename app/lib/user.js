import _ from 'underscore';

export default class User {

	constructor() {
		this.user = {};
		this.user.username = 'ergusto';

		this.user.settings = {};
		this.user.settings.showIntroAnimation = true;
		
		this.callbacks = [];

		this.localStorageName = 'ERGUSTO:user';

		if (window.localStorage) {
			this.usingLocalStorage = true;
			const user = this.getUserFromLocalStorage();
			if (user) this.user = user;
		} else {
			this.usingLocalStorage = false;
		}
	}

	getUserFromLocalStorage() {
		if (!this.usingLocalStorage) return;
		const store = localStorage.getItem(this.localStorageName);
		return JSON.parse(store);
	}

	clearLocalStorage() {
		if (!this.usingLocalStorage) return;
		localStorage.setItem(this.localStorageName, '');
	}

	setLocalStorage() {
		if (!this.usingLocalStorage) return;
		const store = JSON.stringify(this.user);
		localStorage.setItem(this.localStorageName, store);
	}

	getUser() {
		return this.user.username;
	}

	set(property, value) {
		this.user[property] = value;
		this.setLocalStorage();
		this.broadcast();
	}

	setSetting(property, value) {
		this.user.settings[property] = value;
		this.setLocalStorage();
		this.broadcast();
	}

	setUsername(username) {
		this.set('username', username);
	}

	setShouldShowIntro(boolean) {
		this.setSetting('showIntroAnimation', boolean);
	}

	shouldSeeIntroAnimation() {
		return this.user.settings.showIntroAnimation;
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