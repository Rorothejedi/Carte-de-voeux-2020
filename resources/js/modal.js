const modal = document.querySelector(".popup");
const closeButton = document.querySelector(".close-button-popup");
const closeSentence = document.querySelector(".close-sentence-popup");
const popupTitle = $( "#popupTitle" );
const popupContent = $( "#popupContent" );

const toggleModal = () => {
    if (actualScreen === 2 || actualScreen === 3 || actualScreen === 4 || actualScreen === 6)
        modal.classList.toggle("show-popup");
    if (actualScreen === 2) {
        popupTitle.text("Heu, là en fait il faut caresser le chat");
        popupContent.text("«Ah pardon j’avais pas compris»");
    } else if (actualScreen === 3) {
        popupTitle.text("Heu, là en fait il faut - encore - caresser le chat");
        popupContent.text("«Ah oui ok»");
    } else if (actualScreen === 4) {
        popupTitle.text("Du coup là en fait il faut caresser le chat mais dans l ’autre sens");
        popupContent.text("«J’y vais mais j’ai peur»");
    } else if (actualScreen === 6) {
        popupTitle.text("Là c’est cadeau vous pouvez jouer avec le chat...");
        popupContent.text("«Trop cool»");
    }
}

const windowOnClick = (event) => {
    if (event.target === modal)
        toggleModal();
}

closeSentence.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);