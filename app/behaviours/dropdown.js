import ComponentSingleStateModifierBehaviour from './component.state.modifier.js';

export default class DropDownBehaviour {

	constructor(component) {
		const  defaultState = false;
		this.dropDownState = new ComponentSingleStateModifierBehaviour(component, defaultState);
	}

	init() {
		this.dropDownState.init();
	}

	open() {
		this.dropDownState.set(true);
	}

	close() {
		this.dropDownState.set(false);
	}

	toggle() {
		this.dropDownState.set(!this.dropDownState.current);
	}

	isOpen() {
		return !!this.dropDownState.current;
	}

	isClosed() {
		return !this.dropDownState.current;
	}

}