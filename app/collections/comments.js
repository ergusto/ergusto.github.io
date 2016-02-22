import _ from 'underscore';
import LocalStorageCollection from './localstorage.collection.js';

export default class Comments extends LocalStorageCollection {

	defaultModels() {
		return [{
			text: 'This site showcases some of the things I have created. Most examples are interactive. Try replying to or editing this comment.',
			username: 'ergusto',
			date: new Date('Mon Feb 22 2016 02:42:36 GMT+0000 (GMT)'),
			parentId: false
		}, {	
			text: 'Almost everything uses the localStorage API, so changes you make here will persist between visits, but only while you use this browser.',
			username: 'ergusto',
			date: new Date('Mon Feb 22 2016 02:42:36 GMT+0000 (GMT)'),
			parentId: false
		}]
	}

	getParentComments() {
		const comments = this.get();
		return _.filter(comments, (comment) => {
			return !comment.parentId;
		});
	}

	getChildCommentsForComment(parent) {
		const comments = this.get();
		return _.filter(comments, (comment) => {
			return comment.parentId = parent.id;
		});
	}
	
}