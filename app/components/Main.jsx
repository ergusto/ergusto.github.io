import React from 'react';
import ReactDOM from 'react-dom';

import IntroductionComponent from './introduction.jsx';
import CommentListComponent from './comment.jsx';
import TaskManagerComponent from './tasklist.jsx';

import Comments from '../collections/comments.js';
import Tasks from '../collections/tasks.js';

// end of imports

const container = document.getElementById('container');

const comments = new Comments();
const commentText = 'This site showcases some of the things I have created. Most examples are interactive. Try replying to or editing this comment.';
comments.add({text: commentText});

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