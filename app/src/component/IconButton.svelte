<script>
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    export let iconstate = 'inactive';
    export let icon = 'clear'
    export let event = 'noop'

    const emit = () => {
        dispatch(event, { eventName: event })
    }
</script>

<style>
    button {
        -moz-user-select: none;
        -ms-flex-align: center;
        -ms-user-select: none;
        -webkit-align-items: center;
        -webkit-user-select: none;
        align-items: center;
        background: transparent;
        border-radius: 3px;
        border: 0;
        box-sizing: border-box;
        cursor: pointer;
        display: inline-block;
        font-family: inherit;
        font-size: 1.4rem;
        font-style: inherit;
        font-variant: inherit;
        font-weight: 500;
        line-height: 3.6rem;
        margin: 0.6rem 0.8rem;
        min-height: 3.6rem;
        min-width: 8.8rem;
        outline: none;
        overflow: hidden;
        padding: 0 0.6rem;
        position: relative;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        white-space: nowrap;
    }

    button.active {
        color: white;
    }

    button:focus {
        outline: none;
    }

    button.active:hover {
        background-color: #525252;
        text-decoration: none;
    }

    button.active:active,
    button.active.with-icon:active {
        color: aquamarine;
    }

    button.inactive,
    button.inactive:active {
        background-color: transparent;
        color: #666;
        pointer-events: none;
    }

    button.inactive:hover {
        cursor: default;
    }

    button.with-icon {
        border-radius: 50%;
        height: 4.8rem;
        line-height: 1.2rem;
        margin: 0;
        min-width: 4.8rem;
        padding: 0;
        width: 4.8rem;
    }
</style>

<button class="with-icon {iconstate}" on:click="{emit}">
    <i class="material-icons">{icon}</i>
</button>