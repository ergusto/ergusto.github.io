import ComponentSingleStateModifierBehaviour from './component.single.state.modifier.js';

export default class FieldStateBehaviour {

	constructor(component) {
		this.fieldLengthState = new ComponentSingleStateModifierBehaviour(component, 0);
	}

	get length() {
		return this.fieldLengthState.current;
	}

	setLength(value) {
		this.fieldLengthState.set(value);
	}

}