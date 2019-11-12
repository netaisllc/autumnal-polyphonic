<script>
    import { drawer } from '../store/stores.js';
    import Item from './MenuItem.svelte';

    $: state = $drawer;
</script>

<style>
    .menu-group {
        border-bottom: 1px solid #e9e9e9;
        padding: 1rem 0;
    }
</style>

<section>
    <div class=" menu-group">
        <Item icon="home" name="Home" view="home"></Item>
        <Item icon="explore" name="Search by Lat/Lng" view="list"></Item>
        <Item icon="public" name="Search by Place" view="map"></Item>
        <Item icon="notes" name="Dev notes" view="notes"></Item>
    </div>
</section>