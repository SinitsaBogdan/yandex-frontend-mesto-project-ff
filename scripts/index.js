import {initialCards} from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

const createCard = function appendCard (card, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const btnDeleteCard = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;

    btnDeleteCard.addEventListener('click', () => deleteCard(btnDeleteCard));
    cardsList.append(cardElement);
}

const deleteCard = function removeCard (btn) {
    const listItem = btn.closest('.places__item');
    listItem.remove();
}

function viewCards (list) {
    list.forEach((el) => createCard(el, deleteCard));
}

viewCards(initialCards)