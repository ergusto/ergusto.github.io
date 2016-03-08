import React from 'react';

// import styles for this component
require('!style!css!sass!./styles/detail.scss');

export default class TaskDetailComponent extends React.Component {

	setManagerEditingTask(event) {
		event.preventDefault();
		const { task, setEditingTask } = this.props;
		setEditingTask(task);
	}

	toggleCompleted(event) {
		event.preventDefault();
		const { task, tasks } = this.props;
		task.completed = !task.completed;
		tasks.update(task);
	}

	render() {
		const { task } = this.props;
		let completeBtnText = 'mark as complete';

		if (task.completed) completeBtnText = 'mark as active';

		var body;

		if (task.text) {
			body = (<p>{task.text}</p>)
		}

		return (
			<div className="task-detail">
				<h3 className="task-detail-title padding-bottom-sm margin-bottom-sm">{task.title}</h3>
				{body}
				<a onClick={this.setManagerEditingTask.bind(this)} href="#" className="btn margin-top-sm">edit</a>
				<a onClick={this.toggleCompleted.bind(this)} href="#" className="btn margin-top-sm margin-left-sm">{completeBtnText}</a>
			</div>
		)
	}

}