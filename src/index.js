import * as Card from './scripts/card';
import * as Modal from './scripts/modal';
import { enableValidation, clearValidation } from './scripts/vadidations';
import { initialCards } from './data/data-cards';
import './styles/index.css';

const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
}

const modals = document.querySelectorAll('.popup');
const cardList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const btnProfileEdit = document.querySelector('.profile__edit-button');
const btnCardAdd = document.querySelector('.profile__add-button');

const dialogEdit = document.querySelector('.popup_type_edit');
const dialogAdd = document.querySelector('.popup_type_new-card');

const dialogCardView = document.querySelector('.popup_type_image');
const dialogCardViewImage = dialogCardView.querySelector('.popup__image');
const dialogCardViewCaption = dialogCardView.querySelector('.popup__caption');

const formEdit = document.forms.edit_profile;
const formAdd = document.forms.new_place;

// --------------------------------------------------------------------------

function openDialogProfileEdit(modal, form, profileTitle, profileDescription) {
	Modal.open(modal);
	form.name.focus();
	form.name.value = profileTitle.textContent;
	form.description.value = profileDescription.textContent;
}

function saveDialogProfileEdit(event, form, title, description) {
	const dialog = Modal.searchOpenDialog();
	event.preventDefault();
	title.textContent = form.name.value;
	description.textContent = form.description.value;
	form.reset();
	Modal.close(dialog);
}

function openDialogCardAdd(modal, form) {
	Modal.open(modal);
	form.name.focus();
}

function saveDialogCardAdd(event, form, list, appendCard) {
	const dialog = Modal.searchOpenDialog();
	const card = {
		name: form.name.value,
		link: form.link.value,
	};
	event.preventDefault();
	list.insertBefore(appendCard(card, Card.remove, Card.liked, openDialogCardView, dialogCardView), list.firstElementChild);
	form.reset();
	Modal.close(dialog);
}

function openDialogCardView(evt, dialog) {
	const card = evt.target.closest('.card');
	const cardTitle = card.querySelector('.card__title').textContent;
	const cardScr = card.querySelector('.card__image').src;

	dialogCardViewImage.src = cardScr;
	dialogCardViewImage.alt = cardTitle;
	dialogCardViewCaption.textContent = cardTitle;
	Modal.open(dialog);
}

// --------------------------------------------------------------------------

initialCards.forEach((card) => {
	cardList.append(Card.create(card, Card.remove, Card.liked, openDialogCardView, dialogCardView));
});

modals.forEach((el) => {
	el.addEventListener('mousedown', (event) => {
		if (event.target.classList.contains('popup_is-opened')) Modal.close(el);
		if (event.target.classList.contains('popup__close')) Modal.close(el);
	});
});

btnProfileEdit.addEventListener('click', () => {
	const args = [dialogEdit, formEdit, profileTitle, profileDescription];
	openDialogProfileEdit(...args);
});

btnCardAdd.addEventListener('click', () => {
	const args = [dialogAdd, formAdd];
	openDialogCardAdd(...args);
});

formEdit.addEventListener('submit', (event) => {
	const args = [event, formEdit, profileTitle, profileDescription];
	saveDialogProfileEdit(...args);
});

formAdd.addEventListener('submit', function (event) {
	const args = [event, formAdd, cardList, Card.create, Card.remove];
	saveDialogCardAdd(...args);
});

enableValidation(validationConfig);