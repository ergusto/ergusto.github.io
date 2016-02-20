import React from 'react';
import moment from 'moment';

class CommentForm extends React.Component {

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

class Comment extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.state.shouldShowReplyForm = false;
		this.state.shouldShowEditForm = false;
		this.state.comment = '';

		// http://stackoverflow.com/a/31362350/4566267
		this.replyHandler = this.replyHandler.bind(this);
		this.editHandler = this.editHandler.bind(this);
		this.changeComment = this.changeComment.bind(this);
	}

    showEditForm() {
    	this.hideReplyForm();
    	this.setState({
    		shouldShowEditForm: true,
    	});
    }

    hideEditForm() {
    	this.setState({
    		shouldShowEditForm: false,
    	});
    }

    showReplyForm() {
    	this.hideEditForm();
        this.setState({
            shouldShowReplyForm: true,
        });
    }

    hideReplyForm() {
        this.setState({
            shouldShowReplyForm: false,
        });
    }

    replyHandler(event) {
        event.preventDefault();
        this.showReplyForm();
    }

    editHandler(event) {
    	event.preventDefault();
    	this.showEditForm();
    }

    addNewComment(comment) {
    	this.props.comments.add(comment);
    }

    changeComment(comment) {
    	this.setState({
    		comment: comment,
    	});
    }
    
    render() {
        const comment = this.state.comment && this.state.comment.length ? this.state.comment : this.props.comment;
        const date = moment(this.props.createdAt).fromNow();
        return (
        	 <section className="full-height">

	            <div id="comment-example" className="example">

	            	<div className="comment-item box">
	                    <header className="comment-item-header clearfix">
	                        <p className="muted"><small>{this.props.username}</small></p>
	                    </header>
	                    <div className="comment-item-body">
	                        <p>{comment.text}</p>
	                    </div>
	                    <footer className="comment-item-footer clearfix">
	                        <ul className="horizontal-list-menu muted">
	                            <li className="pull-right">{date}</li>
	                            <li><a href="#" onClick={this.replyHandler.bind(this)}>reply</a></li>
	                            <li><a href="#" onClick={this.editHandler.bind(this)}>edit</a></li>
	                        </ul>
	                    </footer>
	                </div>

	                <CommentForm formTitle="reply" shouldShowForm={this.state.shouldShowReplyForm} submitCallback={this.addNewComment.bind(this)} hideForm={this.hideReplyForm.bind(this)} />
	                <CommentForm {...this.props} formTitle="edit" commentValue={comment} submitCallback={this.changeComment.bind(this)} shouldShowForm={this.state.shouldShowEditForm} hideForm={this.hideEditForm.bind(this)} />

	            </div>

	        </section>
        );
    }

};

export default class CommentListComponent extends React.Component {

	constructor(props) {
		super(props);

		props.comments.register(this.forceUpdate.bind(this));
	}

	render() {
		const comments = this.props.comments.get();
		let content;

		if (comments.length) {
			content = comments.map((comment) => {
				return (
					<Comment key={comment.id} comment={comment} comments={this.props.comments} />
				);
			});
		}

		return (
			<ul className="comment-list">{content}</ul>
		)
	}

}

const commentText = 'This site showcases some of the things I have created. Most examples are interactive. Try replying to or editing this comment.';

Comment.defaultProps = {
    username: 'ergusto',
    comment: commentText,
    createdAt: new Date(),
};