import React from 'react';

class TaskForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.state.formError = '';
	}

	addError(error) {
		this.setState({
			formError: error,
		});
	}

	clearError() {
		this.setState({
			formError: null,
		})
	}

	submitHandler(event) {
		event.preventDefault();
		const title = this.refs.taskTitleInput.value;
		const text = this.refs.taskTextInput.value;
		this.clearError();
		if (title.trim().length) {
			const task = this.props.tasks.addModel({title: title, text: text});
			this.props.setActiveTask(task.id);
		} else {
			this.addError('please enter a title');
		}
	}

	render() {
		const err = this.state.formError;
		var errContent;

		if (err) {
			errContent = (<span className="form-error">{err}</span>);
		}

		return (
			<div className="task-form-container">
				<h3>new task</h3>
				<form onSubmit={this.submitHandler.bind(this)} className="task-form">
					<input ref="taskTitleInput" placeholder="title" className="field" name="title" />
					{errContent}
	            	<textarea ref="taskTextInput" placeholder="text" className="field" name="text"></textarea>
					<a onClick={this.submitHandler.bind(this)} className="btn" href="#">submit</a>
				</form>
			</div>
		)

	}

}

class TaskList extends React.Component {

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

class TaskDetail extends React.Component {

	render() {
		const task = this.props.task;

		var body;

		if (task.text) {
			body = (<p>{task.text}</p>)
		}

		return (
			<div className="task-detail">
				<h3>{task.title}</h3>
				{body}
			</div>
		)
	}

}

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
			content = <TaskForm tasks={this.props.tasks} setActiveTask={this.setActiveTask.bind(this)} />
		} else {
			if (this.state.activeTaskId) {
				const task = this.props.tasks.get(this.state.activeTaskId);
				content = <TaskDetail task={task} tasks={this.props.tasks} />
			} else {
				content = (<div><p>No task selected</p></div>);
			}
		}

		return (
			 <section className="full-height tasklist-example">

	            <div id="tasklist-example" className="example">

	            	<div className="tasklist flex-col-container">
						<div className="tasklist-sidebar flex-col">
							<div className="flex-col-inner">
								<a onClick={this.newTaskHandler.bind(this)} href="#" className="plus-btn pull-right">+</a>
								<h3>tasks</h3>
								<hr />
								<TaskList tasks={this.props.tasks} setActiveTask={this.setActiveTask.bind(this)} getActiveTaskId={this.getActiveTaskId.bind(this)} clearActiveTask={this.clearActiveTask.bind(this)} />
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