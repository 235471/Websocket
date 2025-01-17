import { getUser } from '../model/usersDb.js';
import authUser from '../utils/authUser.js';
import createJwtToken from '../utils/createJwtToken.js';

function authLogin(socket, io) {
  socket.on('auth-user', async ({ user, password }) => {
    try {
      const findUser = await getUser(user);

      if (!findUser) {
        return socket.emit('auth_failed', 'Usuário não cadastrado!');
      }

      const auth = authUser(password, findUser);

      if (!auth) {
        return socket.emit('auth_failed', 'Usuário ou senha inválida!');
      }
      const tokenJwt = createJwtToken({ username: user });

      socket.emit('auth_sucessful', tokenJwt);
    } catch (error) {
      socket.emit('auth_failed', `Server Internal Error: ${error.message}`);
    }
  });
}

export default authLogin;
