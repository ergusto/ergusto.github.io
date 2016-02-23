import React from 'react';

import TaskFormComponent from './form.jsx';
import TaskDetailComponent from './detail.jsx';
import TaskListComponent from './list.jsx';

import ActiveModelBehaviour from '../../behaviours/active.model.js';

export default class TaskManagerComponent extends React.Component {

	constructor(props) {
		super(props);
		props.tasks.onChange(() => {
			this.forceUpdate()
		});

		this.state = {};
		//dont forget about this
		this.activeTaskDetail = new ActiveModelBehaviour(this);
		this.activeEditTask = new ActiveModelBehaviour(this);
		this.state.shouldShowNewTaskForm = true;
	}

	clearActiveTaskDetail() {
		this.activeTaskDetail.clear();
	}

	clearActiveEditTask() {
		this.activeEditTask.clear();
	}

	hideAll() {
		this.clearActiveTaskDetail();
		this.clearActiveEditTask();
		this.setState({
			shouldShowNewTaskForm: false
		});
	}

	setEditingTask(id) {
		this.hideAll();
		this.activeEditTask.set(id);
	}

	setActiveTask(id) {
		this.hideAll();
		this.activeTaskDetail.set(id);
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
		const editTaskId = this.activeEditTask.current;
		const activeTaskId = this.activeTaskDetail.current;

		let content;
		let task;

		if (activeTaskId) {
			task = this.props.tasks.get(activeTaskId);
			content = <TaskDetailComponent task={task} tasks={this.props.tasks} setEditingTask={this.setEditingTask.bind(this)} />
		}

		if (editTaskId) {
			task = this.props.tasks.get(editTaskId);
			content = <TaskFormComponent task={task} tasks={this.props.tasks} setActiveTask={this.setActiveTask.bind(this)} />
		}

		if (this.state.shouldShowNewTaskForm || !content) {
			content = <TaskFormComponent tasks={this.props.tasks} setActiveTask={this.setActiveTask.bind(this)} />
		}

		return (
			 <section className="tasklist-example full-height panel justify-centre">

				<div id="tasklist-example" className="example">

					<div className="tasklist flex-col-container">
						<div className="tasklist-sidebar flex-col">
							<div className="flex-col-inner">
								<header className="tasklist-sidebar-header padding-bottom-sm margin-bottom-sm">
									<a onClick={this.newTaskHandler.bind(this)} href="#" className="plus-btn pull-right">+</a>
									<h3 className="tasklist-sidebar-title">tasks</h3>
								</header>
								<TaskListComponent
									tasks={this.props.tasks} 
									setActiveTask={this.setActiveTask.bind(this)} 
									clearActiveTask={this.clearActiveTaskDetail.bind(this)} 
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