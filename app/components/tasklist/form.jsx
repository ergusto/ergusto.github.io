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
		const description = this.refs.taskDescriptionInput.value;

		if (!title.trim().length) {
			this.form.addError('please enter a title');
			return;
		}

		if (!task) task = tasks.shell();

		task.title = title;
		task.description = description;

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
		let formTitleContent = 'new task';
		let titleDefaultValue;
		let descriptionDefaultValue;

		if (task) {
			formTitleContent = 'edit task';
			titleDefaultValue = task.title;
			descriptionDefaultValue = task.description;
		}

		if (err) {
			errContent = <span className="form-error">{err}</span>;
		}

		return (
			<div className="task-form-container">
				<h3 className="tasklist-form-title padding-bottom-sm margin-bottom-sm">{formTitleContent}</h3>
				<form onSubmit={this.submitHandler.bind(this)} className="task-form">
					<input defaultValue={titleDefaultValue} ref="taskTitleInput" placeholder="title" className="field" name="title" />
					{errContent}
					<textarea defaultValue={descriptionDefaultValue} ref="taskTextInput" placeholder="description" className="field" name="description"></textarea>
					<input type="submit" value="submit" className="btn"></input>
				</form>
			</div>
		)

	}

}