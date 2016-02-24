import LocalStorageCollection from './base/localstorage.collection.js';

export default class Bookmarks extends LocalStorageCollection {

	shell() {
		const bookmark = {};
		bookmark.title = '';
		bookmark.url = '';
		bookmark.notes = '';
		return bookmark;
	}

	defaultModels() {
		return [
			{ 
				title: 'Some of my photography',
				url: 'https://c1.staticflickr.com/1/773/22353007131_8cf5803bc8_k.jpg',
				notes: 'Check out my other photography at https://www.flickr.com/photos/fergusruston/'
			},
			{
				title: 'Wikipedia',
				url: 'http://wikipedia.org', 
				notes: 'An amazing resource where you can learn just about anything!' 
			},
			{
				title: 'Some more photography',
				url: 'https://c1.staticflickr.com/1/89/223652261_ecce83afdd_b.jpg', 
				notes: '' 
			}
		]
	}
	
}