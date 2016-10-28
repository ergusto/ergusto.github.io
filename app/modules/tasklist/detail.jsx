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
		let toggleCompleteBtnText = 'mark as complete';

		if (task.completed) toggleCompleteBtnText = 'mark as active';

		let body;

		if (task.description) {
			body = <p>{task.description}</p>;
		}

		return (
			<div className="task-detail">
				<h3 className="task-detail-title padding-bottom-sm margin-bottom-sm">{task.title}</h3>
				<a onClick={this.setManagerEditingTask.bind(this)} href="#" className="btn margin-bottom-sm">edit</a>
				<a onClick={this.toggleCompleted.bind(this)} href="#" className="btn margin-bottom-sm margin-left-sm">{toggleCompleteBtnText}</a>
				{body}
			</div>
		)
	}

}