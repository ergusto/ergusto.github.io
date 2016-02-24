import React from 'react';

import BookmarkDetailComponent from './detail.jsx';
import BookmarkListComponent from './list.jsx';
import BookmarkFormComponent from './form.jsx';

import TabbedStateBehaviour from '../../behaviours/tabs.js';
import ActiveModelBehaviour from '../../behaviours/active.model.js';

// import styles for this component
require('!style!css!sass!./styles/manager.scss');

export default class BookmarkManagerComponent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
		this.tabs = new TabbedStateBehaviour(this, 'list');
		this.activeBookmark = new ActiveModelBehaviour(this);
		props.bookmarks.onUpdate(() => {
			this.forceUpdate();
		});
	}

	getActiveBookmarkId() {
		return this.activeBookmark.current;
	}

	clearActiveBookmark() {
		this.activeBookmark.clear();
	}

	setActiveBookmark(id) {
		this.activeBookmark.set(id);
		this.tabs.open('detail');
	}

	showTab(tab, event) {
		event.preventDefault();
		this.tabs.open(tab);
	}

	submitCallback(bookmark) {
		this.tabs.open('list');
	}

	render() {
		let content;
		const bookmarks = this.props.bookmarks;
		const tabClass = 'btn';
		const activeClass = ' active';
		let listTabClass = tabClass;
		let addTabClass = tabClass;

		if (this.tabs.isOpen('list')) {
			listTabClass += activeClass;
			content = <BookmarkListComponent setActiveBookmark={this.setActiveBookmark.bind(this)} bookmarks={bookmarks} />;
		}

		if (this.tabs.isOpen('add')) {
			addTabClass += activeClass;
			content = <BookmarkFormComponent bookmarks={bookmarks} submitCallback={this.submitCallback.bind(this)} />;
		}

		if (this.tabs.isOpen('detail')) {
			const bookmark = bookmarks.get(this.getActiveBookmarkId());
			content = <BookmarkDetailComponent bookmark={bookmark} />
		}

		return (
			 <section className="bookmarks-example full-height panel">

				<div id="bookmarks-example" className="example">

					<div className="bookmark-manager centred">

						<header className="bookmark-manager-header box clearfix">

							<h3 onClick={this.showTab.bind(this, 'list')} className="bookmark-manager-title hover-cursor--pointer pull-left muted padding-vertical padding-left">bookmarks</h3>

							<ul className="bookmark-manager-control horizontal-list-menu--btns pull-right">

								<li><a onClick={this.showTab.bind(this, 'list')} href="#" className={listTabClass}>list</a></li>
								<li><a onClick={this.showTab.bind(this, 'add')} href="#" className={addTabClass}>add</a></li>

							</ul>

						</header>
					
						{content}

					</div>

				</div>

			</section>
		)
	}

}