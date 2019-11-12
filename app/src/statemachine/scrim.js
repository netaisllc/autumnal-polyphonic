import { Machine } from "xstate";
import { scrim } from '../store/stores';

export default Machine(
    {
        id: 'Scrim',
        initial: 'starting',
        //strict: true,
        states: {
            starting: {
                entry: ['activated'],
                after: {
                    10: 'hidden'
                }
            },
            hidden: {
                entry: ['hidden'],
                on: {
                    DRAWER_OPEN: 'visible',
                    MODAL_ACTION: 'visible',
                    MODAL_OPEN: 'visible',
                    SCRIM_SHOW: 'visible',
                }
            },
            visible: {
                entry: ['visible'],
                on: {
                    DRAWER_CLOSE: 'hidden',
                    MODAL_ACTION: 'hidden',
                    MODAL_CLOSE: 'hidden',
                    KEY_ESCAPE: 'hidden',
                    SCRIM_HIDE: 'hidden',
                }
            }
        }
    },
    {
        actions: {
            activated: (context, event) => {
                console.log('-> Activated: Scrim service.');
            },
            hidden: (context, event) => {
                console.log('-> Scrim is hidden.');
                scrim.set('hidden');
            },
            visible: (context, event) => {
                console.log('-> Scrim is visible.');
                scrim.set('visible');
            }
        }
    }
);
