import ComponentSingleStateModifierBehaviour from './component.state.modifier.js';

export default class DropdownBehaviour {

	// must be called from constructor of react component

	constructor(component) {
		const  defaultState = false;
		this.dropdownState = new ComponentSingleStateModifierBehaviour(component, defaultState);
	}

	open() {
		this.dropdownState.set(true);
	}

	close() {
		this.dropdownState.set(false);
	}

	toggle() {
		this.dropdownState.set(!this.dropdownState.current);
	}

	isOpen() {
		return !!this.dropdownState.current;
	}

	isClosed() {
		return !this.dropdownState.current;
	}

}