import React from 'react';

// import styles for this component
require('!style!css!sass!./styles/detail.scss');

export default class BookmarkDetailComponent extends React.Component {

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
				</div>
			</div>
		)
	}

}