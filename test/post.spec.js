import MockFirebase from 'mock-cloud-firestore';
import {
  addPost, getPost, deletePost, editPost,
} from '../src/module/controllerdata.js';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        1234: {
          notes: 'Bienvenido emprendedor',
          idUser: '12345',
          privacity: 'privado',
          emailUser: 's.m.meliza@gmail.com',
          like: '0',
        },
        1235: {
          notes: 'Nuevas ideas para tu negocio',
          idUser: '67891',
          privacity: 'publico',
          emailUser: 'karim@gmail.com',
          like: '0',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('lista de posts', () => {
  it('Debería poder agregar un post', done => addPost('hola Meliza', '23456', 'public', 'meliza@gmail.com', '0')
    .then(() => getPost(
      (data) => {
        const result = data.find(posts => posts.notes === 'hola Meliza');
        expect(result.notes).toBe('hola Meliza');
        done();
      },
    )));
});

// TEST DE ELIMINAR POST
describe('delete post', () => {
  it('Debería poder eliminar el post con el id: 1235', done => deletePost('1235')
    .then(() => getPost(
      (data) => {
        const result = data.find(posts => posts.id === '1235');
        expect(result).toBe(undefined);
        done();
      },
    )));
});

// TEST DE EDITAR POST
describe('edit post', () => {
  it('Debería poder editar post con id:1234', done => editPost('1234', '¿que tipo de empresa tiene?', 'privado')
    .then(() => getPost(
      (data) => {
        const result = data.find(posts => posts.notes === '¿que tipo de empresa tiene?');
        expect(result.notes).toBe('¿que tipo de empresa tiene?', 'privado');
        done();
      },
    )));
});
