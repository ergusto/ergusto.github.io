import React from 'react';
import CommentComponent from './comment.jsx';

// import styles for this component
require('!style!css!sass!./styles/list.scss');

export default class CommentListComponent extends React.Component {

	constructor(props) {
		super(props);
		const { comments } = this.props;
		
		comments.onChange(() => {
			this.forceUpdate();
		});
	}

	render() {
		let content;
		const { user, comments } = this.props;
		const commentList = comments.getRootComments();

		if (commentList.length) {
			content = commentList.map((comment) => {
				return (
					<CommentComponent key={comment.id} user={user} comment={comment} comments={comments} />
				);
			});
		}

		return (
			 <section className="comments-example full-height justify-centre padding">

				<div className="example">
					
					<ul className="comment-list">{content}</ul>

				</div>

			</section>
		)
	}

}