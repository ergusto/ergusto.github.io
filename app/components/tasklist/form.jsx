import React from 'react';

// import styles for this component
require('!style!css!sass!./styles/form.scss');

export default class TaskFormComponent extends React.Component {

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
			const task = this.props.tasks.create({title: title, text: text});
			this.props.setActiveTask(task.id);
		} else {
			this.addError('please enter a title');
		}
	}

	render() {
		const err = this.state.formError;
		let errContent;

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