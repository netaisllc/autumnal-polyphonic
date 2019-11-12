import { Machine } from "xstate";
import { topbar } from '../store/stores';

const register = (prop) => {
    let obj = {
        accountActive: false,
        announcementsActive: false,
        feedbackActive: false,
        menuActive: false,
    }
    prop ? obj[prop] = true : null;
    return obj;
}

export default Machine(
    {
        id: 'Topbar',
        initial: 'starting',
        //strict: true,
        states: {
            account: {
                entry: ['accountEntry'],
                exit: ['accountExit'],
                on: {
                    ACCOUNT_ACTION: 'default',
                    ANNOUNCEMENTS_ACTION: 'announcements',
                    FEEDBACK_ACTION: 'feedback',
                    KEY_ESCAPE: 'default',
                    MENU_ACTION: 'menu'
                }
            },
            announcements: {
                entry: ['announcementsEntry'],
                exit: ['announcementsExit'],
                on: {
                    ACCOUNT_ACTION: 'account',
                    ANNOUNCEMENTS_ACTION: 'default',
                    FEEDBACK_ACTION: 'feedback',
                    KEY_ESCAPE: 'default',
                    MENU_ACTION: 'menu'
                }
            },
            default: {
                entry: ['defaultEntry'],
                on: {
                    ACCOUNT_ACTION: 'account',
                    ANNOUNCEMENTS_ACTION: 'announcements',
                    FEEDBACK_ACTION: 'feedback',
                    KEY_ESCAPE: 'default',
                    MENU_ACTION: 'menu'
                }
            },
            feedback: {
                entry: ['feedbackEntry'],
                exit: ['feedbackExit'],
                on: {
                    ACCOUNT_ACTION: 'account',
                    ANNOUNCEMENTS_ACTION: 'announcements',
                    FEEDBACK_ACTION: 'default',
                    KEY_ESCAPE: 'default',
                    MENU_ACTION: 'menu'
                }
            },
            menu: {
                entry: ['menuEntry'],
                exit: ['menuExit'],
                on: {
                    ACCOUNT_ACTION: 'account',
                    ANNOUNCEMENTS_ACTION: 'announcements',
                    FEEDBACK_ACTION: 'feedback',
                    KEY_ESCAPE: 'default',
                    MENU_ACTION: 'default'
                }
            },
            starting: {
                entry: ['activated'],
                after: {
                    10: 'default'
                }
            },
        }
    },
    {
        actions: {
            accountEntry: (context, event) => {
                topbar.set(register('accountActive'));
                event.stm.send({
                    type: "MODAL_OPEN",
                    use: "account",
                    stm: event.stm
                });
                console.log('-> Topbar: Account entry.');
            },
            accountExit: (context, event) => {
                event.stm.send({
                    type: "MODAL_CLOSE",
                    stm: event.stm
                });
                console.log('-> Topbar: Account exit.');
            },
            activated: (context, event) => {
                console.log('-> Activated: Topbar service.');
            },
            announcementsEntry: (context, event) => {
                topbar.set(register('announcementsActive'));
                event.stm.send({
                    type: "MODAL_OPEN",
                    use: "announcements",
                    stm: event.stm
                });
                console.log('-> Topbar: Announcements entry.');
            },
            announcementsExit: (context, event) => {
                event.stm.send({
                    type: "MODAL_CLOSE",
                    stm: event.stm
                });
                console.log('-> Topbar: Announcements exit.');
            },
            defaultEntry: (context, event) => {
                topbar.set(register());
                console.log('-> Topbar: Default entry.');
            },
            feedbackEntry: (context, event) => {
                topbar.set(register('feedbackActive'));
                event.stm.send({
                    type: "MODAL_OPEN",
                    use: "feedback",
                    stm: event.stm
                });
                console.log('-> Topbar: Feedback entry.');
            },
            feedbackExit: (context, event) => {
                event.stm.send({
                    type: "MODAL_CLOSE",
                    stm: event.stm
                });
                console.log('-> Topbar: Feedback exit.');
            },
            menuEntry: (context, event) => {
                topbar.set(register('menuActive'));
                event.stm.send({
                    type: 'DRAWER_OPEN',
                    stm: event.stm
                });
                console.log('-> Topbar: Menu entry.');
            },
            menuExit: (context, event) => {
                event.stm.send({
                    type: 'DRAWER_CLOSE',
                    stm: event.stm
                });
                console.log('-> Topbar: Menu exit.');
            }
        }
    }
);
