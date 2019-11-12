// Routable states
import { listProperties, listState, page } from '../store/stores';

// State machine - - - - - - - - - - - - - - - - - - - - -
export const view = {
	initial: 'home',
	states: {
		clear: {
			entry: [ 'clear' ],
			on: {
				LIST: 'list',
			},
		},
		close: {
			entry: [ 'close' ],
			on: {
				RESULTS: 'results',
			},
		},
		details: {
			entry: [ 'details' ],
			on: {
				CLOSE: 'close',
			},
		},

		home: {
			entry: [ 'home' ],
			on: {
				LIST: 'list',
				MAP: 'map',
				NOTES: 'notes',
			},
		},
		list: {
			entry: [ 'list' ],
			on: {
				CLEAR: 'clear',
				HOME: 'home',
				MAP: 'map',
				NOTES: 'notes',
				RESULTS: 'results',
				SEARCHING: 'searching',
			},
		},
		map: {
			entry: [ 'map' ],
			on: {
				HOME: 'home',
				LIST: 'list',
				NOTES: 'notes',
			},
		},
		notes: {
			entry: [ 'notes' ],
			on: {
				HOME: 'home',
				LIST: 'list',
				MAP: 'map',
			},
		},
		results: {
			entry: [ 'results' ],
			on: {
				DETAILS: 'details',
				HOME: 'home',
				LIST: 'list',
				MAP: 'map',
				NOTES: 'notes',
			},
		},
		searching: {
			entry: [ 'searching' ],
			on: {
				CLEAR: 'clear',
				RESULTS: 'results',
			},
		},
	},
};

// Primary View helpers - - - - - - - - - - - - - - - - - - - - - - - -
export const home = async (context, event) => {
	console.log('-> Transition to state: Home.', event);
	let module = await import('../component/Hub.svelte');
	page.set({
		component: module.default,
		name: 'home',
		props: {},
	});
	listProperties.set([]);
};

export const list = async (context, event) => {
	console.log('-> Transition to state: List.', event);
	let module = await import('../component/List.svelte');
	page.set({
		component: module.default,
		name: 'list',
		props: {},
	});
	listState.set('list');
};

export const map = async (context, event) => {
	console.log('-> Transition to state: Map.', event);
	let module = await import('../component/Map.svelte');
	page.set({
		component: module.default,
		name: 'map',
		props: {},
	});
	listProperties.set([]);
};

export const notes = async (context, event) => {
	console.log('-> Transition to state: Notes.', event);
	let module = await import('../component/Notes.svelte');
	page.set({
		component: module.default,
		name: 'notes',
		props: {},
	});
	listProperties.set([]);
};
