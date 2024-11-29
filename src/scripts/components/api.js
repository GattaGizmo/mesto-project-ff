const apiConfig = {
    baseURL: 'https://nomoreparties.co/v1/wff-cohort-27/',
    headers: {
        authorization: '2bf7cdf9-b828-4c09-a587-e997a41bd409',
        'Content-Type': 'application/json'
    }
}

export const getUserInfo = () => {
    return fetch(`${apiConfig.baseURL}users/me`, {
    method: "GET",
    headers: apiConfig.headers
}).then(resp => resp.json())
}

export const editUserInfo = (name, about) => {
    return fetch(`${apiConfig.baseURL}users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
        name: name,
        about: about
    })
}).then(resp => resp.json())
}

export const getCards = () => {
    return fetch(`${apiConfig.baseURL}cards`, {
    method: "GET",
    headers: apiConfig.headers
}).then(resp => resp.json())
}


export const addNewCard = (name, link) => {
    return fetch(`${apiConfig.baseURL}cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
        name: name,
        link: link
    })
}).then(resp => resp.json())
}

export const deleteCardById = (cardId) => {
    return fetch(`${apiConfig.baseURL}cards/${cardId}`, {
        method: "DELETE",
        headers: apiConfig.headers
    }).then(resp => resp.json());
}

export const addLikeById = (cardId) => {
    return fetch(`${apiConfig.baseURL}cards/likes/${cardId}`, {
        method: "PUT", // Отправляем PUT-запрос, чтобы добавить лайк
        headers: apiConfig.headers
    }).then(resp => resp.json());
}

export function removeLikeById(cardId) {
    return fetch(`${apiConfig.baseURL}cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: apiConfig.headers,
    }).then(resp => resp.json());
}

export const editAvatar = (link) => {
    return fetch(`${apiConfig.baseURL}users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
        avatar: link
    })
}).then(resp => resp.json())
}