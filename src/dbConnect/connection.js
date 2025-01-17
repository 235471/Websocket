import { MongoClient } from 'mongodb';

// Replace the uri string with your connection string.
const uri = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(uri);
let collection;
let usersCollection;
async function createUniqueIndex() {
  try {
    const db = client.db();
    collection = db.collection('documentos');
    usersCollection = db.collection('users');
    // Verifica se o índice já existe
    const indexes = await collection.indexes();
    const nameIndexExists = indexes.some((index) => index.key && index.key.name === 1 && index.unique === true);
    const userIndex = await usersCollection.indexes();
    const userIndexExists = userIndex.some((index) => index.key && index.key.user === 1 && index.unique === true);

    if (!nameIndexExists) {
      await collection.createIndex({ name: 1 }, { unique: true });
      // eslint-disable-next-line quotes
      console.log(`Índice único 'name' criado com sucesso.`);
    }

    if (!userIndexExists) {
      await usersCollection.createIndex({ user: 1 }, { unique: true });
      // eslint-disable-next-line quotes
      console.log(`Índice único 'user' criado com sucesso.`);
    }
  } catch (error) {
    console.log(error);
  }
}

async function run() {
  try {
    await client.connect();
    console.log('Conectado ao MongoDB com sucesso!');

    await createUniqueIndex(); // Chama a função para criar o índice
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Encerra o processo em caso de falha na conexão
  }
}
run();

export { collection, usersCollection };
