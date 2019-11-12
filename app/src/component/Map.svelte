<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { center, place, zoom } from '../store/stores';
    import GoogleMap from './GoogleMap.svelte';    
</script>

<style>
    section{
        height: 100vh;
        padding-top: 6.4rem;
        width: 100vw;
    }
</style>

<section>
    <GoogleMap></GoogleMap>
</section>