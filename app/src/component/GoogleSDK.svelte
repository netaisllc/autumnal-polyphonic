<script>
  import { onMount } from 'svelte'
  import { mapsLoaded } from '../store/stores';

  onMount(() => {
  // The function is added to global Window so that after loading Google Maps
  // can announce its availability by updating app state.
    window.gMapsReady = () => {
      mapsLoaded.set(true);
      delete window['gMapsReady']
    }
  })
</script>

<svelte:head>
  <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAX-E8T3dOt5VuYVr5Z76GxtaRUoFPL5aM&callback=gMapsReady"></script>
</svelte:head>
