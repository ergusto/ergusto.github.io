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
		let content;
		const comments = this.props.comments.getRootComments();

		if (comments.length) {
			content = comments.map((comment) => {
				return (
					<CommentComponent key={comment.id} user={this.props.user} comment={comment} comments={this.props.comments} />
				);
			});
		}

		return (
			 <section className="comments-example full-height padding justify-centre">

				<div id="comment-example" className="example">
					
					<ul className="comment-list">{content}</ul>

				</div>

			</section>
		)
	}

}