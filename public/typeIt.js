/* --------- FEATURE TYPEIT --------------- */
/*  https://typeitjs.com/  */
import TypeIt from "typeit";

/*

Register now to <span>ConnectMars,</span>
<br />
<br />
the only social network that focuses in connecting people
from Earth and Mars!
<br />
<br />
<span>
    Start talking with your martian friends and family!
</span>  */

new TypeIt("#welcome", {
    speed: 50,
    startDelay: 100
})
    .type(
        `Welcome to SPICEY! A virtual assistant that talks to your
child... For children who have difficulties communicating,
SPICEY can be an an effective helper to interact in a safe
environment and to train their thinking. Start your journey
now!`
    )
    .pause(300)
    .delete(2)
    .pause(250)
    .type("et")
    .pause(750)
    .options({ speed: 100, deleteSpeed: 75 })
    .delete(8)
    .pause(750)
    .type("<em>planet.</em>")
    .go();
