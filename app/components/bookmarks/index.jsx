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

	componentDidMount() {
		// necessary to set state on this component from the behaviour definition
		// as it can't be done in the constructor
		this.tabs.init();
	}

	showTab(tab, event) {
		event.preventDefault();
		this.tabs.open(tab);
	}

	render() {
		let content;
		const bookmarks = this.props.bookmarks;

		if (this.tabs.isOpen('list')) {
			content = <BookmarkListComponent bookmarks={bookmarks} />;
		}

		if (this.tabs.isOpen('add')) {
			content = <BookmarkFormComponent bookmarks={bookmarks} />;
		}

		return (
			 <section className="bookmarks-example full-height panel">

				<div id="bookmarks-example" className="example">

					<div className="bookmark-manager box centred margin-top">

						<header className="bookmark-manager-header clearfix">

							<h3 className="bookmark-manager-title pull-left muted padding">bookmarks</h3>

							<ul className="bookmark-manager-control horizontal-list-menu horizontal-list-menu--btns pull-right">

								<li><a onClick={this.showTab.bind(this, 'list')} href="#" className="btn">list</a></li>
								<li><a onClick={this.showTab.bind(this, 'add')} href="#" className="btn">add</a></li>

							</ul>

						</header>
					
						{content}

					</div>

				</div>

			</section>
		)
	}

}