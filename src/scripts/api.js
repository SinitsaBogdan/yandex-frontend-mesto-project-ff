const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
	headers: {
		authorization: '4f72bdac-4a32-447e-a47f-4588193b59b1',
		'Content-Type': 'application/json',
	},
};

// Примечание : Запрос профиля пользователя
export const getProfile = async () => {
	const res = await fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers,
	});
	if (res.ok) return res.json();
	return await Promise.reject(`Ошибка: ${res.status} во время запроса информации о профиле.`);
};

// Примечание : Запрос списка карточек
export const getCards = async () => {
	const res = await fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
	});
	if (res.ok) return res.json();
	return await Promise.reject(`Ошибка: ${res.status} во время запроса списка карточек.`);
};

// Примечание : Запрос на обновление аватара пользователя
export const patchProfileAvatar = async (link) => {
	const res = await fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar: link,
		}),
	});
	if (res.ok) return res.json();
	return await Promise.reject(`Ошибка: ${res.status} во время обновления аватарки профлия.`);
};

// Примечание : Запрос на обновление данных профлия пользователя
export const patchProfile = async (name, about) => {
	const res = await fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			about: about,
		}),
	});
	if (res.ok) return res.json();
	return await Promise.reject(`Ошибка: ${res.status} во время обновления профиля.`);
};

// Примечание : Запрос на добавление новой карточки
export const postCard = async (card) => {
	const res = await fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify(card),
	});
	if (res.ok) return res.json();
	return await Promise.reject(`Ошибка: ${res.status} во время сохранения карточки.`);
};

// Примечание : Запрос на добавление лайка карточке
export const putLikeCard = async (cardId) => {
	const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'PUT',
		headers: config.headers,
	});
	if (res.ok) return res.json();
	return await Promise.reject(`Ошибка: ${res.status} во время установки лайка.`);
};

// Примечание : Запрос на удаление карточки
export const deleteCard = async (cardId) => {
	const res = await fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	});
	if (res.ok) return res.json();
	return await Promise.reject(`Ошибка: ${res.status} во время удаления карточки.`);
};

// Примечание : Запрос на удаление лайка у карточки
export const deleteLikeCard = async (cardId) => {
	const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	});
	if (res.ok) return res.json();
	return await Promise.reject(`Ошибка: ${res.status} во время удаления лайка.`);
};
