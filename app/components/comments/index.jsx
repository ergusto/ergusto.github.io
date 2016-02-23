import React from 'react';
import CommentComponent from './comment.jsx';

// import styles for this component
require('!style!css!sass!./styles/list.scss');

export default class CommentListComponent extends React.Component {

	constructor(props) {
		super(props);

		props.comments.onChange(() => {
			this.forceUpdate();
		});
	}

	render() {
		const comments = this.props.comments.getRootComments();
		let content;

		if (comments.length) {
			content = comments.map((comment) => {
				return (
					<CommentComponent key={comment.id} user={this.props.user} comment={comment} comments={this.props.comments} />
				);
			});
		}

		return (
			 <section className="full-height panel comments-example">

				<div id="comment-example" className="example">
					
					<ul className="comment-list">{content}</ul>

				</div>

			</section>
		)
	}

}