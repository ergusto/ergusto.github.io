class Tasks {

	constructor() {
		this.tasks = {};
		this.callbacks = {};
		this.callbacks.main = [];
		this.idCount = 0;
	}

	addTask(title, text) {
		this.idCount++;
		const task = {};
		
		task.id = this.idCount;
		task.title = title;
		task.completed = false;
		task.text = text || '';
		
		this.tasks[task.id] = task;

		this.broadcast(task, task.id);

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

	registerChangeCallback(callback, id) {
		if (id) {
			const callbacks = this.callbacks[id] || [];
			callbacks.push(callback);
			this.callbacks[id] = callbacks;
		} else {
			this.callbacks.main.push(callback);
		}
	}

	broadcast(item, id) {
		const callbacks = id ? this.callbacks[id] || [] : this.callbacks.main;
		for (let i = 0, l = callbacks.length; i < l; i++) {
			callbacks[i].call(this, item);
		}
	}

}

class TaskForm extends React.Component {

	submitHandler(event) {
		event.preventDefault();
		const title = this.refs.taskTitleInput.value;
		const text = this.refs.taskTextInput.value;
		if (title.trim().length) {
			const task = this.props.tasks.addTask(title, text);
			this.props.setActiveTask(task.id);
		}
	}

	render() {

		return (
			<div className="task-form">
				<h3>new task</h3>
				<form onSubmit={this.submitHandler.bind(this)} className="task-form">
					<input ref="taskTitleInput" placeholder="task" className="field" name="title" />
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
		props.tasks.registerChangeCallback(this.forceUpdate.bind(this));
	}

	clickHandler(id, event) {
		event.preventDefault();
		this.props.setActiveTask(id);
	} 

	render() {
		const component = this;
		const tasks = this.props.tasks.getTasks();
		const taskItems = tasks.map(function(task) {
			return (
				<li key={task.id} onClick={component.clickHandler.bind(component, task.id)}>{task.title}</li>
			);
		});

		return (
			<ul className="task-list">{taskItems}</ul>
		)
	}

}

class TaskDetail extends React.Component {

	removeHandler(event) {
		event.preventDefault();
		this.props.tasks.removeTask(this.props.task.id);
		this.props.clearActiveTask.call();
	}

	render() {
		const task = this.props.task;
		return (
			<div className="task-detail">
				<h1>{task.title}</h1>
				<p>{task.text}</p>
				<a href="#" className="btn" onClick={this.removeHandler.bind(this)}>remove</a>
			</div>
		)
	}

}

class App extends React.Component {

	constructor(props) {
		super(props);

		props.tasks.registerChangeCallback(this.forceUpdate.bind(this));

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
				content = <TaskDetail task={task} tasks={this.props.tasks} clearActiveTask={this.clearActiveTask.bind(this)} />
			} else {

			}
		}

		return (
			<div className="tasklist flex-col-container">
				<div className="tasklist-sidebar flex-col">
					<div className="flex-col-inner">
						<a onClick={this.newTaskHandler.bind(this)} href="#" className="plus-btn pull-right">+</a>
						<h3>tasks</h3>
						<hr />
						<TaskList tasks={this.props.tasks} setActiveTask={this.setActiveTask.bind(this)} />
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