export const enableValidation = (settings) => {
	const list = Array.from(document.querySelectorAll(settings.formSelector));
	list.forEach((form) => {
		form.addEventListener('submit', (evt) => {
			evt.preventDefault();
		});
		setEventListeners(form, settings);
	});
};

const setEventListeners = (form, settings) => {
	const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
	inputList.forEach((input) => {
		input.addEventListener('input', function () {
            clearValidation(form, settings);
			checkInputValidity(settings, form, input);
		});
	});
};

const checkInputValidity = (settings, form, input) => {
};

const clearValidation = (form, settings) => {
};

const showInputError = (form, input, errorMessage) => {
};

const hideInputError = (form, input) => {
};



