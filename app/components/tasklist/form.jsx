import React from 'react';
import FormStateBehaviour from '../../behaviours/form.js';

// import styles for this component
require('!style!css!sass!./styles/form.scss');

export default class TaskFormComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.form = new FormStateBehaviour(this);
	}

	submitHandler(event) {
		event.preventDefault();
		let saved;
		let { task, tasks, submitCallback } = this.props;
		const title = this.refs.taskTitleInput.value;
		const text = this.refs.taskTextInput.value;
		if (!task) task = tasks.shell();

		if (!title.trim().length) {
			this.form.addError('please enter a title');
			return;
		}

		task.title = title;
		task.text = text;

		if (task.id) {
			saved = tasks.update(task);
		} else {
			saved = tasks.create(task);
		}
		
		if (submitCallback) submitCallback(saved);
	}

	render() {
		const err = this.form.error;
		const { task } = this.props;
		
		let errContent;
		let formTitleContent;
		let titleDefaultValue;
		let textDefaultValue;

		if (task) {
			formTitleContent = 'edit task';
			titleDefaultValue = task.title;
			textDefaultValue = task.text;
		} else {
			formTitleContent = 'new task';
		}

		if (err) {
			errContent = (<span className="form-error">{err}</span>);
		}

		return (
			<div className="task-form-container">
				<h3 className="tasklist-form-title padding-bottom-sm margin-bottom-sm">{formTitleContent}</h3>
				<form onSubmit={this.submitHandler.bind(this)} className="task-form">
					<input defaultValue={titleDefaultValue} ref="taskTitleInput" placeholder="title" className="field" name="title" />
					{errContent}
					<textarea defaultValue={textDefaultValue} ref="taskTextInput" placeholder="text" className="field" name="text"></textarea>
					<input type="submit" value="submit" className="btn"></input>
				</form>
			</div>
		)

	}

}