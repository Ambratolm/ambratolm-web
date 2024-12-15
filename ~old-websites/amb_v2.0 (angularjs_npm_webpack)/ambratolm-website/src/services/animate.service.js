//==============================================================================
// ■ Animate Service
//------------------------------------------------------------------------------
//         This service brings JS features to animateCSS library.
//==============================================================================

//------------------------------------------------------------------------------
// ● Imports
//------------------------------------------------------------------------------
import angular from "angular";
//------------------------------------------------------------------------------
// ● Service
//------------------------------------------------------------------------------
class Animate {
    constructor() {
        //...
    }
    animate(element, animationName, callback) {
        element.classList.add("animated", animationName);
        function handleAnimationEnd() {
            element.classList.remove("animated", animationName);
            element.removeEventListener("animationend", handleAnimationEnd);
            if (typeof callback === "function") callback();
        }
        element.addEventListener("animationend", handleAnimationEnd);
    }
}
//------------------------------------------------------------------------------
// ● Module
//------------------------------------------------------------------------------
export default angular
    .module("animate.service", [])
    .service("Animate", Animate).name;