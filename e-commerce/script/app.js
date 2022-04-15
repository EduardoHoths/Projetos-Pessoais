const footerLinks = document.querySelectorAll(".footer-links");
const footerTitle = document
    .querySelectorAll(".footer-title h2")
    .forEach((title) => {
        title.addEventListener("click", handleClick);
    });

function handleClick({ target }) {
    if (
        target.parentNode.nextElementSibling.style.display == "none" ||
        target.parentNode.nextElementSibling.style.display == ""
    ) {
        target.parentNode.nextElementSibling.style.display = "flex";
        target.nextElementSibling.style.transform = "rotate(180deg)";
    } else {
        target.parentNode.nextElementSibling.style.display = "none";
        target.nextElementSibling.style.transform = "initial";
    }
}
