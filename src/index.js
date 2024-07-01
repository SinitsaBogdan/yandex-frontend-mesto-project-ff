import * as Card from './scripts/card';
import * as Modal from './scripts/modal';
import { enableValidation, clearValidation } from './scripts/validation';
import * as api from './scripts/api';
import './styles/index.css';

const profileConfig = {};

const modals = document.querySelectorAll('.popup');
const cardListSelector = document.querySelector('.places__list');
const avatarSelector = document.querySelector('.profile__image');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const btnEditAvatar = document.querySelector('.profile__avatar');
const btnProfileEdit = document.querySelector('.profile__button-edit');
const btnCardAdd = document.querySelector('.profile__button-add');
const btnDeleteCard = document.querySelector('.popup__confirmation');

const dialogEditAvatar = document.querySelector('.popup_type_edit-avatar');
const dialogEditProfile = document.querySelector('.popup_type_edit-profile');
const dialogAddCard = document.querySelector('.popup_type_new-card');
const dialogDeleteCard = document.querySelector('.popup_type_delete_card');

const dialogCardView = document.querySelector('.popup_type_image');
const dialogCardViewImage = dialogCardView.querySelector('.popup__image');
const dialogCardViewCaption = dialogCardView.querySelector('.popup__caption');

const formEditAvatar = document.forms.edit_avatar;
const formEditProfile = document.forms.edit_profile;
const formAddCard = document.forms.new_place;

// FUNCTIONS --------------------------------------------------------------------------

// Примечание: Метод первичной обработки странице при первой загрузке
function loadPage() {
	const requests = [];
	const getProfilePromise = new Promise((resolve) => resolve(api.getProfile()));
	const getCardsPromise = new Promise((resolve) => resolve(api.getCards()));
	requests.push(getProfilePromise)
	requests.push(getCardsPromise)

	Promise.all(requests)
		.then(([responseProfile, responseCards]) => {
			loadProfilePage(responseProfile);
			loadCards(responseCards);
			profileTitle.textContent = profileConfig.title;
			profileDescription.textContent = profileConfig.about;
			profileAvatar.src = profileConfig.avatar;
		})
		.catch((err) => console.log(err))
}

// Примечание : Отрисовка Профиля пользователя
function loadProfilePage(profile) {
	profileConfig.id = profile._id;
	profileConfig.title = profile.name;
	profileConfig.about = profile.about;
	profileConfig.avatar = profile.avatar;
}

// Примечание : Отрисовка карточек на странице
function loadCards(data) {
	data.forEach((item) => {
		const card = Card.create(item, openDialogDeleteCard, likedCard, openDialogViewCard, dialogCardView, profileConfig.id);
		cardListSelector.append(card);
	});
}

// Примечание : Открытие PopUp
function openDialog(modal, form) {
	clearValidation(form);
	Modal.open(modal);
}

// Примечание : Открытие PopUp удаления карточки
function openDialogDeleteCard(card) {
	const submit = dialogDeleteCard.querySelector('.popup__button');
	Modal.open(dialogDeleteCard);
	btnDeleteCard.addEventListener('click', () => confirmationDeleteCard(card, dialogDeleteCard, submit))
}

// Примечание : Метод удаления карточки
function confirmationDeleteCard(card, dialog, submit) {
	submit.textContent = 'Сохранение...';
	new Promise(() => {
		api.deleteCard(card.id)
			.catch((err) => console.log(err))
			.finally(() => {
				Card.remove(card);
				Modal.close(dialog);
				submit.textContent = 'Сохранение';
			});
	});
}

// Примечание : Открытие PopUp просмотра карточки
function openDialogViewCard(evt, dialog) {
	const card = evt.target.closest('.card');
	const cardTitle = card.querySelector('.card__title').textContent;
	const cardScr = card.querySelector('.card__image').src;
	dialogCardViewImage.src = cardScr;
	dialogCardViewImage.alt = cardTitle;
	dialogCardViewCaption.textContent = cardTitle;
	Modal.open(dialog);
}

