import React from 'react';

// import styles for this component
require('!style!css!sass!./styles/list.scss');

export default class TaskListComponent extends React.Component {

	constructor(props) {
		super(props);
		props.tasks.onChange(() => {
			this.forceUpdate()
		});
	}

	clickHandler(task, event) {
		event.preventDefault();
		this.props.setActiveTask(task);
	} 

	removeHandler(id, event) {
		event.preventDefault();
		const { tasks, showTaskForm } = this.props;
		tasks.remove(id);
		showTaskForm();
	}

	render() {
		const { tasks } = this.props;
		const taskList = tasks.get();
		let content;

		if (taskList.length) {
			content = taskList.map((task) => {
				return (
					<li className="task-item" key={task.id}><a href="#" onClick={this.clickHandler.bind(this, task)}>{task.title}</a> <a onClick={this.removeHandler.bind(this, task.id)} href="#" className="pull-right remove-task">x</a></li>
				);
			});
		} else {
			content = (
				<li>No tasks!</li>
			)
		}

		return (
			<ul className="task-list">{content}</ul>
		)
	}

}