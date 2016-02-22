import React from 'react';
import moment from 'moment';

// import styles for this component
require('!style!css!sass!./styles/form.scss');

export default class CommentFormComponent extends React.Component {

	constructor(props) {
		super(props);
        this.comment = this.props.comment || false;
		this.state = {};
        this.state.commentLength = this.comment ? this.comment.text.length : 0;

        if (!this.comment) {
        	this.comment = {};
        	this.comment.text = '';
        	this.comment.children = [];
        	this.parentId = '';
        }

		// http://stackoverflow.com/a/31362350/4566267
		this.cancelHandler = this.cancelHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
	}

	cancelHandler(event) {
		event.preventDefault();
		this.props.hideForm();
	}

	submitHandler(event) {
		event.preventDefault();
		let comment = this.comment;
		const newTextValue = this.refs.commentInput.value;
		
		if (comment.id) {
			// is reply form
			const parent = comment;
			comment = {};
			comment.children = [];
			comment.parentId = parent.id;
		} else {
			comment.username = this.props.user.getUsername();
		}
		
		comment.text = newTextValue;
		comment.date = new Date;

		if (this.props.submitCallback) this.props.submitCallback(comment);
		this.refs.commentInput.value = '';
		this.props.hideForm();
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

        if (!shouldShowForm) return false;

        return (
            <form onSubmit={this.submitHandler.bind(this)} className="comment-form box padding margin-top">
            	<span className="fieldCount pull-right">{this.state.commentLength}</span>
            	<label httmlFor="comment"><small>{formTitle}</small></label>
            	<textarea onChange={this.changeHandler.bind(this)} ref="commentInput" className="field" name="comment" defaultValue={this.comment.text}></textarea>
            	<div className="btn-group">
	            	<input type="submit" value="submit" className="btn"></input>
	                <a className="btn" href="#" onClick={this.cancelHandler.bind(this)}>cancel</a>
	            </div>
            </form>
        )
    }

}