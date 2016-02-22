import React from 'react';

import TaskFormComponent from './form.jsx';
import TaskDetailComponent from './detail.jsx';
import TaskListComponent from './list.jsx';

export default class TaskManagerComponent extends React.Component {

	constructor(props) {
		super(props);
		const component = this;
		props.tasks.register(function() {
			component.forceUpdate()
		});

		this.state = {};
		this.state.shouldShowNewTaskForm = true;
		this.state.activeTaskId = null;
	}

	setActiveTask(id) {
		this.hideNewTaskForm();
		this.setState({
			activeTaskId: id,
		});
	}

	getActiveTaskId() {
		return this.state.activeTaskId;
	}

	clearActiveTask() {
		this.setActiveTask(null);
	}

	showNewTaskForm() {
		this.setState({
			shouldShowNewTaskForm: true,
		})
	}

	hideNewTaskForm() {
		this.setState({
			shouldShowNewTaskForm: false,
		})
	}

	newTaskHandler(event) {
		event.preventDefault();
		this.showNewTaskForm();
	}

	render() {
		var content;

		if (this.state.shouldShowNewTaskForm) {
			content = <TaskFormComponent tasks={this.props.tasks} setActiveTask={this.setActiveTask.bind(this)} />
		} else {
			if (this.state.activeTaskId) {
				const task = this.props.tasks.get(this.state.activeTaskId);
				content = <TaskDetailComponent task={task} tasks={this.props.tasks} />
			} else {
				content = (<div><p>No task selected</p></div>);
			}
		}

		return (
			 <section className="full-height panel tasklist-example">

	            <div id="tasklist-example" className="example">

	            	<div className="tasklist flex-col-container">
						<div className="tasklist-sidebar flex-col">
							<div className="flex-col-inner">
								<a onClick={this.newTaskHandler.bind(this)} href="#" className="plus-btn pull-right">+</a>
								<h3>tasks</h3>
								<hr />
								<TaskListComponent tasks={this.props.tasks} setActiveTask={this.setActiveTask.bind(this)} getActiveTaskId={this.getActiveTaskId.bind(this)} clearActiveTask={this.clearActiveTask.bind(this)} />
							</div>
						</div>
						<div className="tasklist-content flex-col">
							<div className="flex-col-inner">
								{content}
							</div>
						</div>
					</div>

	            </div>

	        </section>
		)
	}

}