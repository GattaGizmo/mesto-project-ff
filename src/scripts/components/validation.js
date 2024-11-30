const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const {inputErrorClass, errorClass} = validationConfig;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

const hideInputError = (formElement, inputElement, validationConfig) => {
    const {inputErrorClass, errorClass} = validationConfig;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    if (errorElement) {
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = '';
    }
}

const isValid = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

export function toggleButtonState(inputList, buttonElement, validationConfig) {
    const {inactiveButtonClass} = validationConfig;

    inputList = Array.from(inputList);

    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true; 
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }
}

const setEventListeners = (formElement, validationConfig) => {
    const {inputSelector, submitButtonSelector} = validationConfig;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationConfig);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationConfig);

            toggleButtonState(formElement, buttonElement, validationConfig);
        });
    });
}

export const enableValidation = (validationConfig) => {
    const {formSelector} = validationConfig;
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, validationConfig);
    })
}

export const clearValidation = (formElement, validationConfig) => {
    const {inputSelector, inactiveButtonClass, submitButtonSelector} = validationConfig;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    inputList.forEach(input => {
        hideInputError(formElement, input, validationConfig)
    })

    buttonElement.classList.add(inactiveButtonClass);
}

export function resetFormValidation(form, validationConfig) {
    const { inputSelector, inputErrorClass, errorClass, submitButtonSelector, disabledButtonClass } = validationConfig;

    const inputList = Array.from(form.querySelectorAll(inputSelector));
    inputList.forEach((inputElement) => {
        const errorElement = form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = '';
    });

    const submitButton = form.querySelector(submitButtonSelector);
    submitButton.disabled = true;
    submitButton.classList.add(disabledButtonClass);
}