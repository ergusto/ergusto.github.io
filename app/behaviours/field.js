import ComponentSingleStateModifierBehaviour from './component.single.state.modifier.js';

export default class FieldLengthStateBehaviour {

	constructor(component) {
		this.fieldLength = new ComponentSingleStateModifierBehaviour(component, 0);
	}

	get length() {
		return this.fieldLength.current;
	}

	setLength(value) {
		this.fieldLength.set(value);
	}

}