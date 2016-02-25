import ComponentSingleStateModifierBehaviour from './component.single.state.modifier.js';

export default class ShouldShowBehaviour {

	constructor(component, defaultState) {
		this.shouldShowState = new ComponentSingleStateModifierBehaviour(defaultState);
	}

}