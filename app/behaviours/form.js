import ComponentStateModifierBehaviour from './component.state.modifier.js';

const formErrorName = 'formError';
const enabledName = 'formEnabled';

export default class FormBehaviour {

	constructor(component) {
		const defaultState = {};
		defaultState[formErrorName] = '';
		defaultState[enabledName] = true;
		this.formState = new ComponentStateModifierBehaviour(component, defaultState);
	}

	get enabled() {
		return this.formState.get(enabledName);
	}

	get disabled() {
		return !this.enabled;
	}

	get error() {
		return this.formState.get(formErrorName);
	}

	disable() {
		this.formState.set(enabledName, false);
	}

	enable() {
		this.formState.set(enabledName, true);
	}

	addError(error) {
		this.formState.set(formErrorName, error);
	}

}