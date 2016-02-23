import React from 'react';

import TaskFormComponent from './form.jsx';
import TaskDetailComponent from './detail.jsx';
import TaskListComponent from './list.jsx';

export default class TaskManagerComponent extends React.Component {

	constructor(props) {
		super(props);
		props.tasks.onChange(() => {
			this.forceUpdate()
		});

		this.state = {};
		this.state.editTaskId = null;
		this.state.activeTaskId = null;
		this.state.shouldShowNewTaskForm = true;
	}

	getActiveTaskId() {
		return this.state.activeTaskId;
	}

	clearActiveTask() {
		this.setActiveTask(null);
	}

	hideAll() {
		this.setState({
			editTaskId: null,
			activeTaskId: null,
			shouldShowNewTaskForm: false
		});
	}

	setEditingTask(id) {
		this.hideAll();
		this.setState({
			editTaskId: id
		});
	}

	setActiveTask(id) {
		this.hideAll();
		this.setState({
			activeTaskId: id
		});
	}

	showNewTaskForm() {
		this.hideAll();
		this.setState({
			shouldShowNewTaskForm: true
		})
	}

	hideNewTaskForm() {
		this.setState({
			shouldShowNewTaskForm: false
		})
	}

	newTaskHandler(event) {
		event.preventDefault();
		this.showNewTaskForm();
	}

	render() {
		const editTaskId = this.state.editTaskId;
		const activeTaskId = this.state.activeTaskId;

		let content;
		let task;

		if (activeTaskId) {
			task = this.props.tasks.get(activeTaskId);
			content = <TaskDetailComponent task={task} tasks={this.props.tasks} />
		}

		if (editTaskId) {
			task = this.props.tasks.get(editTaskId);
			content = <TaskFormComponent task={task} tasks={this.props.tasks} />
		}

		if (this.state.shouldShowNewTaskForm || !content) {
			content = <TaskFormComponent tasks={this.props.tasks} setActiveTask={this.setActiveTask.bind(this)} />
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
								<TaskListComponent
									tasks={this.props.tasks} 
									setActiveTask={this.setActiveTask.bind(this)} 
									clearActiveTask={this.clearActiveTask.bind(this)} 
								/>
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