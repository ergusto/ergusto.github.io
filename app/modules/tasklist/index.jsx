import React from 'react';

import TaskDetailComponent from './detail.jsx';
import TaskListComponent from './list.jsx';
import TaskEditFormComponent from './form.edit.jsx';
import TaskCreateFormComponent from './form.create.jsx';

import TabbedStateBehaviour from '../../behaviours/tabs.js';
import ActiveModelStateBehaviour from '../../behaviours/active.model.js';

export default class TaskManagerComponent extends React.Component {

	constructor(props) {
		super(props);
		props.tasks.onChange(() => {
			this.forceUpdate()
		});

		this.state = {};
		this.tabs = new TabbedStateBehaviour(this, 'new');
		this.activeTask = new ActiveModelStateBehaviour(this);
	}

	newTaskHandler(event) {
		if (event) event.preventDefault();
		this.tabs.open('new');
	}

	activateTask(task) {
		this.activeTask.set(task.id);
		this.tabs.open('detail');
	}

	editTask(task) {
		this.activeTask.set(task.id);
		this.tabs.open('edit');
	}

	render() {
		let task;
		let content;
		const tabs = this.tabs;
		const { tasks } = this.props;
		const activeTaskId = this.activeTask.current;
		
		if (activeTaskId) {
			task = tasks.get(activeTaskId);
		}

		if (tabs.isOpen('new')) {
			content = <TaskCreateFormComponent tasks={tasks} submitCallback={this.activateTask.bind(this)} />
		}

		if (tabs.isOpen('detail')) {
			content = <TaskDetailComponent task={task} tasks={tasks} setEditingTask={this.editTask.bind(this)} />
		}

		if (tabs.isOpen('edit')) {
			content = <TaskEditFormComponent task={task} tasks={tasks} submitCallback={this.activateTask.bind(this)} />
		}

		return (
			 <section className="tasklist-example full-height padding justify-centre">

				<div className="example">

					<div className="tasklist box flex-col-container">
						<div className="tasklist-sidebar border-right flex-col">
							<div className="flex-col-inner">
								<header className="tasklist-sidebar-header padding-bottom-sm margin-bottom-sm">
									<a onClick={this.newTaskHandler.bind(this)} href="#" className="plus-btn pull-right">+</a>
									<h3 className="tasklist-sidebar-title">tasks</h3>
								</header>
								<TaskListComponent
									tasks={tasks} 
									setActiveTask={this.activateTask.bind(this)}
									showTaskForm={this.newTaskHandler.bind(this)} 
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