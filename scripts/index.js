const textArea = document.getElementById('text-area');
const btnEncriptar = document.getElementById('btn-encriptar');
const btnDesencriptar = document.getElementById('btn-desencriptar');
const btnLimpiar = document.getElementById('btn-limpiar');
const btnCopiar = document.getElementById('btn-copiar');
const placeholdeImage = document.getElementById('placeholder-image');
const resultado = document.getElementById('resultado');
const textResultado = document.getElementById('text-resultado');

const PERMIT_PATTERN = /^[a-zñ\s]+$/;

const MENSAJE = {
	VACIO: '',
	COPIADO: 'Mensage copiado a portapapeles'
};

const valores = {
	e: 'enter',
	i: 'imes',
	a: 'ai',
	o: 'ober',
	u: 'ufat'
};

const addHidden = () => {
	placeholdeImage.classList.add('hidden');
	resultado.classList.remove('hidden');
};

const removeHidden = () => {
	placeholdeImage.classList.remove('hidden');
	resultado.classList.add('hidden');
};

const encrypText = mensaje => {
	for (const key in valores) {
		const regex = new RegExp(key, 'g');
		mensaje = mensaje.replace(regex, valores[key]);
	}
	return mensaje;
};

const decryptText = mensaje => {
	for (const key in valores) {
		const regex = new RegExp(valores[key], 'g');
		mensaje = mensaje.replace(regex, key);
	}
	return mensaje;
};

const limpiarTexto = texto => {
	return texto.normalize('NFD').replace(/[^a-zA-Z0-9 ]/g, '');
};

btnEncriptar.addEventListener('click', () => {
	const texto = limpiarTexto(textArea.value);
	if (texto === MENSAJE.VACIO) {
		removeHidden();
	} else {
		addHidden();
	}

	textResultado.textContent = encrypText(texto);
});

btnDesencriptar.addEventListener('click', () => {
	const texto = limpiarTexto(textArea.value);
	if (texto === MENSAJE.VACIO) {
		removeHidden();
	} else {
		addHidden();
	}
	textResultado.innerHTML = decryptText(texto);
});

btnCopiar.addEventListener('click', () => {
	let copyMessage = '';
	copyMessage = textResultado.innerHTML;
	textArea.value = '';
	textArea.value = copyMessage;
});

btnLimpiar.addEventListener('click', () => {
	textArea.value = '';
	removeHidden();
});

textArea.addEventListener('keypress', event => {
	if (event.key.match(PERMIT_PATTERN) === null) {
		event.preventDefault();
	}
});