// Примечание : Метод сохранения профиля после редактирования
function saveDialogEditProfile(event, form, title, description) {
	const dialog = Modal.searchOpenDialog();
	const name = form.name.value;
	const about = form.description.value;
	const btn = dialog.querySelector('.popup__button');
	btn.textContent = 'Сохранение...';
	event.preventDefault();
	title.textContent = name;
	description.textContent = about;
	new Promise(() => {
		api.patchProfile(name, about)
			.catch((err) => console.log(err))
			.finally(() => {
				Modal.close(dialog);
				clearValidation(form);
				btn.textContent = 'Сохранение';
			});
	});
}

// Примечание : Метод сохранения карточки после редактирования
function saveDialogAddCard(event, form, cardListSelector) {
	const dialog = Modal.searchOpenDialog();
	const card = {
		name: form.name.value,
		link: form.link.value,
	};
	const btn = dialog.querySelector('.popup__button');
	btn.textContent = 'Сохранение...';
	event.preventDefault();
	api.postCard(card)
		.then((res) => {
			const card = Card.create(res, openDialogDeleteCard, likedCard, openDialogViewCard, dialogCardView, profileConfig.id);
			cardListSelector.insertBefore(card, cardListSelector.firstElementChild);
		})
		.catch((err) => console.log(err))
		.finally(() => {
			clearValidation(form);
			Modal.close(dialog);
			btn.textContent = 'Сохранение';
		});
}

// Примечание : Метод постановки лайка
function likedCard(card, count) {
	if (Card.isOwnerToLikedCard(card, profileConfig.id)) {
		new Promise(() => {
			api.deleteLikeCard(card._id)
				.then((res) => updateLikedCard(res, card, count))
				.catch((err) => console.log(err));
		});
	} else {
		new Promise(() => {
			api.putLikeCard(card._id)
				.then((res) => updateLikedCard(res, card, count))
				.catch((err) => console.log(err));
		});
	}
}

// Примечание : Метод переключения состояния счетчика лайков
function updateLikedCard(data, card, count) {
	card.likes = data.likes;
	count.textContent = card.likes.length;
}

// Примечание : Метод сохранения информации об новом аватаре пользователя
function updateProfileAvatar(event, form, selector) {
	const dialog = Modal.searchOpenDialog();
	const link = form.link.value;
	const btn = dialog.querySelector('.popup__button');
	btn.textContent = 'Сохранение...';
	event.preventDefault();
	new Promise(() => {
		api.patchProfileAvatar(link)
			.then(() => (selector.src = link))
			.catch((err) => console.log(err))
			.finally(() => {
				Modal.close(dialog);
				btn.textContent = 'Сохранение';
			});
	});
}

// EVENTS --------------------------------------------------------------------------

// Примечание: Установка события Mmousedown на формы
modals.forEach((form) => {
	form.addEventListener('mousedown', (event) => {
		if (event.target.classList.contains('popup_is-opened')) Modal.close(form);
		if (event.target.classList.contains('popup__close')) Modal.close(form);
	});
});

// Примечание: Событие открытия формы для изменения информации в профиле
btnProfileEdit.addEventListener('click', () => {
	const args = [dialogEditProfile, formEditProfile];
	openDialog(...args);
	formEditProfile.name.value = profileTitle.textContent;
	formEditProfile.description.value = profileDescription.textContent;
});

// Примечание: Событие открытия формы для добавления новой карточки
btnCardAdd.addEventListener('click', () => {
	const args = [dialogAddCard, formAddCard];
	openDialog(...args);
});

// Примечание: Событие открытия формы для изменения изображения аватарки
btnEditAvatar.addEventListener('click', () => {
	const args = [dialogEditAvatar, formEditAvatar];
	openDialog(...args);
});

// Примечание: Событие сохранения новой информации о профиле
formEditProfile.addEventListener('submit', (event) => {
	const args = [event, formEditProfile, profileTitle, profileDescription];
	saveDialogEditProfile(...args);
});

// Примечание: Событие сохранения новой карточки
formAddCard.addEventListener('submit', function (event) {
	const args = [event, formAddCard, cardListSelector, Card.create, Card.remove];
	saveDialogAddCard(...args);
});

// Примечание: Событие сохранения нового аватара в профиле
formEditAvatar.addEventListener('submit', function (event) {
	const args = [event, formEditAvatar, avatarSelector];
	updateProfileAvatar(...args);
});

// RUN PAGE --------------------------------------------------------------------------

loadPage();
enableValidation(document.forms);