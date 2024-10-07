// @todo: Темплейт карточки
const placesList = document.querySelector('.places__list');
const template = document.querySelector('#card-template');

// @todo: Функция создания карточки
function createCard(template, element, deleteCard) {
    const cardElement = template.content.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.setAttribute('src', element.link);
    cardImage.setAttribute('alt', element.name);
    cardElement.querySelector('.card__title').textContent = element.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    return cardElement;
}
// // @todo: Функция удаления карточки
function deleteCard(event) {
    event.target.closest('.places__item').remove();
}

// // @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
    const cardElement = createCard(template, element, deleteCard);
    placesList.append(cardElement);
});