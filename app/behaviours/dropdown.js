import ComponentSingleStateModifierBehaviour from './component.state.modifier.js';

export default class DropDownBehaviour {

	// must be called from constructor of react component

	constructor(component) {
		const  defaultState = false;
		this.dropDownState = new ComponentSingleStateModifierBehaviour(component, defaultState);
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