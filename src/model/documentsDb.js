import { collection } from '../dbConnect/connection.js';

function getDocuments() {
  return collection.find().toArray();
}
function findDocText(docName) {
  const document = collection.findOne({ name: docName });
  return document;
}
function addDocument(docName) {
  return collection.insertOne({ name: docName, text: '' });
}
function updateDocText(docName, text) {
  const update = collection.updateOne(
    { name: docName },
    {
      $set: {
        text: text,
      },
    }
  );
  return update;
}

function deleteDocument(docName) {
  return collection.deleteOne({ name: docName });
}

export { findDocText, updateDocText, getDocuments, addDocument, deleteDocument };
