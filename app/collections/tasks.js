import LocalStorageCollection from './base/localstorage.collection.js';

export default class Tasks extends LocalStorageCollection {

	defaultModels() {
		return [
			{ title: 'Get the groceries', text: 'Some peas, some toothpaste, and 7 courgettes.' },
			{ title: 'Clean the bathroom', text: 'It\'s dirty!' }
		]
	}
	
}