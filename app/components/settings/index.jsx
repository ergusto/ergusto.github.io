import _ from 'lodash';
import React from 'react';

// import styles for this component
require('!style!css!sass!./styles/settings.scss');

export default class SettingsComponent extends  React.Component {
    
    constructor(props) {
        super(props);

        this.state = {};
        this.state.shouldShowDropDown = false;
        
        this.props.user.onUpdate(() => {
            this.forceUpdate();
        });
    }

    componentDidMount() {
        const hideDropDownOnOutsideClickhandler = (event) => {
            const target = event.target;
            if (!this.refs.dropdown.contains(target)) this.hideDropdown();
        }

        document.body.addEventListener('click', hideDropDownOnOutsideClickhandler);
        document.body.addEventListener('touchend', hideDropDownOnOutsideClickhandler);
    }

    triggerClickHandler(event) {
    	event.preventDefault();
    	this.toggleDropdown();
    }

    get isShowing() {
        return this.state.shouldShowDropDown;
    }

    showDropDown() {
        this.setState({
            shouldShowDropDown: true,
        });
    }

    hideDropdown() {
        this.setState({
            shouldShowDropDown: false,
        });
    }

    toggleDropdown() {
        this.isShowing ? this.hideDropdown() : this.showDropDown();
    }

    setUserIntroAnimationSetting(setting) {
    	this.props.user.setShouldShowIntro(setting);
    }

    showIntroHandler(event) {
    	event.preventDefault();
    	this.setUserIntroAnimationSetting(true);
    }

    hideIntroHandler(event) {
    	event.preventDefault();
    	this.setUserIntroAnimationSetting(false);
    }

    usernameChangeHandler(event) {
        const username = event.target.value;
        this.props.user.setUsername(username);
    }

    resetHandler(event) {
        event.preventDefault();
        this.props.user.resetAllLocalStorage();
    }

    render() {
    	let dropdownClass;
    	let triggerClass;
    	let animationSettingLabelText;
        let showDisabled;
        let hideDisabled;
        const username = this.props.user.getUsername();

    	if (this.state.shouldShowDropDown) {
    		dropdownClass = 'dropdown box clearfix';
    		triggerClass = 'settings-trigger opaque';
    	} else {
            dropdownClass = 'hidden dropdown clearfix';
            triggerClass = 'settings-trigger';
        }

    	if (this.props.user.shouldSeeIntroAnimation()) {
            animationSettingLabelText = 'show intro animation';
        } else {
            animationSettingLabelText = 'do not show intro animation';
        }

        return (
        	<div className="settings pull-right">
        		<a onClick={this.triggerClickHandler.bind(this)} href="#" ref="dropdowntrigger" className={triggerClass}>&#x221e;</a>

        		<div ref="dropdown" className={dropdownClass}>
        			<h5 className="settings-title">settings</h5>
                    <div className="settings-field">
                        <label className="settings-label"><small>username: {username}</small></label>
                        <input onChange={this.usernameChangeHandler.bind(this)} type="text" className="field" defaultValue={username} />
                    </div>
                    <div className="settings-field">
        				<label className="settings-label"><small>{animationSettingLabelText}</small></label>
                        <div className="btn-group">
            				<a href="#" onClick={this.showIntroHandler.bind(this)} className="btn">show animation</a>
                        	<a href="#" onClick={this.hideIntroHandler.bind(this)} className="btn">hide animation</a>
                        </div>
                    </div>
                    <div className="settings-field">
                    	<label className="settings-label"><small>reset all data</small></label>
                    	<a href="#" onClick={this.resetHandler.bind(this)} className="btn">reset</a>
                    </div>

        		</div>
        	</div>
        );
    }

}