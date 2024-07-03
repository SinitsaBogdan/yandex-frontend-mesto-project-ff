const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
	headers: {
		authorization: '4f72bdac-4a32-447e-a47f-4588193b59b1',
		'Content-Type': 'application/json',
	},
};

// Примечание : Запрос профиля пользователя
export const getProfile = () => {
	return fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers,
	}).then((res) => checkResonse(res, `Ошибка: ${res.status} во время запроса информации о профиле.`));
};

// Примечание : Запрос списка карточек
export const getCards = () => {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
	}).then((res) => checkResonse(res, `Ошибка: ${res.status} во время запроса списка карточек.`));
};

// Примечание : Запрос на обновление аватара пользователя
export const patchProfileAvatar = (link) => {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar: link,
		}),
	}).then((res) => checkResonse(res, `Ошибка: ${res.status} во время обновления аватарки профлия.`));
};

// Примечание : Запрос на обновление данных профлия пользователя
export const patchProfile = (name, about) => {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			about: about,
		}),
	}).then((res) => checkResonse(res, `Ошибка: ${res.status} во время обновления профиля.`));
};

// Примечание : Запрос на добавление новой карточки
export const postCard = (card) => {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify(card),
	}).then((res) => checkResonse(res, `Ошибка: ${res.status} во время сохранения карточки.`));
};

// Примечание : Запрос на добавление лайка карточке
export const putLikeCard = (cardId) => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'PUT',
		headers: config.headers,
	}).then((res) => checkResonse(res, `Ошибка: ${res.status} во время установки лайка.`));
};

// Примечание : Запрос на удаление карточки
export const deleteCard = (cardId) => {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	}).then((res) => checkResonse(res, `Ошибка: ${res.status} во время удаления карточки.`));
};

// Примечание : Запрос на удаление лайка у карточки
export const deleteLikeCard = (cardId) => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	}).then((res) => checkResonse(res, `Ошибка: ${res.status} во время удаления лайка.`));
};

function checkResonse(response) {
	if (response.ok) return response.json();
	return Promise.reject(`Ошибка: ${response.status} во время запроса информации о профиле.`);
}
