import
{
  singInLogin, signInFacebook, signInGoogle, userCurrent,
}
  from '../module/controllerdata.js';

// AUTENTIFICACION CON CORREO REGISTRADO
export const singInLoginClick = (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const menssageErrorLogin = document.getElementById('txt-message-error-login');
  return singInLogin(email, password)
    .then(() => {
      menssageErrorLogin.classList.remove('show-message-error');
      menssageErrorLogin.innerHTML = '';
      window.location.hash = '#/home';
    })
    .catch((error) => {
      menssageErrorLogin.classList.add('show-message-error');
      switch (error.code) {
        case 'auth/user-not-found':
          menssageErrorLogin.innerHTML = 'Usuario no registrado';
          break;
        case 'auth/wrong-password':
          menssageErrorLogin.innerHTML = 'Contraseña incorrecta';
          break;
        case 'auth/invalid-email':
          menssageErrorLogin.innerHTML = 'No se ingresó ningún correo electrónico';
          break;
        default:
          menssageErrorLogin.innerHTML = 'Se ha producido un error';
      }
    });
};

// AUTENTIFICACION CON CUENTA DE FACEBOOK
export const signInFacebookClick = (event) => {
  event.preventDefault();
  signInFacebook()
    .then(() => {
      const user = userCurrent();
      firebase.firestore().collection('users').doc(user.uid).set({
        idUsuario: user.uid,
        Nombre: user.displayName,
        Email: user.email,
      });
      window.location.hash = '#/home';
    }).catch((error) => {
      // Manejar errores aquí.
      const errorCode = error.code;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        // console.log('es el mismo usuario');
      }
    });
};

// AUTENTIFICACION CON CUENTA DE GOOGLE
export const signInGoogleClick = (event) => {
  event.preventDefault();
  return signInGoogle()
    .then(() => {
      const user = userCurrent();
      // console.log(user);
      firebase.firestore().collection('users').doc(user.uid).set({
        idUsuario: user.uid,
        Nombre: user.displayName,
        Email: user.email,
      });
      window.location.hash = '#/home';
    }).catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        // console.log('es el mismo usuario');
      }
    });
};

// CERRAR SESION
// export const logOutOnClick = (event) => {
//   event.preventDefault();
//   logOut()
//     .then(() => {
//       window.location.hash = '#/';
//     });
// };

export const showPassword = () => {
  const typePass = document.querySelector('#password');
  if (typePass.type === 'password') {
    typePass.type = 'text';
  } else {
    typePass.type = 'password';
  }
};
