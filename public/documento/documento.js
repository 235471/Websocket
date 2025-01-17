import { emitirTexto, selectDocument, deleteDocument } from './socket-front-documento.js';
import { getElementById } from '../utils/getElement.js';

const params = new URLSearchParams(window.location.search);
const documentName = params.get('nome');

const textoEditor = getElementById('editor-texto');
const docTitle = getElementById('titulo-documento');
const exclude = getElementById('excluir-documento');
const userList = getElementById('usuarios-conectados');

docTitle.textContent = documentName || 'Documento sem título';

textoEditor.addEventListener('keyup', () => {
  emitirTexto({
    text: textoEditor.value,
    title: docTitle.textContent,
  });
});

exclude.addEventListener('click', () => {
  deleteDocument(docTitle.textContent);
});
function atualizaTextArea(texto) {
  textoEditor.value = texto;
}

function alertRedirect(docName) {
  if (docName === docTitle.textContent) {
    alert(`O Documento ${docName} foi excluído`);
    window.location.href = '/';
  }
}

function getUsernameSuccessAuth(payloadToken) {
  selectDocument({ docName: docTitle.textContent, username: payloadToken.username });
}

function appendUser(usernameList) {
  userList.innerHTML = '';
  usernameList.forEach((username) => {
    userList.innerHTML += `<li class="list-group-item">${username}</li>`;
  });
}

export { atualizaTextArea, docTitle, alertRedirect, getUsernameSuccessAuth, appendUser };
