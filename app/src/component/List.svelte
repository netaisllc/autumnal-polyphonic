<script>
    import { fade } from 'svelte/transition';
    import { getContext } from 'svelte';
    import { listProperties, listState } from '../store/stores.js';
    import { largestValue, smallestValue }  from '../api/property.js';
    import Table from './Table.svelte';

    const stateMachine = getContext('stm');

    let i = 0;
    let latitude;
    let longitude;
    let radius;

    $: plural = $listProperties.length > 1 ? 'properties were' : 'property was';
    $: searchEnabled = (latitude && longitude && radius);
    $: showCoordinates = $listState === 'list';
    $: showProperties = $listState === 'results' || $listState === 'details';
    
    
    const locationChicago = () => {
        latitude = 41.8781;
        longitude = -87.6298;
        radius = 85000;
    }

    const locationMiami = () => {
        latitude = 25.7616798;
        longitude = -80.19179;
        radius = 150000;
    }

    const locationNewYorkCity = () => {
        latitude = 40.730610;
        longitude = -73.935242;
        radius = 100000;
    }

    const clear = () => {
        latitude = ''
        longitude = ''
        radius = ''
        stateMachine.send({
            stm: stateMachine,
            type: 'CLEAR',
        });
    }

    const doSearch = () => {
        stateMachine.send({
            latitude: latitude,
            longitude: longitude,
            radius: radius,
            stm: stateMachine,
            type: 'SEARCHING',
        });
    }

    const newSearch = () => {
        if (showProperties) {
            stateMachine.send({
                stm: stateMachine,
                type: 'LIST',
            });
        }
    }    

    const seeResults = () => {
        if (showCoordinates) {
            stateMachine.send({
                stm: stateMachine,
                type: 'RESULTS',
            });
        }
    }    
</script>

<style>
    .main {
        background-color: #F7F7F7;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
    }
    div {
        font-size: 1.75rem;
    }

    .container,
    .container-inputs {
        display: flex;
        flex-direction: column;
    }
    .container-commands,
    .container-input,
    .container-tabs {
        display: flex;
    }

    .container {
        margin: 20vh 20vw;
    }

    .title {
        font-size: 5rem;
        font-weight: 300;
        line-height: 5rem;
        margin-bottom: 1rem;
    }

    .sub-title {
        color: #454545;
        font-size: 2.67rem;
        font-weight: 300;
        line-height: 2.75rem;
        margin-bottom: 3rem;
    }

    .container-tabs {
        margin-bottom: 3rem;
    }

    .tab {
        background-color: #E6E6E6;
        border: 1px solid #D8D8D8;
        border-bottom: none;
        color: #ABABAB;
        cursor: pointer;
        flex: 0 0 auto;
        font-size: 2rem;
        padding: 1rem 2rem;
        transition: background-color 300ms ease-in-out;
    }
    .tab:hover {
        background-color: #D8D8D8;
        color: #000000;
    }
    .tab.active ,
    .tab.active:hover{
        background-color: #F7F7F7;
        border-bottom: 2px solid #F7F7F7;
        color: #000000;
        cursor: default;
    }
    .tab.filler {
        background-color: #F7F7F7;
        border: none;
        border-bottom: 1px solid #D8D8D8;
        flex: 1 1 auto;
    }

    .container-coordinates {
        display: flex;
    }

    .container-helpers {
        display: flex;
        margin-left: 2rem;
    }

    .pinned {
        display: flex;
        flex: 0 0 4rem;
        font-size: 1.5rem;
        height: 3rem;
        line-height: 3rem;
        margin-left: 1rem;
        max-width: 4em;
        padding: 0 1rem;
        transition: background-color 300ms ease-in-out;
    }
    .pinned:hover {
        border-bottom: 2px solid turquoise;
        cursor: pointer
    }
    .pinned i {
        color: turquoise;
        font-size: 1.85rem;
        height: 3rem;
        line-height: 3rem;
        margin: 0 3px 0 -3px;
        padding: 0;
    }

    .container-inputs {
        background-color: white;
        border-radius: 3px;margin-bottom: 3rem;
        padding: 2rem;
    }

    .container-input {
        margin: 2rem 1rem;
        width: 40rem;
    }
    .container-input label {
        height: 2.5rem;
        width: 15rem;
    }
    .container-input input {
        border: none;
        border-bottom: 1px solid #A5A5A5;        
        font-size: 2rem;
        height: 2.5rem;
        outline: none;
        width: 20rem;
    }
    .container-input input:focus {
        border-bottom: 2px solid turquoise;
    }

    button,
    button.disabled,
    button.disabled:hover {
        background-color: #F7F7F7;
        border: none;
        color: #ABABAB;
        cursor: default;
        height: 6rem;
        padding: 1rem;
        transition: background-color 300ms ease-in-out;
        width: 15rem;
    } 
    button:hover {
        background-color: #D8D8D8;
        color: #000000;
        cursor: pointer;
    }
    button.active {
        background-color: white;
        border:  2px solid turquoise;
        color: #000000;
        font-size: 2rem;        
    } 
    button.active:hover {
        color: white;
        background-color :turquoise;
    }
    button + button {
        margin-left: 2rem;
    }
</style>

<section class="main" in:fade>
    <div class="container">
        <div class="title">Search by Coordinates</div>
        <div class=sub-title>Find properties located near a geographic point</div>
        <div class="container-tabs">
            <div 
                class="tab"
                class:active={showCoordinates}
                on:click={newSearch}
                >
                Coordinates</div>
            <div 
                class="tab"
                class:active={showProperties}
                on:click={seeResults}
                >
                Properties</div>
            <div class="tab filler"></div>
        </div>

        { #if showCoordinates }
        <section in:fade>
            <div class="container-coordinates">
                <div class="container-inputs">
                    <div class=container-input>
                        <label>Latitude</label>
                        <input bind:value={latitude}/>
                    </div>
                    <div class=container-input>
                        <label>Longitude</label>
                        <input bind:value={longitude}/>
                    </div>
                    <div class=container-input>
                        <label>Radius (meters)</label>
                        <input bind:value={radius}/>
                    </div>
                </div>
                <div class="container-helpers">
                    <div class="pinned" on:click={locationChicago}>
                        <i class="material-icons">explore</i>
                        CHI
                    </div>
                    <div class="pinned" on:click={locationMiami}>
                        <i class="material-icons">explore</i>
                        MIA
                    </div>
                    <div class="pinned" on:click={locationNewYorkCity}>
                        <i class="material-icons">explore</i>
                        NYC
                    </div>
                </div>
            </div>
            
            <div class="container-commands">
                <button 
                    class:active={searchEnabled}
                    class:disabled={!searchEnabled} 
                    disabled={!searchEnabled} 
                    on:click={doSearch}              
                    >
                    Search
                </button>
                <button
                    class:disabled={!searchEnabled} 
                    disabled={!searchEnabled}   
                    on:click={clear}               
                    >
                    Clear
                </button>
            </div>
        </section>        
        { /if }

        { #if showProperties }
        <Table latitude={latitude} longitude={longitude} radius={radius}/>          
        { /if }        
    </div>
</section>

