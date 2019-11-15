<script>
    import { getContext } from 'svelte';
    import { largestValue, smallestValue }  from '../api/property';
    import { thisProperty } from '../store/stores';

    const stateMachine = getContext('stm');
    
    const closeDetails = () => {
        stateMachine.send({
            stm: stateMachine,
            type: 'CLOSE',
        });
    }  
</script>

<style>
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
        background-color: #eee;
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
       
<section class="container-details">
    <div class="close" on:click={closeDetails}>
        <i class="material-icons">clear</i>
    </div>
    <div class="title">
        <i class="material-icons">my_location</i>
        {$thisProperty.address}</div>
    <div class="container-image-stats">
        <div class="image">
            <img alt="Aerial view of property" src={$thisProperty.imageURI}/>
        </div>
        <div class="stats">
            <div class="heading">Statistics</div>
            <div><span>Location</span>{$thisProperty.coordinates[1]}, {$thisProperty.coordinates[0]}</div>
            <div><span>Estimated value</span>{$thisProperty.estimatedValue}</div>
            <hr/>
            <div><span>Parcel area</span>{$thisProperty.parcelArea}</div>
            <div><span>Zone density</span>{$thisProperty.zoneDensity[0] ? $thisProperty.zoneDensity[0] : 'Not available'}</div>
            <hr />
            { #if !$thisProperty.hasNotes }
                <div class="filings">
                    <div class="topic">Legal filings</div>
                    <div><i class="material-icons">turned_in_not</i></div>
                </div>
                <hr/>
            { /if }
            <div><span>Nearest neighbor</span>{smallestValue($thisProperty.buildingDistances)}</div>
            <div><span>Largest neighbor</span>{largestValue($thisProperty.buildingAreas)}</div>
        </div>
    </div>
</section>
