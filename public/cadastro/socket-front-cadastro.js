const socket = io();
function emitRegisterUser(data) {
  socket.emit('register-user', data);
}

socket.on('register_sucessful', () => {
  alert('User sucessfully registered');
});
socket.on('register_failed', (error) => {
  alert(error);
});

export { emitRegisterUser };
