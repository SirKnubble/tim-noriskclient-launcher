import "../app.css";
import Splash from "./Splash.svelte";

const splash = new Splash({
    target: document.getElementById("splash"),
    props: {}
});

export default splash;
