<script>
	import { mapsLoaded, page } from '../store/stores';
	import { setContext } from 'svelte';
	import { stateMachine } from "../statemachine/app";
	import Drawer from './Drawer.svelte';
	import Modal from './Modal.svelte';
	import Scrim from './Scrim.svelte';
	import TopBar from './TopBar.svelte';
	import GoogleSDK from './GoogleSDK.svelte'

	// Start application statemachine to invoke long running services
	// implemented as invoked machines.
	stateMachine.start();

	// Cache the statemachine n Svelte's @context to easily expose 
	// it to other components
	setContext('stm', stateMachine);

	/* 
		Trap use of Escape key and emit to application statemachine.
		This is a good example of concern separation. The concern of this
		function is to trap the use of the Escape key and, when it is used, to 
		emit an event to the app statemachine. (It does not know nor care what
		happens after that.) In practice, the event is ignored unless the app
		statemachine or one of its invoked services is in a state that is sensitive
		to Escape.
	*/
	const escapeHandler = e => {
		if (e.key.toLowerCase().includes('esc')) {
			stateMachine.send({
				type: 'KEY_ESCAPE',
				stm: stateMachine
			});
		}
	}
</script>

<!-- This collaboeates with the $page store to perform client side routing -->
<svelte:component this={$page.component} {...$page.props} />

<!-- Common components -->
<Drawer></Drawer>
<Modal></Modal>
<Scrim></Scrim>
<TopBar></TopBar>
<GoogleSDK></GoogleSDK>