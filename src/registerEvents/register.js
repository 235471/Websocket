import { registerUser } from '../model/usersDb.js';

function registerUserEvent(socket, io) {
  socket.on('register-user', async (data) => {
    try {
      const result = await registerUser(data);
      if (result.acknowledged) {
        socket.emit('register_sucessful');
      }
    } catch (error) {
      if (error.code === 11000) {
        const user = error.message.match(/user: "([^"]+)"/)[1];
        socket.emit('register_failed', `User already in use: ${user}`);
      } else {
        console.error('Server Internal error:', error);
        socket.emit('register_failed', 'Server Internal error');
      }
    }
  });
}

export default registerUserEvent;
