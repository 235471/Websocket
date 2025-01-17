import { getCookie } from '../utils/cookies.js';
import { appendDocumentLink, removeChildElement } from './index.js';

const socket = io('/users', {
  auth: {
    token: getCookie('jwtToken'),
  },
});

socket.on('connect_error', (error) => {
  alert(error);
  window.location.href = '/login';
});

socket.emit('get_documents', (documents) => {
  documents.forEach((doc) => {
    appendDocumentLink(doc.name);
  });
});

socket.on('add_document_interface', (docName) => {
  appendDocumentLink(docName);
});

socket.on('document_already_exists', (docName) => {
  alert(`O documento ${docName} já existe!`);
});

socket.on('delete_doc_success', (docName) => {
  removeChildElement(docName);
});
function emitAddDocument(docName) {
  socket.emit('add_document', docName);
}

export { emitAddDocument };
