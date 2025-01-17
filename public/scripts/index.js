import { emitAddDocument } from './socket-front-index.js';
import { getElementById } from '../utils/getElement.js';
import { getCookie, removeCookie } from '../utils/cookies.js';

const jwtToken = getCookie('jwtToken');

const docList = getElementById('lista-documentos');
const form = getElementById('form-adiciona-documento');
const docName = getElementById('input-documento');
const logout = getElementById('botao-logout');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (docName.value) {
    emitAddDocument(docName.value);
    docName.value = '';
  }
});

logout.addEventListener('click', () => {
  removeCookie('jwtToken');
  alert('User logout successfully');
  window.location.href = '/login';
});
function appendDocumentLink(docName) {
  docList.innerHTML += `
        <a 
        href="documento/index.html?nome=${docName}" class="list-group-item list-group-item-action" id="documento-${docName}">
        ${docName}
        </a>
    `;
}

function removeChildElement(docName) {
  const element = getElementById(`documento-${docName}`);
  docList.removeChild(element);
}

export { appendDocumentLink, removeChildElement };
