import jwt from 'jsonwebtoken';
function authenticateUser(socket, next) {
  const jwtToken = socket.handshake.auth.token;
  try {
    const payloadToken = jwt.verify(jwtToken, process.env.SECRET_KEY);
    socket.emit('auth_granted', payloadToken);
    next();
  } catch (error) {
    next(error);
  }
}

export default authenticateUser;
