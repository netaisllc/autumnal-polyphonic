import { Machine } from "xstate";
import { drawer } from '../store/stores';

export default Machine(
    {
        id: 'Drawer',
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
                    DRAWER_ACTION: 'open',
                    DRAWER_OPEN: 'open',
                }
            },
            open: {
                entry: ['open'],
                on: {
                    DRAWER_ACTION: 'closed',
                    DRAWER_CLOSE: 'closed',
                    KEY_ESCAPE: 'closed'
                }
            }
        }
    },
    {
        actions: {
            activated: (context, event) => {
                console.log('-> Activated: Drawer service.');
            },
            closed: (context, event) => {
                drawer.set('closed');
                // First transition doesn't carry the STM
                event.stm ? event.stm.send({
                    type: 'DRAWER_CLOSE',
                    stm: event.stm
                }) : null;

                console.log('-> Drawer is closed.');
            },
            open: (context, event) => {
                drawer.set('open');
                event.stm.send({
                    type: 'DRAWER_OPEN',
                    stm: event.stm
                });

                console.log('-> Drawer is open.');
            }
        }
    }
);