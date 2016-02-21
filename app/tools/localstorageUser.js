import _ from 'underscore';

class User {

	constructor() {
		this.user = {};
		this.user.username = 'ergusto';
		this.localStorageName = 'ERGUSTO:user';

		if (window.localStorage) {
			this.usingLocalStorage = true;
		}
	}

	getFromLocalStorage() {
		const store = localStorage.getItem(this.localStorageName);
		return _.isString(store) ? JSON.parse(store) : {};
	}

	clearLocalStorage() {
		localStorage.setItem(this.localStorageName, '');
	}

	setLocalStorage() {
		if (!_.isString(store)) store = JSON.stringify(this.user);
		localStorage.setItem(this.localStorageName, store);
	}

	getUser() {
		return this.user.username;
	}

	setUsername(username) {
		this.user.username = username;
		if (this.usingLocalStorage) this.setLocalStorage();
	}

}

var user = new User();

export default user;