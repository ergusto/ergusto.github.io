import React from 'react';
import TimeAgo from 'react-timeago';
import CommentFormComponent from './form.jsx';

// import styles for this component
require('!style!css!sass!./styles/comment.scss');

export default class CommentComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.state.shouldShowReplyForm = false;
		this.state.shouldShowEditForm = false;
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

    replyCallback() {
        this.hideReplyForm();
    }

    editCallback() {
        this.hideEditForm();
    }

    getChildren() {
        return this.props.comments.getChildCommentsForComment(this.props.comment);
    }

    removeHandler(comment, event) {
    	event.preventDefault();
    	this.props.comments.remove(comment.id);
    }
    
    render() {
    	const comment = this.props.comment;
        const children = this.getChildren();
        let childList;

        const childrenHTML = children.map((child) => {
            return <CommentComponent key={child.id} user={this.props.user} comment={child} comments={this.props.comments} />
        });

        if (childrenHTML) {

            childList = (<ul className="children">{childrenHTML}</ul>);

        }
        return (

        	<div>
	        	<div className="comment-item box">
	                <header className="comment-item-header clearfix">
	                    <p className="muted"><small>{comment.username}</small></p>
	                </header>
	                <div className="comment-item-body">
	                    <p>{comment.text}</p>
	                </div>
	                <footer className="comment-item-footer clearfix">
	                    <ul className="horizontal-list-menu muted">
	                        <li className="pull-right"><TimeAgo date={comment.date} /></li>
	                        <li><a href="#" onClick={this.replyHandler.bind(this)}>reply</a></li>
	                        <li><a href="#" onClick={this.editHandler.bind(this)}>edit</a></li>
	                        <li><a href="#" onClick={this.removeHandler.bind(this, comment)}>remove</a></li>
	                    </ul>
	                </footer>
	            </div>

	            <CommentFormComponent 
                    user={this.props.user} 
                    formTitle="reply" 
                    parent={comment}
                    comments={this.props.comments}
                    shouldShowForm={this.state.shouldShowReplyForm} 
                    submitCallback={this.replyCallback.bind(this)} 
                    cancelCallback={this.hideReplyForm.bind(this)} 
                />
	            
                <CommentFormComponent 
                    user={this.props.user} 
                    formTitle="edit" 
                    comment={comment} 
                    comments={this.props.comments}
                    shouldShowForm={this.state.shouldShowEditForm} 
                    submitCallback={this.editCallback.bind(this)}
                    cancelCallback={this.hideEditForm.bind(this)} 
                />

                {childList}

	        </div>
        );
    }

};