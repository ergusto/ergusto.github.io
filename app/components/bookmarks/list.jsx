import React from 'react';

// import styles for this component
require('!style!css!sass!./styles/list.scss');

export default class BookmarkListComponent extends React.Component {

	constructor(props) {
		super(props);
		props.bookmarks.onChange(() => {
			this.forceUpdate()
		});
	}

	clickHandler(id, event) {
		event.preventDefault();
		this.props.setActiveBookmark(id);
	}

	render() {
		const bookmarks = this.props.bookmarks.get();
		let content;

		if (bookmarks.length) {
			content = bookmarks.map((bookmark) => {
				return (
					<div onClick={this.clickHandler.bind(this, bookmark.id)} key={bookmark.id} className="bookmark-item box margin-vertical padding">
						<p>{bookmark.title}</p>
						<p>{bookmark.url}</p>
					</div>
				);
			});
		} else {
			content = (
				<li>No bookmarks!</li>
			);
		}

		return (
			<ul className="bookmark-list">{content}</ul>
		);
	}

}