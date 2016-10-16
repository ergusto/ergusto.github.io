import React from 'react';
import FormStateBehaviour from '../../behaviours/form.js';

// import styles for this component
require('!style!css!sass!./styles/form.scss');

export default class CommentFormComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.form = new FormStateBehaviour(this);
		this.form.makeField('text');
	}

	componentDidMount() {
		const { comment } = this.props;
		if (comment) {
			this.form.text.setLength(comment.text.length);
		}
	}

	cancelHandler(event) {
		event.preventDefault();
		this.props.cancelCallback();
	}

	submitHandler(event) {
		event.preventDefault();
		let saved;
		let { parent, comments, comment, user, submitCallback } = this.props;
		const text = this.refs.commentInput.value;
		if (!comment) comment = comments.shell();

		if (!text.trim().length) {
			this.form.addError('Please enter a comment');
			return;
		}

		comment.text = text;

		if (comment.id) {
			saved = comments.update(comment);
		} else {
			comment.date = new Date;
			comment.username = user.getUsername();
			comment.parentId = parent && parent.id || '';
			saved = comments.create(comment);
		}

		if (submitCallback) {
			submitCallback(saved);
		}
	}

	changeHandler() {
		const length = this.refs.commentInput.value.length;
		this.form.text.setLength(length);
	}

	render() {
		const err = this.form.error;
		let { shouldShowForm, formTitle, comment } = this.props;
		if (!formTitle) formTitle = 'comment';
		let errContent;
		let defaultValue;

		if (err) {
			errContent = <span className="form-error">{err}</span>;
		}

		if (comment) {
			defaultValue = comment.text;
		}

		if (!shouldShowForm) return false;

		return (
			<form refs="commentform" onSubmit={this.submitHandler.bind(this)} className="comment-form box padding-horizontal margin-top">
				<span className="fieldCount pull-right">{this.form.text.length}</span>
				<label httmlFor="comment"><small>{formTitle}</small></label>
				<textarea onChange={this.changeHandler.bind(this)} ref="commentInput" className="field" name="comment" defaultValue={defaultValue}></textarea>
				{errContent}
				<div className="btn-group">
					<input type="submit" value="submit" className="btn"></input>
					<a className="btn" href="#" onClick={this.cancelHandler.bind(this)}>cancel</a>
				</div>
			</form>
		)
	}

}