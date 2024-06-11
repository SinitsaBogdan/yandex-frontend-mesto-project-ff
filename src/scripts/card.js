const idSelectorTemplateCard = '#card-template';
const classSelectorListWrapperItem = '.places__item';
const classSelectorCard = '.card';
const classSelectorCardImage = '.card__image';
const classSelectorCardTitle = '.card__title';
const classSelectorCardButtonLike = '.card__like-button';
const classSelectorCardButtonDelete = '.card__delete-button';

const nameSelectorCardButtonLikeIsActive = 'card__like-button_is-active';

const cardTemplate = document.querySelector(idSelectorTemplateCard).content;

// --------------------------------------------------------------------------

export function create(card, removeCard, likeCard, openDialog, dialog) {
	const element = cardTemplate.querySelector(classSelectorCard).cloneNode(true);
	const btnDelete = element.querySelector(classSelectorCardButtonDelete);
	const image = element.querySelector(classSelectorCardImage);
	const like = element.querySelector(classSelectorCardButtonLike);
	const title = element.querySelector(classSelectorCardTitle);

	image.src = card.link;
	image.alt = card.name;
	title.textContent = card.name;

	image.addEventListener('click', (event) => openDialog(event, dialog));
	btnDelete.addEventListener('click', () => removeCard(btnDelete));
	like.addEventListener('click', likeCard);

	return element;
}

export function liked(evt) {
	evt.target.classList.toggle(nameSelectorCardButtonLikeIsActive);
}

export function remove(btn) {
	btn.closest(classSelectorListWrapperItem).remove();
}
