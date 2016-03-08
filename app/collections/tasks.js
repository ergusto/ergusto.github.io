import LocalStorageCollection from './base/localstorage.collection.js';

export default class Tasks extends LocalStorageCollection {

	shell() {
		const task = {};
		task.title = '';
		task.text = '';
		task.completed = false;
		return task;
	}

	defaultModels() {
		return [
			{ title: 'Get the groceries', text: 'Some peas, some toothpaste, and 7 courgettes.', completed: false },
			{ title: 'Clean the bathroom', text: 'It\'s dirty!', completed: false }
		]
	}
	
}