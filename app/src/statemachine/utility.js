// General UI services

// State machine - - - - - - - - - - - - - - - - - - - - - 
export const utility = {
    initial: "running",
    states: {
        running: {
            entry: ['running'],
            invoke: [
                { id: 'DrawerService', src: 'drawerService', autoForward: true },
                { id: 'ModalService', src: 'modalService', autoForward: true },
                { id: 'ScrimService', src: 'scrimService', autoForward: true },
                { id: 'TopbarService', src: 'topbarService', autoForward: true }
            ]
        },
        stopped: {}
    }
}

// Helpers - - - - - - - - - - - - - - - - - - - - - - - - 
export const running = (context, event) => {
    console.log('-> Transition to state: Running.', event);
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - -