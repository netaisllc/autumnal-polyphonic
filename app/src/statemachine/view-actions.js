// Actions specific to the View state
import { listProperties, listState, thisProperty } from '../store/stores';
import placeholder from '../api/placeholder';

export const clear = (context, event) => {
	console.log('-> Transition to state: Clear.', event);
	listProperties.set([]);
	event.stm.send({
		type: 'LIST',
		stm: event.stm,
	});
};

export const close = (context, event) => {
	console.log('-> Transition to state: Close.', event);
	event.stm.send({
		type: 'SCRIM_HIDE',
		stm: event.stm,
	});
	event.stm.send({
		type: 'RESULTS',
		stm: event.stm,
	});
	listState.set('results');
};

export const details = (context, event) => {
	console.log('-> Transition to state: Details.', event);
	event.stm.send({
		type: 'SCRIM_SHOW',
		stm: event.stm,
	});
	listState.set('details');
	thisProperty.set(event.property);
};

const patchImageURI = (collection) => {
	return collection.map((member) => {
		if (typeof member.imageURI === 'object') {
			console.info('Used image placeholder, member.id');
			member.imageURI = placeholder;
		}
		return member;
	});
};

export const results = (context, event) => {
	console.log('-> Transition to state: Results.', event);
	listState.set('results');
};

export const searching = async (context, event) => {
	console.log('-> Transition to state: Searching.', event);
	const uri = `http://localhost:3000/property?latitude=${event.latitude}&longitude=${event.longitude}&radius=${event.radius}`;
	const res = await fetch(uri);
	let found = await res.json();
	if (found && found.length > 0) {
		console.info('Found', found);
		found = patchImageURI(found);
		listProperties.set(found);
	} else {
		listProperties.set([]);
	}
	event.stm.send({
		type: 'RESULTS',
		stm: event.stm,
	});
};
