<script>
	import { activeAnnouncement, openNextAnnouncement } from '../../utils/popupUtils.js';
    import { translations } from '../../utils/translationUtils.js';
    
    /** @type {{ [key: string]: any }} */
    $: lang = $translations;

    function close() {
        openNextAnnouncement();
    }
</script>

<div class="container">
    <div class="announcement">
        <h1 class="title">{$activeAnnouncement?.title}</h1>
        <h2 class="author">By {$activeAnnouncement?.author} - {$activeAnnouncement?.date}</h2>
        <div class="content">
            <p class="text">{@html $activeAnnouncement?.content}</p>
        </div>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <p class="closeButton" on:click={close}>{lang.announcement.button.okay}</p>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
        height: 90%;
        overflow-y: hidden;
        }

    .announcement {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 80vw;
        overflow-y: scroll;
    }

    .title {
        font-size: 2em;
        display: flex;
    }

    .author {
        margin-top: 1em;
        font-size: 1em;
        display: flex;
    }

    .content {
        display: flex;
        margin-top: 2em;
        margin-bottom: 10px;
        height: 50vh;    
        justify-content: center;
        align-items: center;
        text-align: center;
        line-height: 1.5em;
    }

    .text {
        font-size: 0.9em;
    }

    .closeButton {
        display: flex;
        transition: transform 0.3s;
        font-size: 1.75em;
        color: var(--primary-color);
        text-shadow: 2px 2px var(--primary-color-text-shadow);
            cursor: pointer;
    }

    .closeButton:hover {
        transform: scale(1.15);
    }
</style>