import { randomBytes, scryptSync } from 'crypto';
function generateHashSaltPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const passwordHash = scryptSync(password, salt, 64).toString('hex');

  return { passwordHash, salt };
}
export default generateHashSaltPassword;
