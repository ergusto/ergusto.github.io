class Tasks {

	constructor() {
		this.tasks = {};
		this.count = 0;
	}

	addTodo(todo) {
		const id = this.count++;
		todo.id = id;
		this.tasks[todo.id] = todo;
	}

	getTasks() {
		return Object.keys(this.tasks).map(key => this.tasks[key]);
	}

}

const tasks = new Tasks();

class TaskForm extends React.Component {

	cancelHandler(event) {
		event.preventDefault();
		this.props.cancelForm();
	}

	render() {

		return (
			<form className="task-form">
				<p>Task form</p>
				<a onClick={this.cancelHandler.bind(this)} className="btn" href="#">cancel</a>
			</form>
		)

	}

}

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
		this.state.shouldShowNewTaskForm = false;
		this.state.selectedTaskId = null;
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
			content = <TaskForm tasks={this.props.tasks} cancelForm={this.hideNewTaskForm.bind(this)} />
		} else {

		}

		return (
			<div className="todolist flex-col-container">
				<div className="flex-col todolist-sidebar">
					<div className="flex-col-inner">
						<a onClick={this.newTaskHandler.bind(this)} href="#" className="plus-btn pull-right">+</a>
						<h3>tasks</h3>
					</div>
				</div>
				<div className="flex-col todolist-content">
					<div className="flex-col-inner">
						{content}
					</div>
				</div>
			</div>
		)
	}

}

function renderTodoListComponent() {

	ReactDOM.render(
	    <App tasks={tasks} />,
	    document.getElementById('todolist-example')
	);

}

renderTodoListComponent();