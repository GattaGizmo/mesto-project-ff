import '../pages/index.css';
import { createCard, likeCard } from './components/card.js';
import { openModal, closeModal, openDeletePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getCards, editUserInfo, addNewCard, deleteCardById, addLikeById, removeLikeById, editAvatar } from './components/api.js'

// @todo: Темплейт карточки
const placesList = document.querySelector('.places__list');
const template = document.querySelector('#card-template');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const modalEdit = document.querySelector('.popup_type_edit');
const modalAdd = document.querySelector('.popup_type_new-card');
const modalImage = document.querySelector('.popup__image');
const modalImagePopup = document.querySelector('.popup_type_image');
const modalImageCaption = document.querySelector('.popup__caption');
const closeButtons = document.querySelectorAll('.popup__close');
const addForm = document.forms['new-place'];
const editForm = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector(".profile__image");

const formElementAvatar = document.forms['new-avatar'];
const avatarInput = document.querySelector('.popup__input-avatar');
const popupAvatarOpen = document.querySelector('.profile__edit-avatar');
const popupAvatar = document.querySelector('.popup_new-avatar');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

function openModalImage(item) {
    modalImage.src = item.link;
    modalImage.alt = item.name;
    modalImageCaption.textContent = item.name;
    openModal(modalImagePopup);
};

const promises = [getUserInfo(), getCards()];

Promise.all(promises)
    .then(([userData, cards]) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style = `background-image: url('${userData.avatar}')`;

        const myID = userData._id;
        console.log('Карточки:', cards);

        cards.forEach((card) => {
            const cardElement = createCard(template, card, handleLike, openModalImage, myID, handleDelete);
            placesList.append(cardElement);
        });
    })
    .catch((err) => console.log(err));

// Обработчики событий для модальных окон
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.popup');
        closeModal(modal);
    });
});

// Редактирование полей "Имя" и "О себе":
const formElement = modalEdit.querySelector('.popup__form');
const nameInput = modalEdit.querySelector('.popup__input_type_name');
const jobInput = modalEdit.querySelector('.popup__input_type_description');

editButton.addEventListener('click', () => {
    const formElement = modalEdit.querySelector('.popup__form'); // Получаем форму
    clearValidation(editForm, validationConfig);
    openModal(modalEdit, formElement, validationConfig); // Передаем форму
});

function handleFormSubmit(evt) {
    evt.preventDefault();

    editUserInfo(nameInput.value, jobInput.value)
        .then((cardInfo) => {
            const newProfileName = nameInput.value;
            const newJobDescription = jobInput.value;
            document.querySelector('.profile__title').textContent = newProfileName;
            document.querySelector('.profile__description').textContent = newJobDescription;
        })
    closeModal(modalEdit)
};

formElement.addEventListener('submit', handleFormSubmit); 

// Добавление карточки "Новое место"
const modalAddForm = modalAdd.querySelector('.popup__form');
const placeNameInput = modalAdd.querySelector('.popup__input_type_card-name');
const placeLinkInput = modalAdd.querySelector('.popup__input_type_url');

addButton.addEventListener('click', () => {
    const formElement = modalAdd.querySelector('.popup__form');
    clearValidation(addForm, validationConfig);
    openModal(modalAdd, formElement, validationConfig);
});

function handleAddCardSubmit(evt) {
    evt.preventDefault();

    const name = placeNameInput.value;
    const link = placeLinkInput.value; 

    addNewCard(name, link)
        .then(newCardData => {
            const newCard = {
                name: newCardData.name,
                link: newCardData.link,
                owner: newCardData.owner,
                _id: newCardData._id,
                likes: newCardData.likes
            };

            const myID = newCard.owner._id;
            const cardElement = createCard(template, newCard, handleLike, openModalImage, myID);
            placesList.prepend(cardElement);

            placeNameInput.value = '';
            placeLinkInput.value = '';

            closeModal(modalAdd);
        })
        .catch((err) => console.log(err)); // Обработка ошибок
}

modalAddForm.addEventListener('submit', handleAddCardSubmit);

function handleLike(evt, cardElement, cardInfo, likeCount, myID) {
    const likeButton = cardElement.querySelector('.card__like-button');
    const likesQuantity = cardElement.querySelector('.card__likes-count');
    
    likeCard(cardInfo, likeButton, likeCount);
}

function handleDelete(cardId, cardElement) {
    openDeletePopup(cardId);
}

export function confirmDelete(cardId) {
    deleteCardById(cardId)
        .then(() => {
            const cardElement = document.querySelector(`[data-id="${cardId}"]`);
            if (cardElement) {
                cardElement.remove();
            }
            closeDeletePopup();
        });
}

const handleAvatarSubmit = (evt) => {
    evt.preventDefault();

    renderLoading(true, formElementAvatar);

    editAvatar(avatarInput.value)
        .then((data) => {
            profileImage.style.backgroundImage = `url(${data.avatar})`;
        })
        .catch((err) => console.log(err))
        .finally(() => renderLoading(false, formElementAvatar));

    closeModal(popupAvatar);

    formElementAvatar.reset();
}

popupAvatarOpen.addEventListener('click', () => openModal(popupAvatar));
formElementAvatar.addEventListener('submit', handleAvatarSubmit);

popupAvatarOpen.addEventListener('click', () => {
    formElementAvatar.reset();
    clearValidation(formElementAvatar, validationConfig);
    openModal(popupAvatar);
});

formElementAvatar.addEventListener('submit', handleAvatarSubmit);

function renderLoading(isLoading, form) {
    const button = form.querySelector(".popup__button");
    button.textContent = isLoading ? "Cохранение..." : "Сохранить";
}

enableValidation(validationConfig);

