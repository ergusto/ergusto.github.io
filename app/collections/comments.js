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

	shell() {
		const comment = {};
		comment.text = '';
		comment.date = '';
		comment.parentId = false;
		comment.username = '';
		return comment;
	}

	defaultModels() {
		return [{
			text: 'This site is a playground I made while learning React. Most examples are interactive. Try replying to or editing this comment.',
			username: 'ergusto',
			date: new Date(),
			parentId: false
		}]
	}

	getRootComments() {
		const comments = this.get();
		return _.filter(comments, (comment) => {
			return comment.parentId == false;
		});
	}

	getChildCommentsForComment(parent) {
		const comments = this.get();
		return _.filter(comments, (comment) => {
			return comment.parentId == parent.id;
		});
	}
	
}