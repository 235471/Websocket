import { findDocText, updateDocText, deleteDocument } from '../model/documentsDb.js';
import { addConnection, getUsersByDoc, isConnected, removeConnection } from '../utils/docConnections.js';
function registerEventsDocument(socket, io) {
  socket.on('select_doc', async ({ docName, username }, updateText) => {
    const document = await findDocText(docName);

    if (document) {
      const isConn = isConnected(docName, username);

      if (isConn) {
        return socket.emit('user_already_in_document');
      }

      socket.data = {
        isConnected: true,
      };

      socket.join(docName);

      addConnection({ docName, username });

      const userListByDocument = getUsersByDoc(docName);

      io.to(docName).emit('update_userlist', userListByDocument);
      updateText(document.text);
    }
    socket.on('texto_editor', async ({ text, title }) => {
      const update = await updateDocText(title, text);

      if (update.modifiedCount) {
        socket.to(title).emit('texto_editor', text);
      }
    });

    socket.on('delete_document', async (docName) => {
      const result = await deleteDocument(docName);
      if (result.deletedCount) {
        io.emit('delete_doc_success', docName);
      }
    });

    socket.on('disconnect', () => {
      if (socket.data.isConnected) {
        removeConnection(docName, username);

        const userListByDocument = getUsersByDoc(docName);

        io.to(docName).emit('update_userlist', userListByDocument);
      }
    });
  });
}
export { registerEventsDocument };
