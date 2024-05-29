import {initialCards} from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

const createCard = function appendCard (card, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const btnDeleteCard = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;

    btnDeleteCard.addEventListener('click', () => deleteCard(btnDeleteCard));
    return cardElement;
}

const deleteCard = function removeCard (btn) {
    const listItem = btn.closest('.places__item');
    listItem.remove();
}

function viewCards (list) {
    list.forEach((el) => cardsList.append(createCard(el, deleteCard)));
}

viewCards(initialCards)