import { toggleButtonState, resetFormValidation } from './validation.js';

export function openModal(modal, form, config, userData) {
    if (form) {
        resetFormValidation(form, config);

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
        form.reset();
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