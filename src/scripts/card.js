const idTemplateCard = '#card-template';
const classListCards = '.places__list';

// --------------------------------------------------------------------------

const cardTemplate = document.querySelector(idTemplateCard).content;
const cardsList = document.querySelector(classListCards);

// --------------------------------------------------------------------------

const likedCard = function (evt) {
	evt.target.classList.toggle('card__like-button_is-active');
};

// --------------------------------------------------------------------------

export const appendCard = function (card, deleteCard, likeCard) {
	const element = cardTemplate.querySelector('.card').cloneNode(true);
	const btnDelete = element.querySelector('.card__delete-button');
	const image = element.querySelector('.card__image');
	const like = element.querySelector('.card__like-button');
	const title = element.querySelector('.card__title');

	image.src = card.link;
	image.alt = card.name;
	title.textContent = card.name;

	btnDelete.addEventListener('click', () => deleteCard(btnDelete));
	like.addEventListener('click', likeCard);

	return element;
};

export const deleteCard = function (btn) {
	const listItem = btn.closest('.places__item');
	listItem.remove();
};

export const viewCards = function (list) {
	list.forEach((el) => cardsList.append(appendCard(el, deleteCard, likedCard)));
};
