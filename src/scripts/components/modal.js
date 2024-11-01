export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    modal.style.visibility = 'visible';
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
    });

    document.addEventListener('keydown', closeModalByEsc);
    modal.addEventListener('click', closeModalByOverlay);
}

export function openModalImage(item) {
    const modalImage = document.querySelector('.popup__image');
    const modalImageCaption = document.querySelector('.popup__caption');
    modalImage.src = item.link;
    modalImage.alt = item.name;
    modalImageCaption.textContent = item.name;
    openModal(document.querySelector('.popup_type_image'));
}

export function closeModal(modal) {
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
