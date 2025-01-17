import { getElementById } from '../utils/getElement.js';
import { emitAuthentication } from './socket-front-login.js';

const form = getElementById('form-login');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const user = form['input-usuario'].value;
  const password = form['input-senha'].value;

  emitAuthentication({ user, password });
});
