import * as Card from '../../../scripts/card';
import * as Modal from '../../../scripts/modal';
import { enableValidation, clearValidation } from '../../../scripts/validation';
import * as api from '../../../scripts/api';
import './Home.css';

const profileConfig = {};

const validationConfig = {
	formSelector: '.PopUp__form',
	inputSelector: '.PopUp__input',
	errorSelector: '.PopUp__form--error',
	submitButtonSelector: '.PopUp__button',
	errorClass: 'PopUp__form--error',
	inputErrorClass: 'PopUp__input--error',
	inactiveButtonClass: 'PopUp__button--disabled',
};

const modals = document.querySelectorAll('.PopUp');
const cardListSelector = document.querySelector('.Places__list');
const profileAvatar = document.querySelector('.Profile__image');

const profileTitle = document.querySelector('.Profile__title');
const profileDescription = document.querySelector('.Profile__description');

const btnEditAvatar = document.querySelector('.Profile__avatar');
const btnProfileEdit = document.querySelector('.Profile__button--edit_profile');
const btnCardAdd = document.querySelector('.Profile__button--create_place');
const btnDeleteCard = document.querySelector('.PopUp__confirmation');

const dialogEditAvatar = document.querySelector('.PopUpAvatarEdit');
const dialogEditProfile = document.querySelector('.PopUpProfileEdit');
const dialogAddCard = document.querySelector('.PopUpCardCreate');
const dialogDeleteCard = document.querySelector('.PopUpCardDelete');

const dialogCardView = document.querySelector('.PopUpImageView');
const dialogCardViewImage = dialogCardView.querySelector('.PopUp__image');
const dialogCardViewCaption = dialogCardView.querySelector('.PopUp__caption');

const formEditAvatar = document.forms.avatar_edit;
const formEditProfile = document.forms.profile_edit;
const formAddCard = document.forms.place_create;

// FUNCTIONS --------------------------------------------------------------------------

// Примечание: Метод первичной обработки странице при первой загрузке
function loadPage() {
	Promise.all([api.getProfile(), api.getCards()])
		.then(([responseProfile, responseCards]) => {
			loadProfilePage(responseProfile);
			loadCards(responseCards);
			profileTitle.textContent = profileConfig.title;
			profileDescription.textContent = profileConfig.about;
			profileAvatar.src = profileConfig.avatar;
		})
		.catch((err) => console.log(err));
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
		const li = document.createElement('li');
		li.classList.add('Places__item');
		const card = Card.create(item, openDialogDeleteCard, likedCard, openDialogViewCard, dialogCardView, profileConfig.id);
		li.append(card);
		cardListSelector.append(li);
	});
}

// Примечание : Открытие PopUp
function openDialog(modal, form) {
	clearValidation(form, validationConfig);
	Modal.open(modal);
}

// Примечание : Открытие PopUp удаления карточки
function openDialogDeleteCard(card) {
	const submit = dialogDeleteCard.querySelector('.PopUp__button');
	Modal.open(dialogDeleteCard);
	btnDeleteCard.addEventListener('click', () => confirmationDeleteCard(card, dialogDeleteCard, submit));
}

// Примечание : Метод удаления карточки
function confirmationDeleteCard(card, dialog, submit) {
	submit.textContent = 'Сохранение...';
	api.deleteCard(card.id)
		.then(() => {
			Card.remove(card);
			Modal.close(dialog);
			submit.textContent = 'Сохранение';
		})
		.catch((err) => console.log(err));
}

// Примечание : Открытие PopUp просмотра карточки
function openDialogViewCard(evt, dialog) {
	const card = evt.target.closest('.Card');
	const cardTitle = card.querySelector('.Card__title').textContent;
	const cardScr = card.querySelector('.Card__image').src;
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
	const btn = dialog.querySelector('.PopUp__button');
	btn.textContent = 'Сохранение...';
	event.preventDefault();
	title.textContent = name;
	description.textContent = about;
	api.patchProfile(name, about)
		.then(() => Modal.close(dialog))
		.catch((err) => console.log(err))
		.finally(() => (btn.textContent = 'Сохранить'));
}

// Примечание : Метод сохранения карточки после редактирования
function saveDialogAddCard(event, form, cardListSelector) {
	const dialog = Modal.searchOpenDialog();
	const card = {
		name: form.name.value,
		link: form.link.value,
	};
	const btn = dialog.querySelector('.PopUp__button');
	btn.textContent = 'Сохранение...';
	event.preventDefault();
	new Promise(() => {
		api.postCard(card)
			.then((res) => {
				const card = Card.create(res, openDialogDeleteCard, likedCard, openDialogViewCard, dialogCardView, profileConfig.id);
				cardListSelector.insertBefore(card, cardListSelector.firstElementChild);
				Modal.close(dialog);
			})
			.catch((err) => console.log(err))
			.finally(() => (btn.textContent = 'Сохранить'));
	});
}

// Примечание : Метод постановки лайка
function likedCard(card, count) {
	if (Card.isOwnerToLikedCard(card, profileConfig.id)) {
		api.deleteLikeCard(card._id)
			.then((res) => updateLikedCard(res, card, count))
			.catch((err) => console.log(err));
	} else {
		api.putLikeCard(card._id)
			.then((res) => updateLikedCard(res, card, count))
			.catch((err) => console.log(err));
	}
}

// Примечание : Метод переключения состояния счетчика лайков
function updateLikedCard(data, card, count) {
	card.likes = data.likes;
	count.textContent = card.likes.length;
}

// Примечание : Метод сохранения информации об новом аватаре пользователя
function updateProfileAvatar(event, form, avatar) {
	const dialog = Modal.searchOpenDialog();
	const link = form.link.value;
	const btn = dialog.querySelector('.PopUp__button');
	btn.textContent = 'Сохранение...';
	event.preventDefault();
	api.patchProfileAvatar(link)
		.then(() => {
			avatar.src = link;
			Modal.close(dialog);
		})
		.catch((err) => console.log(err))
		.finally(() => (btn.textContent = 'Сохранить'));
}

// EVENTS --------------------------------------------------------------------------

// Примечание: Установка события Mmousedown на формы
modals.forEach((form) => {
	form.addEventListener('mousedown', (event) => {
		if (event.target.classList.contains('PopUp--opened')) Modal.close(form);
		if (event.target.classList.contains('PopUp__close')) Modal.close(form);
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
	const args = [event, formEditAvatar, profileAvatar];
	updateProfileAvatar(...args);
});

// RUN PAGE --------------------------------------------------------------------------

loadPage();
enableValidation(document.forms, validationConfig);
