import React from 'react';

// import styles for this component
require('!style!css!sass!./styles/list.scss');

export default class TaskListComponent extends React.Component {

	constructor(props) {
		super(props);
		const component = this;
		props.tasks.register(function() {
			component.forceUpdate()
		});
	}

	clickHandler(id, event) {
		event.preventDefault();
		this.props.setActiveTask(id);
	} 

	removeHandler(id, event) {
		event.preventDefault();
		this.props.tasks.remove(id);
		this.props.clearActiveTask();
	}

	render() {
		const tasks = this.props.tasks.get();
		let content;

		if (tasks.length) {
			content = tasks.map((task) => {
				return (
					<li key={task.id}><a href="#" onClick={this.clickHandler.bind(this, task.id)}>{task.title}</a> <a onClick={this.removeHandler.bind(this, task.id)} href="#" className="pull-right remove-task">x</a></li>
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