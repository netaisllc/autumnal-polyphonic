<script>
    import { fade } from 'svelte/transition';
    import { getContext } from 'svelte';
    import { listProperties, listState } from '../store/stores.js';
    import { closestNeighbor }  from '../api/property.js';

    const stateMachine = getContext('stm');

    let i = 0;
    let latitude // = 25.7616798 //41.8781;
    let longitude//  = -80.19179 //-87.6298;
    let radius = 150000;
    let thisProperty;

    $: plural = $listProperties.length > 1 ? 'properties were' : 'property was';
    $: searchEnabled = (latitude && longitude && radius);
    $: showCoordinates = $listState === 'list';
    $: showProperties = $listState === 'results';
    $: showDetails = $listState ==='details';
    

    const clear = () => {
        latitude = ''
        longitude = ''
        radius = ''
        stateMachine.send({
            stm: stateMachine,
            type: 'CLEAR',
        });
    }

    const closeDetails = () => {
        stateMachine.send({
            stm: stateMachine,
            type: 'CLOSE',
        });
    }

    const details = (property, i) => {
        thisProperty = property;
        stateMachine.send({
            stm: stateMachine,
            type: 'DETAILS',
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
        width: 8rem;
    }
    .row button:hover {
        background-color: turquoise;
        color: white;
    }

    .container-details {
        background-color: white;
        border-radius: 3px;
        box-shadow: 0 3px 4px 0 rgba(0,0,0,0.14), 0 3px 3px -2px rgba(0,0,0,0.12), 0 1px 8px 0 rgba(0,0,0,0.20);
        display: flex;
        flex-direction: column;
        height: auto;
        left: 10vw;
        position: absolute;
        top: 15vh;
        width:80vw;
        z-index: 20;
    }

    .container-details .close {
        align-items: center;
        border-radius: 1.5rem;
        color: #D8D8D8;
        cursor: pointer;
        display: flex;
        height: 3rem;
        justify-content: center;
        position: absolute;
        right: 1rem;
        top: 1rem;
        transition: background-color 300ms ease;
        width: 3rem;
    }
    .container-details .close:hover {
        background-color:#D8D8D8;
        color: #000;
    }    
    .container-details .title {
        background-color: black;
        color: white;
        font-size: 3.5rem;
        height: 7rem;
        line-height: 6.8rem;
        margin: 0;
        padding: 0 3rem 0 1.5rem;
        width: 100%;
    }
    .container-details .title i {
        margin-right: 1.2rem;
    }

    .container-image-stats {
        display: flex;
        height: 100%; 
        overflow: hidden;       
    }
    .container-image-stats .image {
        height: 100%;
        width: 50%;
    }
    .container-image-stats .stats {
        background-color: #343434;
        color: white;
        padding: 5vh 5vw;
        width: 50%;
    }
    .container-image-stats .stats .heading {
        font-size: 2.5rem;
        margin-bottom: 2rem;
    }
    .container-image-stats .stats span {
        color: #D8D8D8;
        display: inline-block;
        font-weight: 300;
        margin-bottom: 1rem;
        margin-right: 1rem;
        width: 12rem;
    }
    .container-image-stats .stats hr {
        border-color: #292929;
        margin: 0.5rem 0 1.5rem 0;
    }
    .container-image-stats .filings {
        display: flex;
        height: 3rem;
    }
    .container-image-stats .filings .topic {
        font-weight: 300;
        margin-bottom: 1rem;
        margin-right: 1rem;
        width: 12rem;
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
         <section in:fade>
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
         </section> 
        { /if }

        { #if showDetails }
            <section class="container-details">
                <div class="close" on:click={closeDetails}>
                    <i class="material-icons">clear</i>
                </div>
                <div class="title">
                    <i class="material-icons">my_location</i>
                    {thisProperty.address}</div>
                <div class="container-image-stats">
                    <div class="image">
                        <img alt="Property" src={thisProperty.imageURI}/>
                    </div>
                    <div class="stats">
                        <div class="heading">Statistics</div>
                        <div><span>Location</span>{thisProperty.coordinates[1]}, {thisProperty.coordinates[0]}</div>
                        <div><span>Estimated value</span>{thisProperty.estimatedValue}</div>
                        <hr/>
                        <div><span>Parcel area</span>{thisProperty.parcelArea}</div>
                        <div><span>Zone density</span>{thisProperty.zoneDensity[0]}</div>
                        <hr />
                        { #if !thisProperty.hasNotes }
                            <div class="filings">
                                <div class="topic">Legal filings</div>
                                <div><i class="material-icons">turned_in_not</i></div>
                            </div>
                            <hr/>
                        { /if }
                        <div><span>Nearest neighbor</span>{closestNeighbor(thisProperty.buildingDistances)}</div>
                        <div><span>Largest neighbor</span>{closestNeighbor(thisProperty.buildingAreas)}</div>
                    </div>
                </div>
            </section>
        { /if }
    </div>
</section>

