import io from './server.js';
import { registerEventHome } from './registerEvents/home.js';
import { registerEventsDocument } from './registerEvents/document.js';
import registerUserEvent from './registerEvents/register.js';
import authLogin from './registerEvents/login.js';
import authenticateUser from './middleware/authLogin.js';

const nspUser = io.of('/users');

nspUser.use(authenticateUser);

nspUser.on('connection', (socket) => {
  registerEventHome(socket, nspUser);

  registerEventsDocument(socket, nspUser);
});

io.on('connection', (socket) => {
  registerUserEvent(socket, io);

  authLogin(socket, io);

  socket.on('disconnect', (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
});
