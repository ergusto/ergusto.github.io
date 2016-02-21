import Collection from './collection.js';

export default class Tasks extends Collection {

	defaultModels() {
		return [
			{ title: 'Get the groceries', text: 'Some peas, some toothpaste, and some fish stockings.' },
			{ title: 'Clean the bathroom', text: 'It\'s dirty!' }
		]
	}
	
}