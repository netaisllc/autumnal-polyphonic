import App from './component/App.svelte';

const app = new App({
	target: document.body,
});

// Google maps calls this when it's loaded into window
window.initMap = function ready() {
	app.$set({ mapReady: true });
};

// For debugging :)
window.app = app;

export default app;
