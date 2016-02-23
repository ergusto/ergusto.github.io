import ComponentSingleStateModifierBehaviour from './component.state.modifier.js';

export default class TabbedStateBehaviour {

	constructor(component, defaultTab) {
		console.log('TabbedStateBehaviour:', defaultTab);
		this.tabState = new ComponentSingleStateModifierBehaviour(component, defaultTab);
	}

	init() {
		this.tabState.init();
	}

	open(tabName) {
		this.tabState.set(tabName);
	}

	isOpen(tabName) {
		return this.tabState.isCurrent(tabName);
	}

}