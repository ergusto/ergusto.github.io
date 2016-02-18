const CommentForm = React.createClass({

	cancelHandler: function(event) {
		event.preventDefault();
		this.props.hideForm();
	},

	submitHandler: function(event) {
		event.preventDefault();
		const comment = this.refs.commentInput.value;

		if (this.props.submitCallback) this.props.submitCallback(comment);
		this.props.hideForm();
	},

    render: function() {
        const shouldShowForm = this.props.shouldShowForm;
        const formTitle = this.props.formTitle || 'comment';
        const commentValue = this.props.commentValue || '';

        if (!shouldShowForm) return false;

        return (
            <form onSubmit={this.submitHandler} className="comment-form box padding margin-top">
            	<label httmlFor="comment"><small>{formTitle}</small></label>
            	<textarea ref="commentInput" className="field" name="comment" defaultValue={commentValue}></textarea>
            	<input type="submit" value="submit" className="btn"></input>
                <a className="btn" href="#" onClick={this.cancelHandler}>cancel</a>
            </form>
        )
    }

});

const Comment = React.createClass({
    
    getInitialState: function() {
        return {
            shouldShowReplyForm: false,
            shouldShowEditForm: false,
            comment: '',
        };
    },

    showEditForm: function() {
    	this.hideReplyForm();
    	this.setState({
    		shouldShowEditForm: true,
    	});
    },

    hideEditForm: function() {
    	this.setState({
    		shouldShowEditForm: false,
    	});
    },

    showReplyForm: function() {
    	this.hideEditForm();
        this.setState({
            shouldShowReplyForm: true,
        });
    },

    hideReplyForm: function() {
        this.setState({
            shouldShowReplyForm: false,
        });
    },

    replyHandler: function(event) {
        event.preventDefault();
        this.showReplyForm();
    },

    editHandler: function(event) {
    	event.preventDefault();
    	this.showEditForm();
    },

    deleteHandler: function(event) {
    	event.preventDefault();
    	this.removeFromDOM();
    	setTimeout(function() {
    		renderCommentComponent();
    	}, 1000)
    },

    changeComment: function(comment) {
    	this.setState({
    		comment: comment,
    	});
    },

    removeFromDOM: function() {
    	ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
    },
    
    render: function() {
        const comment = this.state.comment.length ? this.state.comment : this.props.comment.comment;
        const date = moment(this.props.comment.createdAt).fromNow();
        return (
            <div>
                <div className="comment-item box">
                    <header className="comment-item-header clearfix">
                        <p className="muted"><small>{this.props.comment.username}</small></p>
                    </header>
                    <div className="comment-item-body">
                        <p>{comment}</p>
                    </div>
                    <footer className="comment-item-footer clearfix">
                        <ul className="horizontal-list-menu muted">
                            <li className="pull-right">{date}</li>
                            <li><a href="#" onClick={this.replyHandler}>reply</a></li>
                            <li><a href="#" onClick={this.editHandler}>edit</a></li>
                            <li><a href="#" onClick={this.deleteHandler}>delete</a></li>
                        </ul>
                    </footer>
                </div>

                <CommentForm formTitle="reply" shouldShowForm={this.state.shouldShowReplyForm} hideForm={this.hideReplyForm} />
                <CommentForm {...this.props} formTitle="edit" commentValue={comment} submitCallback={this.changeComment} shouldShowForm={this.state.shouldShowEditForm} hideForm={this.hideEditForm} />
            </div>
        );
    },

});

const comment = {
    username: 'ergusto',
    comment: 'Comment text that could be just about anything...',
    createdAt: new Date(),
};

function renderCommentComponent() {

	ReactDOM.render(
	    <Comment comment={comment} />,
	    document.getElementById('comment-example')
	);

}

renderCommentComponent();