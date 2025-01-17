import { scryptSync, timingSafeEqual } from 'crypto';
function authUser(password, user) {
  const checkHash = scryptSync(password, user.salt, 64);
  const hash = Buffer.from(user.passwordHash, 'hex');

  const auth = timingSafeEqual(checkHash, hash);

  return auth;
}

export default authUser;
