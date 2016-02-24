import React from 'react';

// import styles for this component
require('!style!css!sass!./styles/detail.scss');

export default class BookmarkDetailComponent extends React.Component {

	removeHandler(event) {
		event.preventDefault();
		this.props.bookmarks.remove(this.props.bookmark.id);
		this.props.clearActiveBookmark();
	}

	render() {
		const bookmark = this.props.bookmark;

		return (
			<div className="bookmark-detail box margin-vertical">
				<header className="box-header padding">
					<h3 className="bookmark-title">{bookmark.title}</h3>
				</header>
				<div className="padding">
					<small className="muted">notes</small>
					<p>{bookmark.notes}</p>
					<a onClick={this.removeHandler.bind(this)} href="#" className="btn margin-top-sm">delete</a>
				</div>
			</div>
		)
	}

}