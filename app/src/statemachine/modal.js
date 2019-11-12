import { Machine } from "xstate";
import { modal } from '../store/stores';

export default Machine(
    {
        id: 'Modal',
        initial: 'starting',
        //strict: true,
        states: {
            starting: {
                entry: ['activated'],
                after: {
                    10: 'closed'
                }
            },
            closed: {
                entry: ['closed'],
                on: {
                    MODAL_ACTION: 'open',
                    MODAL_OPEN: 'open'
                }
            },
            open: {
                entry: ['open'],
                on: {
                    MODAL_ACTION: 'closed',
                    MODAL_CLOSE: 'closed',
                    KEY_ESCAPE: 'closed'
                }
            }
        }
    },
    {
        actions: {
            activated: (context, event) => {
                console.log('-> Activated: Modal service.');
            },
            closed: (context, event) => {
                modal.set({
                    state: 'closed',
                    use: null
                });

                console.log('-> Modal is closed.');
            },
            open: (context, event) => {
                modal.set({
                    state: 'open',
                    use: event.use
                });

                console.log('-> Modal is open. Event:', event);
            }
        }
    }
);