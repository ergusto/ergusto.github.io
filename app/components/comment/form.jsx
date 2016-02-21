import React from 'react';
import moment from 'moment';

// import styles for this component
require('!style!css!sass!./styles/form.scss');

export default class CommentFormComponent extends React.Component {

	constructor(props) {
		super(props);
        const commentValue = this.props.commentValue || '';
		this.state = {};
        this.state.commentLength = commentValue.length;

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
		const comment = this.refs.commentInput.value;

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
        const commentValue = this.props.commentValue || '';

        if (!shouldShowForm) return false;

        return (
            <form onSubmit={this.submitHandler.bind(this)} className="comment-form box padding margin-top">
            	<span className="fieldCount pull-right">{this.state.commentLength}</span>
            	<label httmlFor="comment"><small>{formTitle}</small></label>
            	<textarea onChange={this.changeHandler.bind(this)} ref="commentInput" className="field" name="comment" defaultValue={commentValue}></textarea>
            	<div className="btn-group">
	            	<input type="submit" value="submit" className="btn"></input>
	                <a className="btn" href="#" onClick={this.cancelHandler.bind(this)}>cancel</a>
	            </div>
            </form>
        )
    }

}