import React from 'react';
const PropTypes = React.PropTypes;

import BookmarkListComponent from './list.jsx';
import BookmarkDetailComponent from './detail.jsx';
import BookmarkEditFormComponent from './form.edit.jsx';
import BookmarkCreateFormComponent from './form.create.jsx';

import TabbedStateBehaviour from '../../behaviours/tabs.js';
import ActiveModelStateBehaviour from '../../behaviours/active.model.js';

const tabs = {list: 'list', detail: 'detail', edit: 'edit', add: 'add'};

// import styles for this component
require('!style!css!sass!./styles/manager.scss');

export default class BookmarkManagerComponent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
		this.tabs = new TabbedStateBehaviour(this, tabs.list);
		this.activeBookmark = new ActiveModelStateBehaviour(this);
		props.bookmarks.onUpdate(() => {
			this.forceUpdate();
		});
	}

	getActiveBookmark() {
		const { bookmarks } = this.props;
		return bookmarks.get(this.activeBookmark.current);
	}

	clearActiveBookmark() {
		this.activeBookmark.clear();
		this.showTab(tabs.list);
	}

	setActiveBookmark(id) {
		this.activeBookmark.set(id);
		this.showTab(tabs.detail);
	}

	showTab(tab, event) {
		if (event) event.preventDefault();
		this.tabs.open(tab);
	}

	submitCallback(bookmark) {
		this.setActiveBookmark(bookmark.id);
	}

	showEditTab() {
		this.showTab(tabs.edit);
	}

	editSubmitCallback(bookmark) {
		this.setActiveBookmark(bookmark.id);
	}

	render() {
		let content;
		const { bookmarks, user } = this.props;
		const bookmark = this.getActiveBookmark(); 
		const tabClass = 'btn';
		const activeClass = ' active';
		let listTabClass = tabClass;
		let addTabClass = tabClass;

		if (this.tabs.isOpen(tabs.list)) {
			listTabClass += activeClass;
			content = <BookmarkListComponent setActiveBookmark={this.setActiveBookmark.bind(this)} bookmarks={bookmarks} />;
		}

		if (this.tabs.isOpen(tabs.add)) {
			addTabClass += activeClass;
			content = <BookmarkCreateFormComponent user={user} bookmarks={bookmarks} submitCallback={this.submitCallback.bind(this)} />;
		}

		if (this.tabs.isOpen(tabs.detail)) {
			content = <BookmarkDetailComponent 
						bookmarks={bookmarks} 
						bookmark={bookmark} 
						showEditTab={this.showEditTab.bind(this)} 
						submitCallback={this.editSubmitCallback}
						clearActiveBookmark={this.clearActiveBookmark.bind(this)} />;
		}

		if (this.tabs.isOpen(tabs.edit)) {
			function cancelEditCallback(event) {
				event.preventDefault();
				this.setActiveBookmark(bookmark.id);
			}
			content = <BookmarkEditFormComponent formTitle='edit' user={user} bookmark={bookmark} bookmarks={bookmarks} submitCallback={this.editSubmitCallback.bind(this)} cancelCallback={cancelEditCallback.bind(this)} />;
		}

		return (
			 <section className="bookmarks-example full-height justify-centre padding">

				<div className="example">

					<div className="bookmark-manager centred">

						<header className="bookmark-manager-header box clearfix">

							<h3 onClick={this.showTab.bind(this, 'list')} className="bookmark-manager-title hover-cursor--pointer pull-left muted padding-left">bookmarks</h3>

							<ul className="bookmark-manager-control horizontal-list-menu--btns padding-horizontal pull-right">

								<li><a onClick={this.showTab.bind(this, tabs.list)} href="#" className={listTabClass}>list</a></li>
								<li><a onClick={this.showTab.bind(this, tabs.add)} href="#" className={addTabClass}>add</a></li>

							</ul>

						</header>
					
						{content}

					</div>

				</div>

			</section>
		)
	}

}

BookmarkManagerComponent.propTypes = {
	user: PropTypes.object.isRequired,
	bookmarks: PropTypes.object.isRequired
};