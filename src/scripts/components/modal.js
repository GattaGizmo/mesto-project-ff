import { toggleButtonState, resetFormValidation } from './validation.js';
import { deleteCardById } from './api.js';

export function openModal(modal, form, config, userData) {
    if (form) {
        // Сбрасываем ошибки и обновляем кнопку
        resetFormValidation(form, config);

        // Устанавливаем начальное состояние кнопки
        const submitButton = form.querySelector(config.submitButtonSelector);
        toggleButtonState(Array.from(form.querySelectorAll(config.inputSelector)), submitButton, config);
    }

    modal.classList.add('popup_is-opened');
    modal.style.visibility = 'visible';
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
    });

    document.addEventListener('keydown', closeModalByEsc);
    modal.addEventListener('mousedown', closeModalByOverlay);
}

export function closeModal(modal) {
    const form = modal.querySelector('form');
    if (form) {
        form.reset(); // Сбрасываем поля формы
    }

    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.visibility = 'hidden';
        modal.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', closeModalByEsc);
        modal.removeEventListener('click', closeModalByOverlay);
    }, 300);
}

function closeModalByEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_is-opened');
        if (popupOpened) {
            closeModal(popupOpened);
        }
    }
}

function closeModalByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget);
    }
}

let cardIdToDelete = null;

// Функция для открытия попапа удаления
export function openDeletePopup(cardId) {
    const popup = document.querySelector('.popup_type_delete');
    const confirmButton = popup.querySelector('.popup__button.popup__button_submite-delete');

    cardIdToDelete = cardId;
    popup.classList.add('popup_is-opened');

    if (confirmButton) {
        confirmButton.addEventListener('click', (event) => {
            event.preventDefault();
            confirmDelete(cardIdToDelete);
        });
    }
}

export function closeDeletePopup() {
    const popupDelete = document.querySelector('.popup_type_delete');
    popupDelete.classList.remove('popup_is-opened');
}

// Функция для подтверждения удаления
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