import React from 'react';
import { isImageUrl } from '../../lib/tools.js';

const PropTypes = React.PropTypes;

// import styles for this component
require('!style!css!sass!./styles/detail.scss');

export default class BookmarkDetailComponent extends React.Component {

	removeHandler(event) {
		event.preventDefault();
		const { bookmark, bookmarks, clearActiveBookmark } = this.props;
		bookmarks.remove(bookmark.id);
		clearActiveBookmark();
	}

	editHandler(event) {
		event.preventDefault();
		this.props.showEditTab();
	}

	render() {
		let imageHtml;
		let notesHtml;
		const { bookmark } = this.props;
		const urlIsImage = isImageUrl(bookmark.url);

		if (urlIsImage) {
			imageHtml = (
				<div className="padding border-bottom box-shadow-inset">
					<img className="bookmark-item-image" src={bookmark.url} />
				</div>
			);
		}

		if (bookmark.notes.length) {
			notesHtml = (
				<div className="padding padding-vertical-sm  border-top box-shadow-inset">
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
				<div className="bookmark-buttons padding-horizontal padding-vertical-sm bg-gray box-shadow-inset">
					<small className="bookmark-detail-username pull-right">{bookmark.username}</small>
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