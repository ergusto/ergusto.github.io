import ComponentSingleStateModifierBehaviour from './component.single.state.modifier.js';
import FieldStateBehaviour from './field.js';

export default class FormStateBehaviour {

	constructor(component) {
		this.component = component;
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

	makeField(name) {
		this[name] = new FieldStateBehaviour(this.component);
	}

	makeFields(names) {
		names.forEach((name) => {
			this.makeField(name);
		});
	}

}