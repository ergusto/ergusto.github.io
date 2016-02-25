import React from 'react';

import TaskFormComponent from './form.jsx';
import TaskDetailComponent from './detail.jsx';
import TaskListComponent from './list.jsx';

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
		console.log(this);
	}

	newTaskHandler(event) {
		event.preventDefault();
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
		const activeTaskId = this.activeTask.current;
		if (activeTaskId) {
			task = this.props.tasks.get(activeTaskId);
		}

		if (tabs.isOpen('new')) {
			content = <TaskFormComponent tasks={this.props.tasks} submitCallback={this.activateTask.bind(this)} />
		}

		if (tabs.isOpen('detail')) {
			content = <TaskDetailComponent task={task} tasks={this.props.tasks} setEditingTask={this.editTask.bind(this)} />
		}

		if (tabs.isOpen('edit')) {
			content = <TaskFormComponent task={task} tasks={this.props.tasks} submitCallback={this.activateTask.bind(this)} />
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
									setActiveTask={this.activateTask.bind(this)} 
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