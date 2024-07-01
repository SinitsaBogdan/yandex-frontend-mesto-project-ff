const сonfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	errorSelector: '.popup__form-field_error',
	submitButtonSelector: '.popup__button',
	errorClass: 'popup__error_visible',
	inputErrorClass: 'popup__input-type_error',
	inactiveButtonClass: 'popup__button-disabled',
};

// Примечание : Метод установки события Submit
export const enableValidation = (forms) => {
	for (const form of forms) {
		form.addEventListener('submit', (evt) => evt.preventDefault());
		setEventListeners(form);
	}
};

// Примечание : Метод очистки проверки валидации у формы
export const clearValidation = (form) => {
	const errorList = Array.from(form.querySelectorAll(сonfig.errorSelector));
	const inputList = Array.from(form.querySelectorAll(сonfig.inputSelector));
	const submit = form.querySelector(сonfig.submitButtonSelector);
	form.reset();
	errorList.forEach((error) => {
		error.classList.remove(сonfig.errorClass);
		error.textContent = '';
	});
	inputList.forEach((input) => input.classList.remove(сonfig.inputErrorClass));
	toggleButtonState(inputList, submit);
};

// Примечание : Метод установки события Input
const setEventListeners = (form) => {
	const inputList = Array.from(form.querySelectorAll(сonfig.inputSelector));
	const submit = form.querySelector(сonfig.submitButtonSelector);
	inputList.forEach((input) => {
		input.addEventListener('input', function () {
			checkInputValidity(form, input);
			toggleButtonState(inputList, submit);
		});
	});
};

// Примечание : Метод проверки фалидации Input
const checkInputValidity = (form, input) => {
	if (input.validity.valueMissing) input.setCustomValidity(input.dataset.errorEmpty);
	else if (input.validity.patternMismatch) input.setCustomValidity(input.dataset.errorPattern);
	else if (input.validity.typeMismatch) input.setCustomValidity(input.dataset.errorType);
	else input.setCustomValidity('');
	if (!input.validity.valid) showInputError(form, input, input.validationMessage);
	else hideInputError(form, input);
};

// Примечание : Метод измения не валидного Input
const showInputError = (form, input, errorMessage) => {
	const error = form.querySelector(`#${input.id}-error`);
	error.classList.add(сonfig.errorClass);
	error.textContent = errorMessage;
	input.classList.add(сonfig.inputErrorClass);
};

// Примечание : Метод измения валидного Input
const hideInputError = (form, input) => {
	const error = form.querySelector(`#${input.id}-error`);
	error.classList.remove(сonfig.errorClass);
	error.textContent = '';
	input.classList.remove(сonfig.inputErrorClass);
};

// Примечание : Метод переключения состояния Submit
const toggleButtonState = (inputs, submit) => {
	if (hasInvalidInput(inputs)) {
		submit.classList.add(сonfig.inactiveButtonClass);
		submit.disabled = true;
	} else {
		submit.classList.remove(сonfig.inactiveButtonClass);
		submit.disabled = false;
	}
};

// Примечание : Метод проверки формы на не валидные Input
const hasInvalidInput = (inputs) => {
	return inputs.some((input) => {
		return !input.validity.valid;
	});
};
