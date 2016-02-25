import React from 'react';

import Tools from '../../lib/tools.js';

// import styles for this component
require('!style!css!sass!./styles/detail.scss');

export default class BookmarkDetailComponent extends React.Component {

	removeHandler(event) {
		event.preventDefault();
		this.props.bookmarks.remove(this.props.bookmark.id);
		this.props.clearActiveBookmark();
	}

	isImageUrl() {
		return Tools.isImageUrl(this.props.bookmark.url);
	}

	editHandler(event) {
		event.preventDefault();
		this.props.showEditTab();
	}

	render() {
		let imageHtml;
		let notesHtml;
		const bookmark = this.props.bookmark;
		const isImageUrl = this.isImageUrl();

		if (isImageUrl) {
			imageHtml = (
				<div className="padding-horizontal padding-vertical-sm border-bottom box-shadow-inset">
					<img className="bookmark-item-image" src={bookmark.url} />
				</div>
			);
		}

		if (bookmark.notes.length) {
			notesHtml = (
				<div className="padding border-top">
					<small className="muted">notes</small>
					<p>{bookmark.notes}</p>
				</div>
			)
		}

		return (
			<div className="bookmark-detail box margin-vertical">
				<header className="box-header padding">
					<h3 className="bookmark-title">{bookmark.title}</h3>
				</header>
				{imageHtml}
				<div className="padding-horizontal padding-vertical-sm">
					<a onClick={this.editHandler.bind(this)} href="#" className="btn margin-right-sm">edit</a>
					<a onClick={this.removeHandler.bind(this)} href="#" className="btn">delete</a>
				</div>
				{notesHtml}
			</div>
		)
	}

}