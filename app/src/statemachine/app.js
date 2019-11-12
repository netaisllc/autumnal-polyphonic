import drawerService from './drawer.js';
import modalService from './modal.js';
import scrimService from './scrim.js';
import topbarService from './topbar.js';
import { Machine, interpret } from 'xstate';
import { running, utility } from './utility.js';
import { home, list, map, notes, view } from './view.js';
import { clear, close, details, results, searching } from './view-actions.js';

const stateMachineDefinition = Machine(
	{
		id: 'Application',
		//strict: true,
		type: 'parallel',
		states: {
			// App wide utility services
			utility: utility,
			// Routable app views
			view: view,
		},
	},
	{
		actions: {
			clear: clear,
			close: close,
			details: details,
			home: home,
			list: list,
			map: map,
			notes: notes,
			results: results,
			running: running,
			searching: searching,
		},
		services: {
			drawerService: drawerService,
			modalService: modalService,
			scrimService: scrimService,
			topbarService: topbarService,
		},
	}
);

export const stateMachine = interpret(stateMachineDefinition);
