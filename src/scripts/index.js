import { Callbacks } from 'jquery';
import '../pages/index.css';
import { initialCards } from "./components/cards";
import { createCard, deleteCard } from './components/card';
import { openModal, openModalImage, closeModal } from './components/modal';

// @todo: Темплейт карточки
const placesList = document.querySelector('.places__list');
const template = document.querySelector('#card-template');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const modalEdit = document.querySelector('.popup_type_edit');
const modalAdd = document.querySelector('.popup_type_new-card');
const modalImage = document.querySelector('.popup__image');
const modalImageCaption = document.querySelector('.popup__caption');
const closeButtons = document.querySelectorAll('.popup__close');

// // @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
    const cardElement = createCard(template, element, deleteCard, handleLikeCard, openModalImage);
    placesList.append(cardElement);
});

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
    nameInput.value = document.querySelector('.profile__title').textContent; 
    jobInput.value = document.querySelector('.profile__description').textContent;
    openModal(modalEdit);
});

function handleFormSubmit(evt) {
    evt.preventDefault();
    const newProfileName = nameInput.value;
    const newJobDescription = jobInput.value;
    document.querySelector('.profile__title').textContent = newProfileName;
    document.querySelector('.profile__description').textContent = newJobDescription;
    closeModal(modalEdit)
};

formElement.addEventListener('submit', handleFormSubmit); 

// Добавление карточки "Новое место"
const modalAddForm = modalAdd.querySelector('.popup__form');
const placeNameInput = modalAdd.querySelector('.popup__input_type_card-name');
const placeLinkInput = modalAdd.querySelector('.popup__input_type_url');

addButton.addEventListener('click', () => openModal(modalAdd));

function handleAddCardSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: placeNameInput.value,
        link: placeLinkInput.value,
    };
    
    const cardElement = createCard(template, newCard, deleteCard, handleLikeCard, openModalImage);
    placesList.prepend(cardElement);

    placeNameInput.value = '';
    placeLinkInput.value = '';

    closeModal(modalAdd);
}

modalAddForm.addEventListener('submit', handleAddCardSubmit);

// Функция лайка карточки
function handleLikeCard(evt, cardElement) {
    const likeButton = evt.target.closest('.card__like-button'); 
    likeButton.classList.toggle('card__like-button_is-active');
}