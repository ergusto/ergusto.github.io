import React from 'react';

// import styles for this component
require('!style!css!sass!./styles/form.scss');

export default class BookmarkFormComponent extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {};
        this.state.formError = '';
    }

    addError(error) {
        this.setState({
            formError: error
        });
    }

    clearError() {
        this.setState({
            formError: null
        });
    }

    submitHandler(event) {
        event.preventDefault();
        let saved;
        const title = this.refs.bookmarkTitleInput.value;
        const url = this.refs.bookmarkUrlInput.value;
        const text = this.refs.bookmarkTextInput.value;
        const bookmark = this.props.bookmark || this.props.bookmarks.shell();
        
        if (!title.trim().length) {
            this.addError('Please enter a title');
            return;
        }
        
        if (!url.trim().length) {
            this.addError('Please enter a URL');
            return;
        }

        bookmark.title = title;
        bookmark.url = url;
        bookmark.text = text;

        if (bookmark.id) {
            this.props.bookmarks.update(bookmark);
        } else {
            this.props.bookmarks.create(bookmark);
        }

        if (this.props.submitCallback) {
            this.props.submitCallback(saved);
        }
    }

    render() {
        const err = this.state.formError;
        let errContent;

        if (err) {
            errContent = <span className="form-error">{err}</span>;
        }
        return (
        	<div className="bookmark-form-container box margin-top">
                <header className="box-header">
				    <h3 className="bookmark-form-title muted">new bookmark</h3>
                </header>
				<form onSubmit={this.submitHandler.bind(this)} className="bookmark-form padding">
					<input ref="bookmarkTitleInput" name="title" placeholder="title" className="field" />
					<input ref="bookmarkUrlInput" name="url" placeholder="url" type="url" className="field" />
					<textarea ref="bookmarkTextInput" name="text" placeholder="text" className="field"></textarea>
                    {errContent}
					<a onClick={this.submitHandler.bind(this)} className="btn" href="#">submit</a>
				</form>
        	</div>
        );
    }

}