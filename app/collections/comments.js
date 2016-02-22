import Collection from './collection.js';

export default class Comments extends Collection {

	defaultModels() {
		return [
			{	text: 'This site showcases some of the things I have created. Most examples are interactive. Try replying to or editing this comment.',
				username: 'ergusto',
				date: new Date('Mon Feb 22 2016 02:42:36 GMT+0000 (GMT)'),
			},
			{	text: 'Almost everything uses the localStorage API, so anything you do here will persist between visits, but only in this browser.',
				username: 'ergusto',
				date: new Date('Mon Feb 22 2016 02:42:36 GMT+0000 (GMT)'),
			},
		]
	}
	
}