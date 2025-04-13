<script>
  import { quintOut } from "svelte/easing";
  import { scale } from "svelte/transition";
  import { onMount } from "svelte";
  import { check } from "@tauri-apps/plugin-updater";
  import { relaunch } from "@tauri-apps/plugin-process";
  import { isApiOnline, isCheckingForUpdates, noriskLog, noriskError } from "../../utils/noriskUtils.js";
  import { addNotification } from "../../stores/notificationStore.js";
  import { delay } from "../../utils/svelteUtils.js";
  import { translations } from '../../utils/translationUtils.js';
  import { invoke } from "@tauri-apps/api/core";

  /** @type {{ [key: string]: any }} */
  $: lang = $translations;

  let dots = "";

  onMount(async () => {
    let interval = animateLoadingText();

    try {
      const update = await check({ onError: noriskError, onEvent: async ({ status, error }) => {
        noriskLog(`Updater event: ${error} ${status}`);
        if (status === "DOWNLOADED") {
          noriskLog(`Force Killing Process (Triggered By Update Event)`);
          await invoke("quit_everything").catch(noriskError);
        }
      }});

      if (update) {
        noriskLog(`Installing update: ${update.manifest?.version} ${update.manifest?.body}`);

        await update.downloadAndInstall().catch(addNotification);
        noriskLog(`Update was installed`);

        isCheckingForUpdates.set(false);

        noriskLog(`Trying to relaunch`);
        await relaunch().catch(addNotification);
      } else {
        await delay(1000); // Optional delay for UX
        isCheckingForUpdates.set(false);
      }
    } catch (error) {
      isCheckingForUpdates.set(false);
      if ($isApiOnline) {
        addNotification(error);
      }
    }

    return () => {
      clearInterval(interval);
    };
  });

  function animateLoadingText() {
    return setInterval(function() {
      dots += " .";
      if (dots.length > 6) {
        dots = "";
      }
    }, 500);
  }
</script>

{#if lang?.dummy}
  <h1 class="branch-font primary-text" style="position:absolute" transition:scale={{ x: 15, duration: 300, easing: quintOut }}>{lang.updater.searching}{dots}</h1>
{/if}

<style>
  .branch-font {
    font-size: 18px;
    margin: 0;
    cursor: default;
  }
</style>
