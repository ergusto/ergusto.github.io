import React from 'react';

import BookmarkListComponent from './list.jsx';
import BookmarkFormComponent from './form.jsx';

import TabbedStateBehaviour from '../../behaviours/tabs.js';

// import styles for this component
require('!style!css!sass!./styles/manager.scss');

export default class BookmarkManagerComponent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
		this.tabs = new TabbedStateBehaviour(this, 'list');
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
		let listTabClass = tabClass;
		let addTabClass = tabClass;

		if (this.tabs.isOpen('list')) {
			listTabClass += ' active';
			content = <BookmarkListComponent bookmarks={bookmarks} />;

		}

		if (this.tabs.isOpen('add')) {
			addTabClass += ' active';
			content = <BookmarkFormComponent bookmarks={bookmarks} submitCallback={this.submitCallback.bind(this)} />;
		}

		return (
			 <section className="bookmarks-example full-height panel">

				<div id="bookmarks-example" className="example">

					<div className="bookmark-manager centred">

						<header className="bookmark-manager-header box clearfix">

							<h3 className="bookmark-manager-title pull-left muted padding">bookmarks</h3>

							<ul className="bookmark-manager-control horizontal-list-menu horizontal-list-menu--btns pull-right">

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