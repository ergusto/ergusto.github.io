import _ from 'underscore';
import React from 'react';

// import styles for this component
require('!style!css!sass!./styles/settings.scss');

export default class SettingsComponent extends  React.Component {
    
    constructor(props) {
        super(props);

        this.state = {};
        this.state.shouldShowDropDown = false;
    }

    triggerClickHandler(event) {
    	event.preventDefault();
    	this.toggleDropdown();
    }

    toggleDropdown() {
    	this.setState({
    		shouldShowDropDown: !this.state.shouldShowDropDown
    	});
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

    render() {
    	let dropdownClass = 'hidden dropdown';
    	let triggerClass = 'settings-trigger';
    	let labelText = 'do not show animation';

    	const introAnimationSettingEnabled = this.props.user.shouldSeeIntroAnimation();

    	if (this.state.shouldShowDropDown) {
    		dropdownClass = 'dropdown box';
    		triggerClass = 'settings-trigger opaque';
    	}

    	if (introAnimationSettingEnabled) labelText = 'show animation';

        return (
        	<div className="settings pull-right">
        		<a onClick={this.triggerClickHandler.bind(this)} href="#" ref="dropdowntrigger" className={triggerClass}>&#x221e;</a>

        		<div className={dropdownClass}>
        			<h5 className="settings-title">settings</h5>
        			<label className="settings-label"><small>{labelText}</small></label>
        			<a onClick={this.showIntroHandler.bind(this)} href="#" className="btn">show animation</a> <a href="#" className="btn">hide animation</a>
        		</div>
        	</div>
        );
    }

}