// configuracion de mock de firebase
// iniciando tests
import {
  singInLogin, signInFacebook, signInGoogle, functionRegister, logOut,
} from '../src/module/controllerdata.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockdatabase = new firebasemock.MockFirebase();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  path => (path ? mockdatabase.child(path) : null),
  () => mockauth,
);

// Registro
describe('registro', () => {
  it('Deberia poder registrarse', () => functionRegister('laboratoria@lab.com', '123456789')
    .then((user) => {
      expect(user.email).toBe('laboratoria@lab.com');
    }));
});

// Iniciar sesión
describe('inicio de sesion', () => {
  it('Debería poder iniciar sesion', () => singInLogin('laboratoria@hotmail.la', '123456')
    .then((user) => {
      expect(user.email).toBe('laboratoria@hotmail.la');
    }));
});

// Iniciar sesión con facebook
describe('sesion iniciada', () => {
  it('Deberia poder iniciar sesion con Facebook', () => signInFacebook()
    .then(() => {
      expect('').toBe('');
    }));
});

// Iniicar sesión con google
// eslint-disable-next-line jest/no-identical-title
describe('sesion iniciada', () => {
  it('Deberia poder iniciar sesion con Google', () => signInGoogle()
    .then(() => {
      expect('').toBe('');
    }));
});

// Cerrar sesión
describe('Sesión Cerrada', () => {
  it('Debería Cerrar Sesión', () => logOut()
    .then(() => {
      expect(firebase.auth().currentUser).toBe(null);
    }));
});
