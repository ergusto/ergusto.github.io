import React from 'react';

import Tools from '../../lib/tools.js';

const PropTypes = React.PropTypes;

// import styles for this component
require('!style!css!sass!./styles/detail.scss');

export default class BookmarkDetailComponent extends React.Component {

	removeHandler(event) {
		event.preventDefault();
		this.props.bookmarks.remove(this.props.bookmark.id);
		this.props.clearActiveBookmark();
	}

	editHandler(event) {
		event.preventDefault();
		this.props.showEditTab();
	}

	render() {
		let imageHtml;
		let notesHtml;
		const bookmark = this.props.bookmark;
		const isImageUrl = Tools.isImageUrl(bookmark.url);

		if (isImageUrl) {
			imageHtml = (
				<div className="padding border-bottom box-shadow-inset">
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
				<div className="bookmark-buttons padding-horizontal padding-vertical-sm bg-gray">
					<a href={bookmark.url}><small>visit</small></a>
					<a onClick={this.editHandler.bind(this)} href="#" className="margin-left-sm"><small>edit</small></a>
					<a onClick={this.removeHandler.bind(this)} href="#" className="margin-left-sm"><small>delete</small></a>
				</div>
				{notesHtml}
			</div>
		)
	}

}

BookmarkDetailComponent.propTypes = {
	bookmark: PropTypes.object.isRequired,
	bookmarks: PropTypes.object.isRequired,
	submitCallback: PropTypes.func.isRequired,
	clearActiveBookmark: PropTypes.func.isRequired
};