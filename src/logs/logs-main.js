import "./big-scrollbar.css";
import "../global.css";
import Logs from "./Logs.svelte";

const logs = new Logs({
    target: document.getElementById("logs"),
    props: { }
});

export default logs;
