const config = {
	templateCardSelector: '#card-template',
	cardSelector: '.Card',
	imageSelector: '.Card__image',
	titleSelector: '.Card__title',
	cardDeleteSelector: '.Card__delete',
	likeButtonSelector: '.Like',
	cardLikeActiveClass: 'Like--active',
	likeIconSelector: '.Like__svg',
	likeCountSelector: '.Like__count',
};

const cardTemplate = document.querySelector(config.templateCardSelector).content;

// --------------------------------------------------------------------------

// Примечание: Метод создания нового объекта разметки карточки
export function create(card, openDialogDeleteCard, funcLikeCard, openDialogViewCard, dialogViewCard, profileId) {
	const element = getCardTemplate(config.cardSelector);
	const title = element.querySelector(config.titleSelector);
	const image = element.querySelector(config.imageSelector);
	const btnCardDelete = element.querySelector(config.cardDeleteSelector);
	const btnLike = element.querySelector(config.likeButtonSelector);
	const btnLikeCount = btnLike.querySelector(config.likeCountSelector);
	const btnLikeIcon = btnLike.querySelector(config.likeIconSelector);

	if (profileId === card.owner._id) {
		btnCardDelete.addEventListener('click', (event) => {
			const card = event.target.closest(config.cardSelector);
			openDialogDeleteCard(card);
		});
	} else element.querySelector(config.cardDeleteSelector).remove();

	if (isOwnerToLikedCard(card, profileId)) toggleIconActive(btnLikeIcon);

	element.id = card._id;
	image.src = card.link;
	image.alt = card.name;
	title.textContent = card.name;
	btnLikeCount.textContent = card.likes.length;

	image.addEventListener('click', (event) => openDialogViewCard(event, dialogViewCard));

	btnLikeIcon.addEventListener('click', () => {
		funcLikeCard(card, btnLikeCount, btnLikeIcon, toggleIconActive);
		toggleIconActive(btnLikeIcon);
	});
	return element;
}

// Примечание: Метод проверки наличия лайка у карточки
export function isOwnerToLikedCard(card, profileId) {
	return card.likes.filter((el) => el._id === profileId).length > 0;
}

// Примечание: Метод переключения состояния иконки лайка
export function toggleIconActive(btnLikeSvg) {
	btnLikeSvg.classList.toggle(config.cardLikeActiveClass);
}

// Примечание: Метод удаления карточки из разметки
export function remove(card) {
	card.remove();
}

function getCardTemplate(selector) {
	return cardTemplate.querySelector(selector).cloneNode(true);
}
