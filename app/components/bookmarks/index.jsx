import React from 'react';

import BookmarkDetailComponent from './detail.jsx';
import BookmarkListComponent from './list.jsx';
import BookmarkFormComponent from './form.jsx';

import TabbedStateBehaviour from '../../behaviours/tabs.js';
import ActiveModelStateBehaviour from '../../behaviours/active.model.js';

// import styles for this component
require('!style!css!sass!./styles/manager.scss');

export default class BookmarkManagerComponent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
		this.tabs = new TabbedStateBehaviour(this, 'list');
		this.activeBookmark = new ActiveModelStateBehaviour(this);
		props.bookmarks.onUpdate(() => {
			this.forceUpdate();
		});
	}

	getActiveBookmarkId() {
		return this.activeBookmark.current;
	}

	clearActiveBookmark() {
		this.activeBookmark.clear();
		this.tabs.open('list');
	}

	setActiveBookmark(id) {
		this.activeBookmark.set(id);
		this.tabs.open('detail');
	}

	showTab(tab, event) {
		if (event) event.preventDefault();
		this.tabs.open(tab);
	}

	submitCallback(bookmark) {
		this.setActiveBookmark(bookmark.id);
	}

	showEditTab() {
		this.showTab('edit');
	}

	editSubmitCallback(bookmark) {
		this.setActiveBookmark(bookmark.id);
	}

	render() {
		let content;
		const bookmarks = this.props.bookmarks;
		const bookmark = bookmarks.get(this.getActiveBookmarkId());; 
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
			content = (
					<BookmarkDetailComponent 
						bookmarks={bookmarks} 
						bookmark={bookmark} 
						showEditTab={this.showEditTab.bind(this)} 
						submitCallback={this.editSubmitCallback}
						clearActiveBookmark={this.clearActiveBookmark.bind(this)} />
					);
		}

		if (this.tabs.isOpen('edit')) {
			content = <BookmarkFormComponent formTitle='edit' bookmark={bookmark} bookmarks={bookmarks} submitCallback={this.editSubmitCallback.bind(this)} />;
		}

		return (
			 <section className="bookmarks-example full-height padding">

				<div id="bookmarks-example" className="example">

					<div className="bookmark-manager centred">

						<header className="bookmark-manager-header box clearfix">

							<h3 onClick={this.showTab.bind(this, 'list')} className="bookmark-manager-title hover-cursor--pointer pull-left muted padding-left">bookmarks</h3>

							<ul className="bookmark-manager-control horizontal-list-menu--btns padding-horizontal pull-right">

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