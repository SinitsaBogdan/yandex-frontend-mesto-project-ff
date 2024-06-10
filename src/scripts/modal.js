const classNameOpen = 'popup_is-opened';
const classNameClose = 'popup__close';

// --------------------------------------------------------------------------

const open = function (modal) {
	const popUpClose = modal.querySelector('.' + classNameClose);
	modal.classList.add(classNameOpen);
	modal.addEventListener('click', (evt) => closeDialogToOwerlay(evt, modal));
	popUpClose.addEventListener('click', () => close(modal));
	document.addEventListener('keydown', (evt) => closeDialogToEsc(evt, modal));
};

const close = function (modal) {
	const popUpClose = modal.querySelector('.' + classNameClose);
	modal.classList.remove(classNameOpen);
	modal.removeEventListener('click', () => closeDialogToOwerlay(evt, modal));
	popUpClose.removeEventListener('click', () => close(modal));
	document.removeEventListener('keydown', () => closeDialogToEsc(evt, modal));
};

const closeDialogToEsc = function (evt, modal) {
	if (evt.key === 'Escape') close(modal);
};

const closeDialogToOwerlay = function ({ currentTarget, target }) {
	if (target === currentTarget) close(currentTarget);
};

// --------------------------------------------------------------------------

export const openDialogProfileEdit = function (modal, form, profileTitle, profileDescription) {
	open(modal);
	form.name.focus();
	form.name.value = profileTitle.textContent;
	form.description.value = profileDescription.textContent;
};

export const saveDialogProfileEdit = function (event, modal, form, title, description) {
	event.preventDefault();
	title.textContent = form.name.value;
	description.textContent = form.description.value;
	form.reset();
	close(modal);
};

export const openDialogCardAdd = function (modal, form) {
	open(modal);
	form.place_name.focus();
};

export const saveDialogCardAdd = function (event, modal, form, list, appendCard, deleteCard) {
	event.preventDefault();
	const card = {
		name: form.place_name.value,
		link: form.link.value,
	};
	list.insertBefore(appendCard(card, deleteCard), list.firstElementChild);
	form.reset();
	close(modal);
};

export const openDialogImage = function (evt, modal) {
	const card = evt.target.closest('.card');
	const image = modal.querySelector('.popup__image');
	const caption = modal.querySelector('.popup__caption');
	open(modal);
	image.src = card.querySelector('.card__image').src;
	caption.textContent = card.querySelector('.card__title').textContent;
};
