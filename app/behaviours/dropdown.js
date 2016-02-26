import ComponentSingleStateModifierBehaviour from './component.single.state.modifier.js';

export default class DropdownStateBehaviour {

	// must be called from constructor of react component

	constructor(component) {
		const  defaultState = false;
		this.component = component;
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

	domReady() {
		const refs = this.component.refs;
		
		const hideDropDownOnOutsideClickhandler = (event) => {
			const target = event.target;
			if (!refs.dropdown.contains(target)) this.close();
		}

		document.body.addEventListener('click', hideDropDownOnOutsideClickhandler);
		document.body.addEventListener('touchend', hideDropDownOnOutsideClickhandler);
	}

	openHandler(event) {
		event.preventDefault();
		this.open();
	}

}