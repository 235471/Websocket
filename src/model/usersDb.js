import { usersCollection } from '../dbConnect/connection.js';
import generateHashSaltPassword from '../utils/generateHashSalt.js';

function registerUser({ user, password }) {
  const { passwordHash, salt } = generateHashSaltPassword(password);

  return usersCollection.insertOne({ user, passwordHash, salt });
}

function getUser(user) {
  return usersCollection.findOne({ user });
}
export { registerUser, getUser };
