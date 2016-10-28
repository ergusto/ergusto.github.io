import React from 'react';
import ReactDOM from 'react-dom';

import IntroductionComponent from './modules/introduction/index.jsx';
import BookmarkManagerComponent from './modules/bookmarks/index.jsx';
import CommentListComponent from './modules/comments/index.jsx';
import TaskManagerComponent from './modules/tasklist/index.jsx';
import CalendarManagerComponent from './modules/calendar/index.jsx';
import ContactInfoComponent from './modules/contact/index.jsx';

import Bookmarks from './collections/bookmarks.js';
import Comments from './collections/comments.js';
import Tasks from './collections/tasks.js';
import Diary from './collections/diary.js';

import User from './lib/user.js';

// import generic/site wide styles
require('!style!css!sass!./styles/app.scss');

// end of imports

const container = document.getElementById('container');

const user = new User();

const bookmarks = new Bookmarks();
const comments = new Comments();
const tasks = new Tasks();
const diary = new Diary();

class App extends React.Component {

	componentDidMount() {
		const { user } = this.props;
		if (user.shouldShowAnimation) window.scrollTo(0,0);  
	}

	render() {
		const { user } = this.props;

		return (
			<div>
				<IntroductionComponent user={user} />
				<CommentListComponent user={user} comments={comments} />
				<CalendarManagerComponent user={user} diary={diary} />
				<BookmarkManagerComponent user={user} bookmarks={bookmarks} />
				{/*<TaskManagerComponent user={user} tasks={tasks} />*/}
				<ContactInfoComponent />
			</div>
		)

	}

}

ReactDOM.render(<App user={user} />, container);