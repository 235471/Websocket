import { getCookie } from '../utils/cookies.js';
import { atualizaTextArea, alertRedirect, getUsernameSuccessAuth, appendUser } from './documento.js';

const socket = io('/users', {
  auth: {
    token: getCookie('jwtToken'),
  },
});

socket.on('auth_granted', getUsernameSuccessAuth);

socket.on('connect_error', (error) => {
  alert(error);
  window.location.href = '/login';
});

socket.on('texto_editor', (text) => {
  atualizaTextArea(text);
});

socket.on('update_userlist', (userList) => {
  appendUser(userList);
});

socket.on('user_already_in_document', () => {
  alert('Document already open in another tab');
  window.location.href = '/';
});

socket.on('delete_doc_success', (docName) => {
  alertRedirect(docName);
});

function selectDocument(data) {
  socket.emit('select_doc', data, (text, username) => {
    atualizaTextArea(text);
  });
}
function emitirTexto(data) {
  socket.emit('texto_editor', data);
}

function deleteDocument(docName) {
  socket.emit('delete_document', docName);
}

export { emitirTexto, selectDocument, deleteDocument };
