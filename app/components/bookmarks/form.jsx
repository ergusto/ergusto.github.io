import React from 'react';
import FormBehaviour from '../../behaviours/form.js';

// import styles for this component
require('!style!css!sass!./styles/form.scss');

export default class BookmarkFormComponent extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {};
        this.form = new FormBehaviour(this);
    }

    submitHandler(event) {
        event.preventDefault();

        let saved;
        const title = this.refs.bookmarkTitleInput.value;
        const url = this.refs.bookmarkUrlInput.value;
        const notes = this.refs.bookmarkNotesInput.value;
        const bookmark = this.props.bookmark || this.props.bookmarks.shell();
        
        if (!title.trim().length) {
            this.form.addError('Please enter a title');
            return;
        }
        
        if (!url.trim().length) {
            this.form.addError('Please enter a URL');
            return;
        }

        bookmark.title = title;
        bookmark.url = url;
        bookmark.notes = notes;

        if (bookmark.id) {
            saved = this.props.bookmarks.update(bookmark);
        } else {
            saved = this.props.bookmarks.create(bookmark);
        }

        if (this.props.submitCallback) {
            this.props.submitCallback(saved);
        }
    }

    render() {
        const err = this.form.error;
        const bookmark = this.props.bookmark;
        const formTitle = this.props.formTitle || 'new bookmark';
        let errContent;

        if (err) {
            errContent = <span className="form-error">{err}</span>;
        }

        return (
        	<div className="bookmark-form-container box margin-top">
                <header className="box-header padding">
				    <h3 className="bookmark-form-title muted">{formTitle}</h3>
                </header>
				<form onSubmit={this.submitHandler.bind(this)} className="bookmark-form padding">
					<input defaultValue={bookmark.title} ref="bookmarkTitleInput" name="title" placeholder="title" className="field" />
					<input defaultValue={bookmark.url} ref="bookmarkUrlInput" name="url" placeholder="url" type="url" className="field" />
					<textarea defaultValue={bookmark.notes} ref="bookmarkNotesInput" name="notes" placeholder="notes" className="field"></textarea>
                    {errContent}
					<a onClick={this.submitHandler.bind(this)} className="btn" href="#">submit</a>
				</form>
        	</div>
        );
    }

}