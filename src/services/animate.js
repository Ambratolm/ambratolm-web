export default function animate(element, animationName, callback) {
  element.classList.add("animated", animationName);
  function handleAnimationEnd() {
    element.classList.remove("animated", animationName);
    element.removeEventListener("animationend", handleAnimationEnd);
    if (typeof callback === "function") {
      callback();
    }
  }
  element.addEventListener("animationend", handleAnimationEnd);
}