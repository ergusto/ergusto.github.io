import ComponentSingleStateModifierBehaviour from './component.single.state.modifier.js';
import FieldStateBehaviour from './field.js';

export default class FormStateBehaviour {

	constructor(component) {
		this.component = component;
		this.formErrorState = new ComponentSingleStateModifierBehaviour(component);
		this.formState = new ComponentSingleStateModifierBehaviour(component, true);
	}

	makeField(name) {
		this[name] = new FieldStateBehaviour(this.component);
	}

	makeFields(names) {
		names.forEach((name) => {
			this.makeField(name);
		});
	}

	get error() {
		return this.formErrorState.current;
	}

	addError(error) {
		this.formErrorState.set(error);
	}

	clearError() {
		this.formErrorState.clear();
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