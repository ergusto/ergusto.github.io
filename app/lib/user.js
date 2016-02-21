import _ from 'underscore';

class User {

	constructor() {
		this.user = {};
		this.user.username = 'ergusto';

		this.user.settings = {};
		this.user.settings.showIntroAnimation = true;
		
		this.callbacks = [];

		this.localStorageName = 'ERGUSTO:user';

		if (window.localStorage) {
			const user = this.getUserFromLocalStorage();
			this.usingLocalStorage = true;
			if (user) this.user = user;
		} else {
			this.usingLocalStorage = false;
		}
	}

	getUserFromLocalStorage() {
		const store = localStorage.getItem(this.localStorageName);
		return JSON.parse(store);
	}

	clearLocalStorage() {
		localStorage.setItem(this.localStorageName, '');
	}

	setLocalStorage() {
		if (this.usingLocalStorage) {
			const store = JSON.stringify(this.user);
			localStorage.setItem(this.localStorageName, store);
		}
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

const CurrentUser = new User();

export default CurrentUser;