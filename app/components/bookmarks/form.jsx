import React from 'react';
import FormStateBehaviour from '../../behaviours/form.js';

// import styles for this component
require('!style!css!sass!./styles/form.scss');

export default class BookmarkFormComponent extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {};
        this.form = new FormStateBehaviour(this);
    }

    submitHandler(event) {
        event.preventDefault();
        const form = this.form;
        let saved;
        let { user, bookmark, bookmarks, submitCallback } = this.props;
        const { bookmarkTitleInput, bookmarkUrlInput, bookmarkNotesInput } = this.refs;
        
        if (!bookmark) bookmark = bookmarks.shell();

        const title = bookmarkTitleInput.value;
        const url = bookmarkUrlInput.value;
        const notes = bookmarkNotesInput.value;
        
        if (!title.trim().length) {
            form.addError('Please enter a title');
            return;
        }
        
        if (!url.trim().length) {
            form.addError('Please enter a URL');
            return;
        }

        bookmark.title = title;
        bookmark.url = url;
        bookmark.notes = notes;

        if (bookmark.id) {
            saved = bookmarks.update(bookmark);
        } else {
            bookmark.username = user.getUsername();
            saved = bookmarks.create(bookmark);
        }

        if (submitCallback) {
            submitCallback(saved);
        }
    }

    render() {
        const err = this.form.error;
        let { bookmark, formTitle } = this.props;
        if (!formTitle) formTitle = 'new bookmark';
        
        let titleValue;
        let urlValue;
        let notesValue;
        let errContent;

        if (bookmark) {
            titleValue = bookmark.title;
            urlValue = bookmark.url;
            notesValue = bookmark.notes
        }

        if (err) {
            errContent = <span className="form-error">{err}</span>;
        }

        return (
        	<div className="bookmark-form-container box margin-top">
                <header className="box-header padding bg-gray">
				    <h3 className="bookmark-form-title muted">{formTitle}</h3> 
                </header>
				<form onSubmit={this.submitHandler.bind(this)} className="bookmark-form padding">
					<input defaultValue={titleValue} ref="bookmarkTitleInput" name="title" placeholder="title" className="field" />
					<input defaultValue={urlValue} ref="bookmarkUrlInput" name="url" placeholder="url" type="url" className="field" />
					<textarea defaultValue={notesValue} ref="bookmarkNotesInput" name="notes" placeholder="notes" className="field"></textarea>
                    {errContent}
                    <input type="submit" value="submit" className="btn btn-tall"></input>
				</form>
        	</div>
        );
    }

}