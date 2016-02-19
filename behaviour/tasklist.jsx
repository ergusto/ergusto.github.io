class Tasks {

	constructor() {
		this.tasks = {};
		this.callbacks = {};
		this.callbacks.main = [];
		this.idCount = 0;
	}

	addTask(title, text) {
		const tasks = this;
		const task = {};
		tasks.idCount++;
		
		task.id = tasks.idCount;
		task.title = title;
		task.completed = false;
		task.text = text || '';
		
		tasks.tasks[task.id] = task;

		tasks.broadcast(task);

		return task;
	}

	getTasks() {
		return Object.keys(this.tasks).map(key => this.tasks[key]);
	}

	getTask(id) {
		return this.tasks[id];
	}

	removeTask(id) {
		delete this.tasks[id];
		this.broadcast();
	}

	register(callback, id) {
		if (id) {
			const callbacks = this.callbacks[id] || [];
			callbacks.push(callback);
			this.callbacks[id] = callbacks;
		} else {
			this.callbacks.main.push(callback);
		}
	}

	broadcast(item) {
		const tasks = this;
		if (item) {
			const callbacks = tasks.callbacks[item.id] || [];
			callbacks.forEach(function(callback) {
				callback.call(tasks, item);
			});
		}
		tasks.callbacks.main.forEach(function(callback) {
			callback.call(tasks, item);
		});
	}

}

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
			const task = this.props.tasks.addTask(title, text);
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
			<div className="task-form">
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
		props.tasks.register(this.forceUpdate.bind(this));
	}

	clickHandler(id, event) {
		event.preventDefault();
		this.props.setActiveTask(id);
	} 

	removeHandler(id, event) {
		event.preventDefault();
		this.props.tasks.removeTask(id);
		this.props.clearActiveTask();
	}

	render() {
		const component = this;
		const tasks = this.props.tasks.getTasks();
		let content;

		if (tasks.length) {
			content = tasks.map(function(task) {
				return (
					<li key={task.id}><a href="#" onClick={component.clickHandler.bind(component, task.id)}>{task.title}</a> <a onClick={component.removeHandler.bind(component, task.id)} href="#" className="pull-right remove-task">x</a></li>
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
				<div className="task-detail-body">
					{body}
				</div>
			</div>
		)
	}

}

class App extends React.Component {

	constructor(props) {
		super(props);

		props.tasks.register(this.forceUpdate.bind(this));

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
				const task = this.props.tasks.getTask(this.state.activeTaskId);
				content = <TaskDetail task={task} tasks={this.props.tasks} />
			} else {
				content = (<div><p>No task selected</p></div>);
			}
		}

		return (
			<div className="tasklist flex-col-container">
				<div className="tasklist-sidebar flex-col">
					<div className="flex-col-inner">
						<a onClick={this.newTaskHandler.bind(this)} href="#" className="plus-btn pull-right">+</a>
						<h3>tasks</h3>
						<hr />
						<TaskList tasks={this.props.tasks} setActiveTask={this.setActiveTask.bind(this)} clearActiveTask={this.clearActiveTask.bind(this)} />
					</div>
				</div>
				<div className="tasklist-content flex-col">
					<div className="flex-col-inner">
						{content}
					</div>
				</div>
			</div>
		)
	}

}

const tasks = new Tasks();

tasks.addTask('Get the groceries', 'Some peas, some toothpaste, and some fish stockings.');
tasks.addTask('Clean the bathroom', 'It\'s dirty!');

function renderTodoListComponent() {

	ReactDOM.render(
	    <App tasks={tasks} />,
	    document.getElementById('tasklist-example')
	);

}

renderTodoListComponent();