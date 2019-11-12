<script>
    import { getContext } from 'svelte';
    import { scrim } from '../store/stores';

    const stateMachine = getContext('stm');
</script>

<style>
    section {
        background-color: rgba(0, 0, 0, 1.0);
        height: 0;
        left: 0;
        position: fixed;
        top: 0;
        transition: opacity 400ms ease-in-out;
        width: 0vw;
        z-index: 10;
    }

    section.hidden {
        opacity: 0;
    }

    section.visible {
        height: 100vh;
        opacity: 0.33;
        width: 100vw;
    }
</style>

<section class="{$scrim}" id="scrim"></section>