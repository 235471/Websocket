import { getElementById } from '../utils/getElement.js';
import { emitRegisterUser } from './socket-front-cadastro.js';

const form = getElementById('form-cadastro');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const user = form['input-usuario'].value;
  const password = form['input-senha'].value;

  emitRegisterUser({ user, password });
});
