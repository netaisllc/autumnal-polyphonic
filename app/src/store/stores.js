// store.js - Stores are always lowercase
import { writable } from 'svelte/store';

// Google maps related
export const center = writable({ lat: 37.7953992, lng: -122.2732828 });
export const mapsLoaded = writable(false);
export const place = writable('Oakland, CA');
export const zoom = writable(14);

// UI related
export const drawer = writable(false);

export const modal = writable({
	// State is open | closed in terms of visibility
	// Use is the type of modal which guides dimensions and position
	state: 'closed',
	use: null,
});

export const page = writable({
	// Component is a Svelte component, name is a string description of @view,
	// and props are, well, props
	component: null,
	name: null,
	props: {},
});

export const scrim = writable(false);

export const topbar = writable({
	// True declares that the icon and feature the active chaoice
	accountActive: false,
	announcementsActive: false,
	feedbackActive: false,
	menuActive: false,
});

export const listProperties = writable([]);
export const listState = writable('');
export const thisProperty = writable();
