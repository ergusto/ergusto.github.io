import React from 'react';
import TimeAgo from 'react-timeago';
import CommentEditFormComponent from './form.edit.jsx';
import CommentCreateFormComponent from './form.create.jsx';

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
			shouldShowEditForm: true
		});
	}

	hideEditForm() {
		this.setState({
			shouldShowEditForm: false
		});
	}

	showReplyForm() {
		this.hideEditForm();
		this.setState({
			shouldShowReplyForm: true
		});
	}

	hideReplyForm() {
		this.setState({
			shouldShowReplyForm: false
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
		const { comments, comment } = this.props;
		return comments.getChildCommentsForComment(comment);
	}

	removeHandler(comment, event) {
		event.preventDefault();
		const { comments } = this.props;
		comments.remove(comment.id);
	}
	
	render() {
		const { user, comment, comments } = this.props;
		const children = this.getChildren();
		let childList;

		const childrenHTML = children.map((child) => {
			return <CommentComponent key={child.id} user={user} comment={child} comments={comments} />
		});

		if (childrenHTML) {
			childList = (<ul className="comment-children">{childrenHTML}</ul>);
		}
		return (

			<li>
				<div className="comment-item box centred margin-top">
					<header className="comment-item-header clearfix">
						<p className="muted"><small>{comment.username}</small></p>
					</header>
					<div className="comment-item-body">
						<p>{comment.text}</p>
					</div>
					<footer className="comment-item-footer clearfix box-shadow-inset border-top">
						<ul className="horizontal-list-menu muted">
							<li className="pull-right"><TimeAgo date={comment.date} /></li>
							<li><a href="#" onClick={this.replyHandler.bind(this)}>reply</a></li>
							<li><a href="#" onClick={this.editHandler.bind(this)}>edit</a></li>
							<li><a href="#" onClick={this.removeHandler.bind(this, comment)}>remove</a></li>
						</ul>
					</footer>
				</div>

				<CommentCreateFormComponent 
					user={user} 
					formTitle="reply" 
					parent={comment}
					comments={comments}
					shouldShowForm={this.state.shouldShowReplyForm} 
					submitCallback={this.replyCallback.bind(this)} 
					cancelCallback={this.hideReplyForm.bind(this)} 
				/>
				
				<CommentEditFormComponent 
					user={user} 
					formTitle="edit" 
					comment={comment} 
					comments={comments}
					shouldShowForm={this.state.shouldShowEditForm} 
					submitCallback={this.editCallback.bind(this)}
					cancelCallback={this.hideEditForm.bind(this)} 
				/>

				{childList}

			</li>
		);
	}

}