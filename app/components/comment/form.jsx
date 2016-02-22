import React from 'react';
import moment from 'moment';

// import styles for this component
require('!style!css!sass!./styles/form.scss');

export default class CommentFormComponent extends React.Component {

	constructor(props) {
		super(props);
        const comment = this.props.comment;
		this.state = {};
        this.state.commentLength = comment ? comment.text.length : 0;
        this.state.isEditing = false;

		// http://stackoverflow.com/a/31362350/4566267
		this.cancelHandler = this.cancelHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
	}

	newComment() {
		const comment = {};
		const parent = this.props.parent;
		comment.text = '';
		comment.children = [];
		comment.date = new Date;
		comment.parentId = parent && parent.id || '';
		comment.username = this.props.user.getUsername();
		return comment;
	}

	cancelHandler(event) {
		event.preventDefault();
		this.props.hideForm();
	}

	submitHandler(event) {
		event.preventDefault();
		const parent = this.parent;
		const newTextValue = this.refs.commentInput.value;
		const comment = this.props.comment || this.newComment();

		if (!this.isEditing) {
			this.isEditing = true;
			comment.text = newTextValue;

			if (this.props.submitCallback) this.props.submitCallback(comment);
			this.refs.commentInput.value = '';
			this.props.hideForm();
			this.isEditing = false;
		}
	}

	setCommentLength(length) {
		var length = length || this.refs.commentInput.value.length;
		this.setState({
			commentLength: length,
		});
	}

	changeHandler() {
		this.setCommentLength();
	}

    render() {
        const shouldShowForm = this.props.shouldShowForm;
        const formTitle = this.props.formTitle || 'comment';
        const comment = this.props.comment;
        let defaultValue;

        if (comment) defaultValue = comment.text;

        if (!shouldShowForm) return false;

        return (
            <form onSubmit={this.submitHandler.bind(this)} className="comment-form box padding margin-top">
            	<span className="fieldCount pull-right">{this.state.commentLength}</span>
            	<label httmlFor="comment"><small>{formTitle}</small></label>
            	<textarea onChange={this.changeHandler.bind(this)} ref="commentInput" className="field" name="comment" defaultValue={defaultValue}></textarea>
            	<div className="btn-group">
	            	<input type="submit" value="submit" className="btn"></input>
	                <a className="btn" href="#" onClick={this.cancelHandler.bind(this)}>cancel</a>
	            </div>
            </form>
        )
    }

}