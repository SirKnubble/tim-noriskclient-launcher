<script>
	import { version } from './../../../utils/noriskUtils.js';
	import { push } from 'svelte-spa-router';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="copyright" on:click={() => push("/legal")}>
  © 2000-{new Date().getFullYear()} HGLabor/Friends Inc. v{$version}
</div>

<style>
    .copyright {
        font-size: 10px;
        margin-top: 0.3em;
        text-shadow: 1px 1px var(--hover-color-text-shadow);
        color: var(--hover-color);
        cursor: pointer;
    }
</style>
