import React, { useState, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import ReactTimeAgo from 'react-time-ago'

import { CommentsContext } from '../context.jsx';
import { COMMENT_DELETE } from '../actionTypes.js';
import ReplyForm from './reply.jsx';
import EditForm from './edit.jsx';

const renderEditForm = (comment, onSuccess, onCancel) => (
	<div className="padding-top">
		<EditForm comment={comment} onSuccess={onSuccess} onCancel={onCancel} />
	</div>
);

const renderReplyForm = (comment, onSuccess, onCancel) => (
	<div className="padding-top">
		<ReplyForm comment={comment} onSuccess={onSuccess} onCancel={onCancel} />
	</div>
);

function Item({ comment }) {
	const { dispatch } = useContext(CommentsContext);

	const [showEdit, setShowEdit] = useState(false);
	const [showReply, setShowReply] = useState(false);

	const onReplyClick = event => {
		setShowEdit(false);
		setShowReply(!showReply);
	};

	const onEditClick = event => {
		setShowReply(false);
		setShowEdit(!showEdit);
	};

	const onRemoveClick = event => {
		dispatch({ type: COMMENT_DELETE, payload: { comment }});
	};

	return (
		<div>
			<div className="background-color-white border border-color-grey border-radius overflow-hidden box-shadow font-family-raleway">
				<div className="padding-horizontal-large padding-vertical">
					<small className="float-right color-muted-grey margin-bottom-medium block"><ReactTimeAgo date={new Date(comment.date)}/></small>
					<small className="color-muted-grey margin-bottom-medium block">{comment.username}</small>
					<div className="line-height-copy font-size-medium color-black">
						<ReactMarkdown source={comment.text} />
					</div>
				</div>
				<footer className="box-shadow-inset border-top border-color-grey border-bottom-radius background-color-light-grey padding-vertical-small font-size-tiny padding-horizontal-large">
					<button onClick={onReplyClick} href="#" className="color-muted-grey color-black--on-hover cursor-pointer no-decoration margin-right">reply</button>
					<button onClick={onEditClick} href="#" className="color-muted-grey color-black--on-hover cursor-pointer no-decoration margin-right">edit</button>
					<button onClick={onRemoveClick} href="#" className="color-muted-grey color-black--on-hover cursor-pointer no-decoration">remove</button>
				</footer>
			</div>
			{showEdit ? renderEditForm(comment, () => setShowEdit(false), () => setShowEdit(false)) : null}
			{showReply ? renderReplyForm(comment, () => setShowReply(false), () => setShowReply(false)) : null}
		</div>
	);
}

export default Item;