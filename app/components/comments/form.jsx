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
		const comment = this.props.comment;
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
		const parent = this.props.parent;
		const text = this.refs.commentInput.value;
		const comment = this.props.comment || this.props.comments.shell();

		if (!text.trim().length) {
			this.form.addError('Please enter a comment');
			return;
		}

		comment.text = text;

		if (comment.id) {
			saved = this.props.comments.update(comment);
		} else {
			comment.date = new Date;
			comment.username = this.props.user.getUsername();
			comment.parentId = parent && parent.id || '';
			saved = this.props.comments.create(comment);
		}

		if (this.props.submitCallback) {
			this.props.submitCallback(saved);
		}
	}

	changeHandler() {
		const length = this.refs.commentInput.value.length;
		this.form.text.setLength(length);
	}

	render() {
		const err = this.form.error;
		const shouldShowForm = this.props.shouldShowForm;
		const formTitle = this.props.formTitle || 'comment';
		const comment = this.props.comment;
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
			<form refs="commentform" onSubmit={this.submitHandler.bind(this)} className="comment-form box padding margin-top">
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