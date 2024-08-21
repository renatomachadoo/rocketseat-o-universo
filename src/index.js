import { Router } from "./router.js";

const router = new Router()

router.add("/", "/pages/home.html", "/assets/home-bg.png")
router.add("/about", "/pages/about.html", "/assets/about-bg.png")
router.add("/explore", "/pages/explore.html", "/assets/explore-bg.png")

router.handle()

window.onpopstate = () => router.handle() // WHEN CLICK ON ROWS TO PREV OR NEXT HISTORY LINK
window.route = () => router.route() // WHEN THE PAGE CHANGES THE ROUTE