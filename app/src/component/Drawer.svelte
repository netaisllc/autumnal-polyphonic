<script>
    import MenuGroup from './MenuGroup.svelte';
    import { drawer } from '../store/stores.js';
</script>

<style>
    section {
        background-color: #fafafa;
        height: 100vh;
        left: -28.8rem;
        padding: 7.4rem 0 0;
        position: absolute;
        top: 0;
        transition: left 250ms ease-in-out;
        width: 28.8rem;
        z-index: 20;
    }

    section.closed {
        left: -28.8rem;
    }

    section.open {
        left: 0;
    }
</style>

<section class="{$drawer}" id="drawer">
    <MenuGroup></MenuGroup>
</section>