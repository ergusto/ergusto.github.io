import React from 'react';

import Tools from '../../lib/tools.js';

// import styles for this component
require('!style!css!sass!./styles/item.scss');

export default class BookmarkItemComponent extends React.Component {

	clickHandler(event) {
		event.preventDefault();
		this.props.setActiveBookmark(this.props.bookmark.id);
	}

	isImageUrl() {
		return Tools.isImageUrl(this.props.bookmark.url);
	}

	render() {
		let imageHtml;
		const bookmark = this.props.bookmark;
		const isImageUrl = this.isImageUrl();

		if (isImageUrl) {
			return (
				<li className="bookmark-item box margin-vertical">
					<header className="padding border-bottom">
						<h3 onClick={this.clickHandler.bind(this)} className="bookmark-item-title hover-cursor--pointer muted">{bookmark.title}</h3>
					</header>
					<div className="padding-sm border-bottom box-shadow-inset">
						<img className="bookmark-item-image" src={bookmark.url} />
					</div>
					<div className="padding">
						<a href={bookmark.url} className="bookmark-item-url"><small>{bookmark.url}</small></a>
					</div>
				</li>
			)
		} else {
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

}