import React from 'react';
const PropTypes = React.PropTypes;

import { isImageUrl } from '../../lib/tools.js';

// import styles for this component
require('!style!css!sass!./styles/item.scss');

export default class BookmarkItemComponent extends React.Component {

	clickHandler(event) {
		event.preventDefault();
		const { bookmark, setActiveBookmark } = this.props;
		setActiveBookmark(bookmark.id);
	}

	render() {
		let imageHtml;
		const { bookmark } = this.props;
		const urlIsImage = isImageUrl(bookmark.url);

		if (urlIsImage) {
			imageHtml = (
				<div className="padding border-bottom box-shadow-inset">
					<img className="bookmark-item-image" src={bookmark.url} />
				</div>
			);
		}

		return (
			<li className="bookmark-item box margin-vertical">
				<header className="border-bottom padding">
					<a href="#" onClick={this.clickHandler.bind(this)}><h3 className="bookmark-item-title hover-cursor--pointer muted">{bookmark.title}</h3></a>
				</header>
				{imageHtml}
				<div className="bookmark-buttons padding-horizontal bg-gray box-shadow-inset">
					<small className="bookmark-item-username pull-right">{bookmark.username}</small>
					<a href={bookmark.url} className=""><small>visit</small></a>
					<a onClick={this.clickHandler.bind(this)} href="#" className="bookmark-item-url margin-left-sm"><small>notes</small></a>
				</div>
			</li>
		)
	}

}

BookmarkItemComponent.propTypes = {
	bookmark: PropTypes.object.isRequired,
	setActiveBookmark: PropTypes.func.isRequired
};