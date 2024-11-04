export function createCard(template, cardInfo, deleteCard, handleLike, handleImageClick) {
    const cardElement = template.content.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.setAttribute('src', cardInfo.link);
    cardImage.setAttribute('alt', cardInfo.name);
    cardElement.querySelector('.card__title').textContent = cardInfo.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener("click", (evt) => deleteCard(evt, cardElement));

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', handleLike);

    cardImage.addEventListener('click', () => handleImageClick(cardInfo));

    return cardElement;
}

export function deleteCard(event) {
    event.target.closest('.places__item').remove();
}