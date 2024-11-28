import { addLikeById, deleteCardById, removeLikeById } from './api';



export function likeCard(cardInfo, likeButton, likeCount) {
    const likeMethod = likeButton.classList.contains(
        "card__like-button_is-active"
    )
        ? removeLikeById
        : addLikeById;
        
    likeMethod(cardInfo._id)
    .then((res) => {
        likeCount.textContent = res.likes.length;
        likeButton.classList.toggle("card__like-button_is-active");
        })
        .catch((err) => {
        console.log(err);
        });
}

export function createCard(template, cardInfo, handleLike, handleImageClick, myID, handleDelete) {
    const cardElement = template.content.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector(".card__like-button");
    const likeCount = cardElement.querySelector('.card__likes-count');  // Исправлено на card__likes-count

    cardImage.setAttribute('src', cardInfo.link);
    cardImage.setAttribute('alt', cardInfo.name);
    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    cardElement.setAttribute('data-id', cardInfo._id);

    likeCount.textContent = cardInfo.likes.length;

    // Проверяем, кто является владельцем карточки
    if (cardInfo.owner._id === myID) {  // Если это ваша карточка, показываем кнопку удаления
        deleteButton.addEventListener("click", () => handleDelete(cardInfo._id, cardElement));
    } else {
        deleteButton.classList.add('card__delete-button-hidden');  // Если не ваша, скрываем кнопку удаления
    }

    cardImage.addEventListener('click', () => handleImageClick(cardInfo));  // Открытие изображения в модальном окне

    likeButton.addEventListener('click', (evt) => {
        handleLike(evt, cardElement, cardInfo, likeCount, myID);  // Добавляем evt
    });

    if (cardInfo.likes.some((like) => like._id === myID)) {
        likeButton.classList.add("card__like-button_is-active");  // Если вы уже поставили лайк
    }

    return cardElement;
}

const addLike = (likeButton, cardInfo, likeCount) => {
    const likeMethod = likeButton.classList.contains('card__like-button-is-active') ? removeLikeById : addLikeById;
    likeMethod(cardInfo._id)
        .then((res) => {
            likeCount.textContent = res.likes.length;
            likeButton.classList.toggle('card__like-button-is-active')
        })
}