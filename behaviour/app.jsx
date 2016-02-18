const CommentForm = React.createClass({

	cancel: function(event) {
		event.preventDefault();
		this.props.hideForm();
	},

	submit: function(event) {
		event.preventDefault();
		this.cancel();
	},

    render: function() {
        const shouldShowForm = this.props.shouldShowForm;

        if (!shouldShowForm) return false;

        return (
            <form onSubmit={this.submit} className="comment-form box padding margin-top">
            	<label httmlFor="text"><small>text</small></label>
            	<textarea className="field" name="text"></textarea>
            	<input type="submit" value="submit" className="btn"></input>
                <a className="btn" href="#" onClick={this.cancel}>cancel</a>
            </form>
        )
    }

});

const Comment = React.createClass({
    
    getInitialState: function() {
        return {
            shouldShowReplyForm: false,
            text: '',
        };
    },

    showReplyForm: function() {
        this.setState({
            shouldShowReplyForm: true,
        });
    },

    hideReplyForm: function() {
        this.setState({
            shouldShowReplyForm: false,
        });
    },

    reply: function(event) {
        event.preventDefault();
        this.showReplyForm();
    },

    changeText: function(text) {
    	this.setState({
    		text: text,
    	});
    },
    
    render: function() {
        const shouldShowReplyForm = this.state.shouldShowReplyForm;
        const text = this.state.text.length ? this.state.text : this.props.comment.text;
        return (
            <div>
                <div className="comment-item box">
                    <header className="comment-item-header clearfix">
                        <p className="muted"><small>{this.props.comment.username}</small></p>
                    </header>
                    <div className="comment-item-body">
                        <p>{text}</p>
                    </div>
                    <footer className="comment-item-footer clearfix">
                        <ul className="horizontal-list-menu muted">
                            <li className="pull-right">{this.props.comment.createdAt}</li>
                            <li><a href="#" onClick={this.reply}>reply</a></li>
                            <li><a href="#" onClick={this.edit}>edit</a></li>
                            <li><a href="#" onClick={this.remove}>delete</a></li>
                        </ul>
                    </footer>
                </div>

                <CommentForm shouldShowForm={shouldShowReplyForm} hideForm={this.hideReplyForm} />
            </div>
        );
    },

});

const comment = {
    username: 'ergusto',
    text: 'Comment text that could be just about anything...',
    createdAt: '12 minutes ago',
};

ReactDOM.render(
    <Comment comment={comment} />,
    document.getElementById('comment-example')
);