import LocalStorageCollection from './base/localstorage.collection.js';

export default class Bookmarks extends LocalStorageCollection {

	defaultModels() {
		return [
			{ 
				title: 'The BBC',
				url: 'http://bbc.co.uk',
				text: 'News organisation.'
			},
			{
				title: 'Wikipedia',
				url: 'http://wikipedia.org', 
				text: 'An amazing resource where you can learn just about anything!' 
			}
		]
	}
	
}