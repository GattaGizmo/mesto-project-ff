import { addLikeById, deleteCardById, removeLikeById } from './api';

export function likeCard(cardInfo, likeButton, likeCount) {
    const likeMethod = likeButton.classList.contains("card__like-button_is-active")
        ? removeLikeById
        : addLikeById;
    
    likeMethod(cardInfo._id)
        .then((updatedCard) => {
            likeCount.textContent = updatedCard.likes.length;
            likeButton.classList.toggle("card__like-button_is-active");
        });
}

export function createCard(template, cardInfo, handleLike, handleImageClick, profileID, handleDelete) {
    const cardElement = template.content.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector(".card__like-button");
    const likeCount = cardElement.querySelector('.card__likes-count'); 

    cardImage.setAttribute('src', cardInfo.link);
    cardImage.setAttribute('alt', cardInfo.name);
    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    cardElement.setAttribute('data-id', cardInfo._id);

    likeCount.textContent = cardInfo.likes.length;

    if (cardInfo.owner._id === profileID) {
        deleteButton.classList.remove('card__delete-button-hidden');
        deleteButton.addEventListener("click", () => {
            if (handleDelete) {
                handleDelete(cardInfo._id, cardElement);
            }
            });
    } else {
        deleteButton.classList.add('card__delete-button-hidden');
    }

    cardImage.addEventListener('click', () => handleImageClick(cardInfo));

    likeButton.addEventListener('click', (evt) => {
        handleLike(evt, cardElement, cardInfo, likeCount, profileID);
    });

    if (cardInfo.likes.some((like) => like._id === profileID)) {
        likeButton.classList.add("card__like-button_is-active");
    }

    return cardElement;
}

const handleLike = (likeButton, cardInfo, likeCount) => {
    const likeMethod = likeButton.classList.contains('card__like-button-is-active') ? removeLikeById : addLikeById;
    likeMethod(cardInfo._id)
        .then((res) => {
            likeCount.textContent = res.likes.length;
            likeButton.classList.toggle('card__like-button-is-active')
        })
}

export function handleDelete(cardId, cardElement) {
    deleteCardById(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch(err => console.log(err));
}