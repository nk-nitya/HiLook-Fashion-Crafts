const brandStage = document.getElementById("brandStage");
const hangingItems = document.getElementById("hangingItems");

brandStage.addEventListener("mouseenter", () => {
    hangingItems.classList.add("show");
});

brandStage.addEventListener("mouseleave", () => {
    hangingItems.classList.remove("show");
});

