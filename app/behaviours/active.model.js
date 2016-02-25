import ComponentSingleStateModifierBehaviour from './component.single.state.modifier.js';

// for when you need to reactively keep track of a model id value

export default class ActiveModelStateBehaviour {

	// must be called from constructor of react component

	constructor(component, defaultState) {
		this.activeModelState = new ComponentSingleStateModifierBehaviour(component, defaultState);
	}

	get current() {
		return this.activeModelState.current;
	}

	set(id) {
		this.activeModelState.set(id);
	}

	clear() {
		this.activeModelState.set(null);
	}

	is(id) {
		return this.activeModelState.current == id;
	}

}