import jwt from 'jsonwebtoken';

function createJwtToken(payload) {
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

  return token;
}

export default createJwtToken;
