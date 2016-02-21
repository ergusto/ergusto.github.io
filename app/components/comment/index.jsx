import React from 'react';
import moment from 'moment';

import CommentComponent from './comment.jsx';

// import styles for this component
require('!style!css!sass!./styles/list.scss');

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
					<CommentComponent key={comment.id} comment={comment} comments={this.props.comments} />
				);
			});
		}

		return (
        	 <section className="full-height">

	            <div id="comment-example" className="example">
					
					<ul className="comment-list">{content}</ul>

	            </div>

	        </section>
		)
	}

}