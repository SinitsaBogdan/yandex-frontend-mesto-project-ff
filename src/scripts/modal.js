const config = {
	popUpIsOpenSelector: '.PopUp--opened',
	popUpIsOpenClass: 'PopUp--opened',
};

// Примечание: Метод закрытия модального окна по нажатию Escape
function closeDialogToKeyDownEsc(event) {
	if (event.key === 'Escape') {
		const dialog = searchOpenDialog();
		close(dialog);
	}
}

// Примечание: Метод открытия модального окна
export function open(dialog) {
	dialog.classList.add(config.popUpIsOpenClass);
	document.addEventListener('keydown', closeDialogToKeyDownEsc);
}

// Примечание: Метод закрытия модального окна
export function close(dialog) {
	dialog.classList.remove(config.popUpIsOpenClass);
	document.removeEventListener('keydown', closeDialogToKeyDownEsc);
}

// Примечание: Метод поиска открытого модального окна
export function searchOpenDialog() {
	return document.querySelector(config.popUpIsOpenSelector);
}
