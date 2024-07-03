// Примечание : Метод установки события Submit
export const enableValidation = (forms, сonfig) => {
	for (const form of forms) {
		form.addEventListener('submit', (evt) => evt.preventDefault());
		setEventListeners(form, сonfig);
	}
};

// Примечание : Метод очистки проверки валидации у формы
export const clearValidation = (form, сonfig) => {
	const errorList = Array.from(form.querySelectorAll(сonfig.errorSelector));
	const inputList = Array.from(form.querySelectorAll(сonfig.inputSelector));
	const submit = form.querySelector(сonfig.submitButtonSelector);
	form.reset();
	errorList.forEach((error) => {
		error.classList.remove(сonfig.errorClass);
		error.textContent = '';
	});
	inputList.forEach((input) => input.classList.remove(сonfig.inputErrorClass));
	toggleButtonState(inputList, submit, сonfig);
};

// Примечание : Метод установки события Input
const setEventListeners = (form, сonfig) => {
	const inputList = Array.from(form.querySelectorAll(сonfig.inputSelector));
	const submit = form.querySelector(сonfig.submitButtonSelector);
	inputList.forEach((input) => {
		input.addEventListener('input', function () {
			checkInputValidity(form, input, сonfig);
			toggleButtonState(inputList, submit, сonfig);
		});
	});
};

// Примечание : Метод проверки фалидации Input
const checkInputValidity = (form, input, сonfig) => {
	if (input.validity.valueMissing) input.setCustomValidity(input.dataset.errorEmpty);
	else if (input.validity.patternMismatch) input.setCustomValidity(input.dataset.errorPattern);
	else if (input.validity.typeMismatch) input.setCustomValidity(input.dataset.errorType);
	else input.setCustomValidity('');
	if (!input.validity.valid) showInputError(form, input, input.validationMessage, сonfig);
	else hideInputError(form, input, сonfig);
};

// Примечание : Метод измения не валидного Input
const showInputError = (form, input, errorMessage, сonfig) => {
	const error = form.querySelector(`#${input.id}-error`);
	error.classList.add(сonfig.errorClass);
	error.textContent = errorMessage;
	input.classList.add(сonfig.inputErrorClass);
};

// Примечание : Метод измения валидного Input
const hideInputError = (form, input, сonfig) => {
	const error = form.querySelector(`#${input.id}-error`);
	error.classList.remove(сonfig.errorClass);
	error.textContent = '';
	input.classList.remove(сonfig.inputErrorClass);
};

// Примечание : Метод переключения состояния Submit
const toggleButtonState = (inputs, submit, сonfig) => {
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
