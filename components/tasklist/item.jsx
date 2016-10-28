import React from 'react';

export default class TaskItemComponent extends React.Component {

	render() {
		const { task, clickHandler, removeHandler } = this.props;
		let taskTitleHtml = task.title;
		if (task.completed) taskTitleHtml = <strike>{task.title}</strike>;

		return (
			<li className="task-item" key={task.id}>
				<a href="#" onClick={clickHandler}>{taskTitleHtml}</a>
				<a onClick={removeHandler} href="#" className="pull-right remove-task">x</a>
			</li>
		);
	}

}