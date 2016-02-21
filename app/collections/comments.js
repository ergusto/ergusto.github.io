import Collection from './collection.js';

export default class Comments extends Collection {

	defaultModels() {
		return [
			{	text: 'This site showcases some of the things I have created. Most examples are interactive. Try replying to or editing this comment.',
				username: 'ergusto',
				date: new Date,
			},
			{	text: 'Most features are backed by the localStorage API, so anything you do here will persist between visits, but will only be visible to you.',
				username: 'ergusto',
				date: new Date,
			},
		]
	}
	
}