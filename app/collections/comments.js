import _ from 'lodash';
import LocalStorageCollection from './base/localstorage.collection.js';

export default class Comments extends LocalStorageCollection {

	constructor() {
		super();

		this.onRemove((model) => {
			const children = this.getChildCommentsForComment(model);

			children.forEach((child) => {
				this.remove(child);
			});
		});
	}

	defaultModels() {
		return [{
			text: 'This site showcases some of the things I have created. Most examples are interactive. Try replying to or editing this comment.',
			username: 'ergusto',
			date: new Date(),
			parentId: false
		}, {	
			text: 'Almost everything uses the localStorage API, so changes you make will persist between visits, but only in the browser you are currently using.',
			username: 'ergusto',
			date: new Date(),
			parentId: false
		}]
	}

	getRootComments() {
		const comments = this.get();
		return _.filter(comments, (comment) => {
			return !comment.parentId;
		});
	}

	getChildCommentsForComment(parent) {
		const comments = this.get();
		return _.filter(comments, (comment) => {
			return comment.parentId == parent.id;
		});
	}
	
}