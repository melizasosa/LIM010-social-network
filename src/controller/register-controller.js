import { functionRegister, userCurrent } from '../module/controllerdata.js';

export const functionRegisterClick = (event) => {
  event.preventDefault();
  const txtEmailRegister = document.getElementById('txt-email-register').value;
  const txtPasswordRegister = document.getElementById('txt-password-register').value;
  const messageErrorRegister = document.getElementById('txt-message-error-register');
  const name = document.getElementById('txt-name-register').value;
  functionRegister(txtEmailRegister, txtPasswordRegister)
    .then(() => {
      messageErrorRegister.classList.remove('show-message-error');
      messageErrorRegister.innerHTML = 'Usuario Registrado';
      const user = userCurrent();
      // window.location.hash = '#/';

      firebase.firestore().collection('users').doc(user.uid).set({
        Usuario: name,
        Correo: txtEmailRegister,
      });
      console.log(name);
      console.log(txtEmailRegister);
    })
    .catch((error) => {
      messageErrorRegister.classList.add('show-message-error');
      switch (error.code) {
        case 'auth/email-already-in-use':
          messageErrorRegister.innerHTML = '¡La dirección de correo electrónico ya existe!';
          break;
        case 'auth/weak-password':
          messageErrorRegister.innerHTML = 'La contraseña debe tener 6 ó más caracteres';
          break;
        case 'auth/invalid-email':
          messageErrorRegister.innerHTML = 'No se escribió correo electrónico válido, example@example.com';
          break;
        default:
          messageErrorRegister.innerHTML = 'Se ha producido un error';
      }
    });
};