import React, { useState, useContext } from 'react';
import posed from 'react-pose';
import ReactMarkdown from 'react-markdown';
import ReactTimeAgo from 'react-time-ago'

import { CommentsContext } from '../context.jsx';
import { COMMENT_DELETE } from '../actionTypes.js';
import ReplyForm from './reply.jsx';
import EditForm from './edit.jsx';

const FormContainer = posed.div({
	closed: { height: 0 },
	open: { height: 'auto' }
});

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
			<div className="background-color-white border border-color-grey border-radius-large overflow-hidden box-shadow">
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
			<FormContainer className='overflow-hidden' pose={showEdit ? 'open' : 'closed'}>
				{renderEditForm(comment, () => setShowEdit(false), () => setShowEdit(false))}
			</FormContainer>
			<FormContainer className='overflow-hidden' pose={showReply ? 'open' : 'closed'}>
				{renderReplyForm(comment, () => setShowReply(false), () => setShowReply(false))}
			</FormContainer>
		</div>
	);
}

export default Item;