const classNameOpen = 'popup_is-opened';
const classNameClose = 'popup__close';

// --------------------------------------------------------------------------

const open = function (modal) {
	const poPupClose = modal.querySelector('.' + classNameClose);
	modal.classList.add(classNameOpen);
	modal.addEventListener('keydown', (evt) => dialogCloseToEsc(evt, modal));
	modal.addEventListener('click', (evt) => dialogCloseToOwerlay(evt, modal));
	poPupClose.addEventListener('click', () => close(modal));
};

const close = function (modal) {
	const poPupClose = modal.querySelector('.' + classNameClose);
	modal.classList.remove(classNameOpen);
	modal.removeEventListener('keydown', () => dialogCloseToEsc(evt, modal));
	modal.removeEventListener('click', () => dialogCloseToOwerlay(evt, modal));
	poPupClose.removeEventListener('click', () => close(modal));
};

const dialogCloseToEsc = function (evt, modal) {
	if (evt.key === 'Escape') close(modal);
};

const dialogCloseToOwerlay = function ({ currentTarget, target }) {
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
