import { getDocuments, addDocument } from '../model/documentsDb.js';
function registerEventHome(socket, io) {
  socket.on('get_documents', async (returnDocuments) => {
    const documents = await getDocuments();
    returnDocuments(documents);
  });

  socket.on('add_document', async (docName) => {
    try {
      const result = await addDocument(docName);
      if (result.acknowledged) {
        io.emit('add_document_interface', docName);
      }
    } catch (error) {
      if (error.code === 11000) {
        // Código de erro para violação de índice único
        console.log(`Tentativa de criar documento duplicado: ${docName}`);
        socket.emit('document_already_exists', docName); // Notifica o cliente
      }
    }
  });
}

export { registerEventHome };
