import React from 'react';
import ReactDOM from 'react-dom';

import IntroductionComponent from './components/introduction/index.jsx';
import CommentListComponent from './components/comment/index.jsx';
import TaskManagerComponent from './components/tasklist/index.jsx';
import CalendarComponent from './components/calendar/index.jsx';

import Comments from './collections/comments.js';
import Tasks from './collections/tasks.js';

// end of imports

const container = document.getElementById('container');

const comments = new Comments();

const tasks = new Tasks();

class App extends React.Component {

	componentDidMount() {   
		window.scrollTo(0,0);  
	}

	render() {

		return (
			<div>
				<IntroductionComponent />
				<CommentListComponent comments={comments} />
				<TaskManagerComponent tasks={tasks} />
			</div>
		)

	}

}

ReactDOM.render(<App />, container);