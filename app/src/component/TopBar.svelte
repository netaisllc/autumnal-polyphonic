<script>
    import IconButton from './IconButton.svelte';
    import { topbar } from '../store/stores.js';
    import { getContext } from 'svelte';

    // Set the menu icon based on whether the drawer is open or closed
    $: menuIcon = $topbar.menuActive ? 'arrow_back' : 'menu';
    $: iconState = $topbar.menuActive ? 'inactive' : 'active';

    const stateMachine = getContext('stm');

    const drawerHandler = e => {
        stateMachine.send({
            type: 'MENU_ACTION',
            stm: stateMachine
        });
    }

    const accountHandler = e => {
        stateMachine.send({
            type: 'ACCOUNT_ACTION',
            stm: stateMachine,
            use: "account"
        });
    }

    const announcementsHandler = e => {
        stateMachine.send({
            type: 'ANNOUNCEMENTS_ACTION',
            stm: stateMachine,
            use: "feedback"
        });
    }

    const feedbackHandler = e => {
        stateMachine.send({
            type: 'FEEDBACK_ACTION',
            stm: stateMachine,
            use: "feedback"
        });
    }
</script>

<style>
    section {
        background-color: #242424;
        /* rgba(66, 133, 244);*/
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        color: rgba(240, 240, 240);
        display: flex;
        flex-direction: row;
        height: 6.4rem;
        left: 0;
        padding: 0.8rem 1.2rem;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 500;
    }

    span.title {
        padding-left: 1rem;
        font-size: 16pt;
    }

    .topbar-left,
    .topbar-right {
        display: flex;
        align-items: center;
        min-width: 25%;
    }

    .topbar-right {
        flex-grow: 1;
        justify-content: flex-end;
    }
</style>

<section id="top-bar">
    <!-- Uses Svelte event system to drae event from IconButton component-->
    <div class="topbar-left">
        <IconButton icon="{menuIcon}" event="menu" on:menu={drawerHandler} iconstate="active"></IconButton>
        <span class="title">Proper.ty &bullet; Browse all the roofs</span>
    </div>
    <!-- div class="topbar-right">
        <IconButton icon="notifications_none" event="announcements" on:announcements={announcementsHandler}
            iconstate="{iconState}">
        </IconButton>
        <IconButton icon="announcement" event="feedback" on:feedback={feedbackHandler} iconstate="{iconState}">
        </IconButton>
        <IconButton icon="account_circle" event="account" on:account={accountHandler} iconstate="{iconState}">
        </IconButton>
    </div -->
</section>