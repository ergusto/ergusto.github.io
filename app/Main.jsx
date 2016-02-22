import React from 'react';
import ReactDOM from 'react-dom';

import IntroductionComponent from './components/introduction/index.jsx';
import CommentListComponent from './components/comment/index.jsx';
import TaskManagerComponent from './components/tasklist/index.jsx';
import CalendarComponent from './components/calendar/index.jsx';

import Comments from './collections/comments.js';
import Tasks from './collections/tasks.js';

import User from './lib/user.js';

// import generic/site wide styles
require('!style!css!sass!./styles/app.scss');

// end of imports

const container = document.getElementById('container');

const user = new User();
const comments = new Comments();
const tasks = new Tasks();

class App extends React.Component {

	componentDidMount() {
		const shouldShowAnimation = this.props.user.shouldSeeIntroAnimation();
		if (shouldShowAnimation) window.scrollTo(0,0);  
	}

	render() {
		const user = this.props.user;

		return (
			<div>
				<IntroductionComponent user={user} />
				{/*<CalendarComponent />*/}
				<CommentListComponent user={user} comments={comments} />
				<TaskManagerComponent user={user} tasks={tasks} />
			</div>
		)

	}

}

ReactDOM.render(<App user={user} />, container);