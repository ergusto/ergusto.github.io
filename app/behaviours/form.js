import ComponentSingleStateModifierBehaviour from './component.single.state.modifier.js';

export default class FormStateBehaviour {

	constructor(component) {
		this.formError = new ComponentSingleStateModifierBehaviour(component);
		this.formState = new ComponentSingleStateModifierBehaviour(component, true);
	}

	get error() {
		return this.formError.current;
	}

	addError(error) {
		this.formError.set(error);
	}

	get enabled() {
		return this.formState.current;
	}

	get disabled() {
		return !this.enabled;
	}

	enable() {
		this.formState.set(true);
	}

	disable() {
		this.formState.set(false);
	}

}