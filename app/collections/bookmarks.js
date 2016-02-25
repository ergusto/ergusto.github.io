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
				url: 'https://www.flickr.com/photos/fergusruston/',
				notes: ''
			},
			{
				title: 'Github profile',
				url: 'http://github.com/ergusto', 
				notes: '' 
			},
			{
				title: 'Twitter profile',
				url: 'http://twitter.com/ergusto', 
				notes: '' 
			},
		]
	}
	
}