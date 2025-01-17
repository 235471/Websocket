const connectionsByDocuments = [];

function addConnection(connection) {
  // Verifica se já existe uma conexão do usuário para o documento específico
  const userIndex = connectionsByDocuments.findIndex((conn) => conn.docName === connection.docName && conn.username === connection.username);
  // Só adiciona se o usuário ainda não estiver na lista
  if (userIndex === -1) {
    connectionsByDocuments.push(connection);
  } else {
    return true;
  }
}

function getUsersByDoc(docName) {
  return connectionsByDocuments.filter((conn) => conn.docName === docName).map((conn) => (conn = conn.username));
}

function removeConnection(docName, username) {
  const userIndex = connectionsByDocuments.findIndex((conn) => conn.docName === docName && conn.username === username);
  if (userIndex !== -1) {
    connectionsByDocuments.splice(userIndex, 1);
  }
}

function isConnected(docName, username) {
  return connectionsByDocuments.find((conn) => conn.docName === docName && conn.username === username);
}
export { addConnection, getUsersByDoc, removeConnection, isConnected };
