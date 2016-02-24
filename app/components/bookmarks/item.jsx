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
					<div className="padding-horizontal padding-vertical-sm border-bottom box-shadow-inset">
						<img className="bookmark-item-image" src={bookmark.url} />
					</div>
					<div className="padding-horizontal padding-vertical-sm">
						<a  onClick={this.clickHandler.bind(this)} href="" className="bookmark-item-url btn">view</a>
						<a href={bookmark.url} className="bookmark-item-url btn margin-left-sm">go to</a>
					</div>
				</li>
			)
		} else {
			return (
				<li className="bookmark-item box margin-vertical">
					<header className="border-bottom padding">
						<h3 onClick={this.clickHandler.bind(this)} className="bookmark-item-title hover-cursor--pointer muted">{bookmark.title}</h3>
					</header>
					<div className="padding-horizontal padding-vertical-sm">
						<a onClick={this.clickHandler.bind(this)} href="#" className="bookmark-item-url btn">view</a>
						<a href={bookmark.url} className="bookmark-item-url btn margin-left-sm">go to</a>
					</div>
				</li>
			)
		}
	}

}