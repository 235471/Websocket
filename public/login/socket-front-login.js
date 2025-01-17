import { setCookie } from '../utils/cookies.js';

const socket = io();
function emitAuthentication(data) {
  socket.emit('auth-user', data);
}

socket.on('auth_sucessful', (jwtToken) => {
  setCookie({ jwtToken: jwtToken });
  alert('User sucessfully authenticated!');
  window.location.href = '/';
});
socket.on('auth_failed', (error) => {
  alert(error);
});

export { emitAuthentication };
