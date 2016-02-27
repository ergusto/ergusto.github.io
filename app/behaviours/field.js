import ComponentSingleStateModifierBehaviour from './component.single.state.modifier.js';

export default class FieldStateBehaviour {

	constructor(component) {
		this.fieldErrorState = new ComponentSingleStateModifierBehaviour(component);
		this.fieldLengthState = new ComponentSingleStateModifierBehaviour(component, 0);
	}

	get length() {
		return this.fieldLengthState.current;
	}

	setLength(value) {
		this.fieldLengthState.set(value);
	}

	get error() {
		return this.fieldErrorState.current;
	}

	addError(error) {
		this.fieldErrorState.set(error);
	}

	clearError() {
		this.fieldErrorState.clear();
	}

}