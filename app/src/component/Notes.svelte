<script>
    import { fade } from 'svelte/transition';
</script>

<style>
    section {
        color: #000;
        height: calc(100vh - 4.8rem);
        padding: 10rem;
        width: 100vw;
    }
    h2 {
        font-size: 2.25rem;
        margin: 2rem 0 1rem;
    }
    div {
        font-size: 1.75rem;
    }
    .code {
        background-color: white;
        border-radius: 2px;
        color: darkblue;
        font-family: 'Courier New', Courier, monospace;
        font-weight: bold;
        font-size: 1.45rem;
        padding: 1px 3px;
    }
    .bad {
        color: #b22222;
        font-weight: bold;
    }
</style>

<section in:fade>
    <h2>Overview</h2>
    <div>The provided Docker service was interpreted as a 3rd-party API. We wrote our own consolidating API to service our UI application.</div>
    <div>Features implemented include:</div> 

    <div>&bull; Query properties by <b>Lat/Lng</b> and see results in a table; <b>Serach radius</b> is arbitrarily limited to 256,000 meters.</div>
    <div>&bull; Inspect "details" of a property represented as a row in the query results table</div>
    <div>&bull; Query properties by entering a <b>place name</b> onto a map surface (City names work really well here.)</div>
    <div>&bull; Review property details by clicking a marker dropped on the map surface representing the property</div>

    <h2>Stack</h2>
    
    <div>&bull; <b>API</b>: the API layer was written in <b>TypeScript</b> and runs as a conventional <b>Express/NodeJS</b> application; it is not secured and assumes the Docker service
        to be fixed in regard to <i>host</i> and <i>port</i> as specified in the Docker configuration.
    </div>

    <div>&bull; <b>Image processing</b>: the API layer makes use of a Node package named <b>Sharp</b> which ships with its own binaries; thus, platform differences might cause havoc. It is 
        generally well-behaved on MacOS and Ubuntu. I didn't test it on Windows.
    </div>

    <div>&bull; <b>UI</b>: the application UI was written in <b>JavaScript</b> using the <b>Svelte</b> library. It, too, does not employ authentication and assumes the NodeJS API is fixed
    in regard to <i>host</i> (<span class="code">localhost</span>) and <i>port</i> (<span class="code">3000</span>). It has no knowledge of the Docker service, but (sigh) a lot
    of knowledge of the Google Maps API.</div>

    <div>&bull; <b>UI State</b>: application state is handled with the <b>XStateJS</b> library which implements in JS the W3C's <i>State Chart XML (SCXML): State Machine Notation for Control 
        Abstraction</i> standard. Note that it is the sole client-side production dependency.</div>

    <h2>Issues and Observations</h2>
    <div>There are several issues that remain unaddressed:</div>

    <div>&bull; As mentioned above, the application and API are unsecured.</div>
    <div>&bull; Little effort was put toward performance, latency, and responsiveness under load.</div>
    <div>&bull; Testing was very limited, no unit tests were written, and only a cursory usability check  was done with "latest" Chrome and Firefox on MacOS.</div>
    <div>&bull; CSS <span class="code">flex-box</span> was used a lot so browsers that don't support it will be problematic.</div>
    <div>&bull; The UI hints at responsiveness but will break on viewports smaller than about 1376px width.</div>
    <div>&bull; There is no client side routing.</div>
    <div>&bull; Some UI state conditions involving the drawer (side panel) are not handled very well.</div>
    <div>&bull; Data input elements are not validated client side, and the UI doesn't handle the API-side validation very well.</div>
    <div>&bull; There is a complicated bug in regard to map search, markers and zooming. This is as much a "policy" or "behavior" bug than code. We punted.</div>
    <div>&bull; There is fairly <span class="bad">bad bug</span> in the consolidating API wherein it will sometimes fail to return a useful response to the UI. The error is in the API's handling of certain 
        conditions of response from the 3rd-party service, and there wasn't time to fully track it down. It seems most noticeable in lack of images on first-time queries. 
        <u>The workaround is to try the query again.</u> 
   
</section>