import ComponentSingleStateModifierBehaviour from './component.single.state.modifier.js';

export default class TabbedStateBehaviour {

	// must be called from constructor of react component

	constructor(component, defaultTab) {
		this.tabState = new ComponentSingleStateModifierBehaviour(component, defaultTab);
	}

	open(tabName) {
		this.tabState.set(tabName);
	}

	isOpen(tabName) {
		return this.tabState.isCurrent(tabName);
	}

}