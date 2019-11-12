<script>
    import { fade } from 'svelte/transition';
    import { getContext } from 'svelte';
    import { modal } from '../store/stores.js';

    const stateMachine = getContext('stm');
    $: visible = $modal.state === 'open' ? true : false;
</script>

<style>
    section {
        background-color: white;
        border-radius: 3px;
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.12), 0 1px 8px 0 rgba(0, 0, 0, 0.20);
        position: absolute;
        z-index: 520;
    }

    /* TODO - make these responsive */

    section.account {
        top: 4.5rem;
        right: 2.5rem;
        height: 25rem;
        width: 20rem;
    }

    section.announcements {
        top: 4.5rem;
        right: 11.5rem;
        height: 55rem;
        width: 30rem;
    }

    section.feedback {
        top: 4.5rem;
        right: 6.8rem;
        height: 30rem;
        width: 60rem;
    }

    section.property {
        top: 2rem;
        left: 2rem;
        height: 67vh;
        width: 80vw;
    }
</style>

{#if visible}
    <section class="{$modal.use}" id="modal" transition:fade>
    </section>
{/if}