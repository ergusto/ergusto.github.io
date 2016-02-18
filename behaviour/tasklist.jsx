class Tasks {

	constructor() {
		this.tasks = {};
		this.count = 0;
	}

	addTask(title) {
		this.count++;
		const task = {};
		
		task.id = this.count;
		task.title = title;
		task.completed = false;
		
		this.tasks[task.id] = task;
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
	}

}

class TaskForm extends React.Component {

	cancelHandler(event) {
		event.preventDefault();
		this.props.hideForm();
	}

	submitHandler(event) {
		event.preventDefault();
		const title = this.refs.taskinput.value;
		const task = this.props.tasks.addTask(title);
		this.props.hideForm();
		this.props.setActiveTask(task.id);
	}

	render() {

		return (
			<form onSubmit={this.submitHandler.bind(this)} className="task-form">
				<input ref="taskinput" placeholder="task" className="field" name="title" />
				<a onClick={this.submitHandler.bind(this)} className="btn" href="#">submit</a>
				<a onClick={this.cancelHandler.bind(this)} className="btn" href="#">cancel</a>
			</form>
		)

	}

}

class TaskList extends React.Component {

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

	render() {
		const task = this.props.task;
		return (
			<div className="task-detail">
				<h1>{task.title}</h1>
			</div>
		)
	}

}

class App extends React.Component {

	constructor(props) {
		super(props);

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
			content = <TaskForm tasks={this.props.tasks} setActiveTask={this.setActiveTask.bind(this)} hideForm={this.hideNewTaskForm.bind(this)} />
		} else {
			if (this.state.activeTaskId) {
				const task = this.props.tasks.getTask(this.state.activeTaskId);
				content = <TaskDetail task={task} />
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

tasks.addTask('Get the groceries');
tasks.addTask('Clean the bathroom');

function renderTodoListComponent() {

	ReactDOM.render(
	    <App tasks={tasks} />,
	    document.getElementById('tasklist-example')
	);

}

renderTodoListComponent();