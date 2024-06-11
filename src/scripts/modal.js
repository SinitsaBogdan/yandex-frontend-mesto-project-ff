const classSelectorPopUpOpened = '.popup_is-opened';
const nameSelectorPopUpOpened = classSelectorPopUpOpened.slice(1);

// --------------------------------------------------------------------------

function eventKeyDown (event) {
	const dialog = searchOpenDialog();
	if (event.key === 'Escape') close(dialog);
}

// --------------------------------------------------------------------------

export function open(dialog) {
	dialog.classList.add(nameSelectorPopUpOpened);
	document.addEventListener('keydown', eventKeyDown);
}

export function close(dialog) {
	dialog.classList.remove(nameSelectorPopUpOpened);
	document.removeEventListener('keydown', eventKeyDown);
}

export function searchOpenDialog () {
	return document.querySelector(classSelectorPopUpOpened)
}