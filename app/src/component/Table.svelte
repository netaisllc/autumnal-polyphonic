<script>
    import { fade } from 'svelte/transition';
    import { getContext } from 'svelte';
    import { listProperties, listState } from '../store/stores';
    import Details from './Details';

    const stateMachine = getContext('stm');

    export let latitude;
    export let longitude;
    export let radius;

    let thisProperty;

    let i = 0;

    $: plural = $listProperties.length > 1 ? 'properties were' : 'property was';
    $: showDetails = $listState === 'details';
    $: showProperties = $listState === 'results';
    
    const details = (property, i) => {
        thisProperty = property;
        stateMachine.send({
            stm: stateMachine,
            type: 'DETAILS',
            property: property
        });        
    }
</script>

<style>
    .notice {
        background-color: #FFFFFF;
        border-radius: 2px;font-weight: 300;
        padding: 1rem 2rem;
    }

    .container-table {
        margin-top: 2rem;
    }

    .row {
        background-color: #FFFFFF;
        border-radius: 2px;
        display: flex;
        height: 7rem;
        justify-content: space-between;
        line-height: 5rem;
        margin-bottom: 0.5rem;
        padding: 1rem;
    }
    .row div {
        font-size: 1.5rem;
    }
    .row div + div {
        margin-left: 1rem;
    }
    .row img {
        border-radius: 25px;
        box-shadow: 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20);
        height: 5rem;
        width: 5rem;
    }
    .row span {
        color: #787878;
        font-weight: 300;
    }
    .row button {
        background-color: white;
        border: 2px solid turquoise;
        color: #000000;
        cursor: pointer;
        font-size: 1.5rem;
        height: 4rem;
        line-height: 3.8rem;
        margin-top: 0.5rem;
        padding: 0;
        transition: background-color 300ms ease-in-out;
        width: 8rem;
    }
    .row button:hover {
        background-color: turquoise;
        color: white;
    } 
</style>
       
<section in:fade>
    { #if showDetails }
        <Details />
    { :else }
        { #if !$listProperties || $listProperties.length < 1 }
            <div class="notice">No properties were located.</div>
        { :else }
            <div>
                {$listProperties.length} {plural} found within {radius} meters of coordinates {latitude}, {longitude}
            </div>
            <div class="container-table">
                {#each $listProperties as property, i (property.id) }
                    <div class="row">
                        <div class="image">
                            <img alt="Property" src={property.imageURI}/>
                        </div> 
                        <div><span>Address:</span> {property.address}</div> 
                        <div><span>Location:</span> ({property.coordinates[1]}, {property.coordinates[0]})</div>
                        <button on:click="{e => details(property, i)}">Details</button>
                    </div>                            
                {/each}
            </div>                
        { /if }
    {/if }
</section> 

