import React from 'react';

// import styles for this component
require('!style!css!sass!./styles/detail.scss');

export default class TaskDetailComponent extends React.Component {

	setManagerEditingTask(event) {
		event.preventDefault();
		this.props.setEditingTask(this.props.task.id);
	}

	render() {
		const task = this.props.task;

		var body;

		if (task.text) {
			body = (<p>{task.text}</p>)
		}

		return (
			<div className="task-detail">
				<h3>{task.title}</h3>
				{body}
				<a onClick={this.setManagerEditingTask.bind(this)} href="#" className="btn margin-top-sm">edit</a>
			</div>
		)
	}

}