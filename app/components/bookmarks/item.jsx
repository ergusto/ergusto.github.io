import React from 'react';

// import styles for this component
require('!style!css!sass!./styles/item.scss');

export default class BookmarkItemComponent extends React.Component {

	clickHandler(event) {
		event.preventDefault();
		this.props.setActiveBookmark(this.props.bookmark.id);
	}

	render() {
		const bookmark = this.props.bookmark;

		return (
			<li className="bookmark-item box margin-vertical padding">
				<header>
					<h3 onClick={this.clickHandler.bind(this)} className="bookmark-item-title hover-cursor--pointer muted">{bookmark.title}</h3>
				</header>
				<a href={bookmark.url} className="bookmark-item-url margin-top-sm"><small>{bookmark.url}</small></a>
			</li>
		)
	}

}