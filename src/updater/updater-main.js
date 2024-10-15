import "../app.css";
import Updater from "./Updater.svelte";

const updater = new Updater({
    target: document.getElementById("updater"),
    props: {}
});

export default updater;
