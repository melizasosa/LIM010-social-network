// Autentificación
export const functionRegister = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};
export const singInLogin = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};
export const signInFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const logOut = () => firebase.auth().signOut();

export const userCurrent = () => firebase.auth().currentUser;


// Post
export const addPost = (newPost, id, userNombre, postState) => firebase.firestore().collection('posts').add({
  notes: newPost,
  user: id,
  userName: userNombre,
  privacity: postState,
  like: 0,
  timePost: new Date(),
});

export const getPost = (callback) => {
  firebase.firestore().collection('posts').orderBy('timePost','desc')
    .onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      callback(data);
    });
};
//Eliminar Publicación
export const deletePost = (id) => {
  return firebase.firestore().collection('posts').doc(id).delete();
};
// Editar Publicación
export const editPost = (id, newTextPost) => {
  return firebase.firestore().collection('posts').doc(id).update({
    notes: newTextPost,
  });
};
// Likes y Contador
export const likesPost = (id) => firebase.firestore().collection('posts').doc(id).get();//get() para recuperar el contenido de un elemento 
export const likesPostCount = (id, likes) => {
  return firebase.firestore().collection('posts').doc(id).update({
    like: likes += 1,
  });
};

// agregar comentario
export const addCommentPost = (idPost, id,text) => {
  firebase.firestore().collection('comment').add({
  idPost: idPost,
  idUsuario: id,
  comment: text
});
};

// export const addPost = (newPost, id, userNombre, postState) => {
//   return firebase.firestore().collection('posts').add({
//     notes: newPost,
//     user: id,
//     userName: userNombre,
//     privacity: postState,
//     like: 0,
//     timePost: firebase.firestore.FieldValue.timePost(),//Devuelve un centinela para usar con set()o update()para incluir una marca de tiempo generada por el servidor en los datos escritos
//   });
// };

// const addComment = (text, email, postId, id, date) => firebase.firestore().collection('Posts').doc(postId).collection('comment')
//   .add({
//     comentario: text,
//     correo: email,
//     idPost: postId,
//     idUsuario: id,
//     time: date,
//   });
