import React from 'react';
const PropTypes = React.PropTypes;

import Tools from '../../lib/tools.js';

// import styles for this component
require('!style!css!sass!./styles/item.scss');

export default class BookmarkItemComponent extends React.Component {

	clickHandler(event) {
		event.preventDefault();
		this.props.setActiveBookmark(this.props.bookmark.id);
	}

	render() {
		let imageHtml;
		const { bookmark } = this.props;
		const isImageUrl = Tools.isImageUrl(bookmark.url);

		if (isImageUrl) {
			imageHtml = (
				<div className="padding border-bottom box-shadow-inset">
					<img className="bookmark-item-image" src={bookmark.url} />
				</div>
			);
		}

		return (
			<li className="bookmark-item box margin-vertical">
				<header className="border-bottom padding">
					<h3 onClick={this.clickHandler.bind(this)} className="bookmark-item-title hover-cursor--pointer muted">{bookmark.title}</h3>
				</header>
				{imageHtml}
				<div className="bookmark-buttons padding-horizontal bg-gray">
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