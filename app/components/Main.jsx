import React from 'react';
import ReactDOM from 'react-dom';

import IntroductionComponent from './introduction/index.jsx';
import CommentListComponent from './comment/index.jsx';
import TaskManagerComponent from './tasklist/index.jsx';

import Comments from '../collections/comments.js';
import Tasks from '../collections/tasks.js';

// end of imports

const container = document.getElementById('container');

const comments = new Comments();

comments.add({
	text: 'This site showcases some of the things I have created. Most examples are interactive. Try replying to or editing this comment.',
	username: 'ergusto',
	date: new Date,
});

comments.add({
	text: 'You can do all sorts of things!',
	username: 'ergusto',
	date: new Date,
});

const tasks = new Tasks();

tasks.add({ title: 'Get the groceries', text: 'Some peas, some toothpaste, and some fish stockings.' });
tasks.add({ title: 'Clean the bathroom', text: 'It\'s dirty!' });

class App extends React.Component {

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