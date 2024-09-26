let successMessage = "Message sent successfully!"
let errorMessage = "An error occured."

function sendEmail() {
	const email = document.querySelector('.email-area').value;
	const inquiry = document.querySelector('.inquiry-area').value;
	const messageElem = document.querySelector('.message');
	const sendLink = document.querySelector('.send-link');
	const loadingSquare = document.querySelector('.loading-square');
	const errorSymbol = document.getElementById("error");
	const successSymbol = document.getElementById("success");
	
	errorSymbol.style.display = 'none';
	successSymbol.style.display = 'none';

	if (!email || !inquiry) {
		messageElem.textContent = "Please fill in all fields.";
		return;
	}

	loadingSquare.classList.add("active");
	messageElem.textContent = "";
	sendLink.classList.add('disabled');

	fetch('/sendEmail', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email: email, inquiry: inquiry })
	})
	.then(response => response.text())
	.then(result => {
		loadingSquare.classList.remove("active");
		if (result === 'Success') {
			messageElem.textContent = successMessage;
			sendLink.classList.add('disabled');
			errorSymbol.style.display = 'none';
			successSymbol.style.display = 'block';
			localStorage.setItem('emailSent', true);
			localStorage.setItem('message', successMessage);
			localStorage.setItem('timestamp', new Date().getTime());
		} else {
			messageElem.textContent = errorMessage;
			sendLink.classList.remove('disabled');
			errorSymbol.style.display = 'block';
			successSymbol.style.display = 'none';
		}
	})
	.catch(error => {
		loadingSquare.classList.remove("active");
		messageElem.textContent = errorMessage;
		sendLink.classList.remove('disabled');
		errorSymbol.style.display = 'block';
		successSymbol.style.display = 'none';
	});
}

document.addEventListener('DOMContentLoaded', () => {
	const emailSent = localStorage.getItem('emailSent');
	const message = localStorage.getItem('message');
	const timestamp = localStorage.getItem('timestamp');
	const oneDay = 86400000;
	const errorSymbol = document.getElementById("error");
	const successSymbol = document.getElementById("success");

	if (emailSent && timestamp && (new Date().getTime() - timestamp < oneDay)) {
		document.querySelector('.send-link').classList.add('disabled');
		document.querySelector('.message').textContent = message;
		errorSymbol.style.display = 'none';
		successSymbol.style.display = 'block';
	} else {
		localStorage.clear();
		document.querySelector('.message').textContent = "";
	}
});
