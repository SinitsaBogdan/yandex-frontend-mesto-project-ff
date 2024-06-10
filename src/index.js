import { appendCard, deleteCard, viewCards } from './scripts/card';
import { openDialogProfileEdit, saveDialogProfileEdit, openDialogCardAdd, saveDialogCardAdd, openDialogImage } from './scripts/modal';
import { initialCards } from './data/data-cards';
import './styles/index.css';

viewCards(initialCards);

const allCardImages = document.querySelectorAll('.card__image');
const cardList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const btnProfileEdit = document.querySelector('.profile__edit-button');
const btnCardAdd = document.querySelector('.profile__add-button');

const dialogEdit = document.querySelector('.popup_type_edit');
const dialogAdd = document.querySelector('.popup_type_new-card');
const dialogImage = document.querySelector('.popup_type_image');

const formEdit = document.forms.edit_profile;
const formAdd = document.forms.new_place;

// --------------------------------------------------------------------------

btnProfileEdit.addEventListener('click', () => {
	const args = [dialogEdit, formEdit, profileTitle, profileDescription];
	openDialogProfileEdit(...args);
});

btnCardAdd.addEventListener('click', () => {
	const args = [dialogAdd, formAdd];
	openDialogCardAdd(...args);
});

allCardImages.forEach((element) => {
	element.addEventListener('click', (evt) => {
		const args = [evt, dialogImage];
		openDialogImage(...args);
	});
});

// --------------------------------------------------------------------------

formEdit.addEventListener('submit', (event) => {
	const args = [event, dialogEdit, formEdit, profileTitle, profileDescription];
	saveDialogProfileEdit(...args);
});

formAdd.addEventListener('submit', function (event) {
	const args = [event, dialogAdd, formAdd, cardList, appendCard, deleteCard];
	saveDialogCardAdd(...args);
});
