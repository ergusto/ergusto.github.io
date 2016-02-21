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

	setUsername(username) {
		this.user.username = username;
		this.setLocalStorage();
	}

	setShouldShowIntro(boolean) {
		this.user.settings.showIntroAnimation = boolean;
		this.setLocalStorage();
	}

	shouldShowIntroAnimation() {
		return this.user.settings.showIntroAnimation;
	}

	register(callback) {
		this.callbacks.push(callback);
	}

	broadcast(model) {
		this.callbacks.forEach((callback) => {
			callback.call(this, this.user);
		});
	}

}