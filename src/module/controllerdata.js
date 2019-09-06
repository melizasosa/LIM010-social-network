// Autentificación
// eslint-disable-next-line max-len
export const functionRegister = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);
// eslint-disable-next-line max-len
export const singInLogin = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);
export const signInFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

// export const logOut = () => firebase.auth().signOut();

export const userCurrent = () => firebase.auth().currentUser;

// guardamos los datos del usuario en la bd
export const createUser = (id, name, email) => {
  firebase.firestore().collection('users').doc(id).set({
    idUsuario: id,
    Nombre: name,
    Email: email,
  });
};

// Post
export const addPost = (newPost, id, postState, email, likes) => firebase.firestore().collection('posts').add({
  notes: newPost,
  idUser: id,
  privacity: postState,
  emailUser: email,
  like: likes,
  timePost: new Date(),
});

export const getPost = (callback) => {
  firebase.firestore().collection('posts').orderBy('timePost', 'desc')
    .onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      callback(data);
    });
};
// Eliminar Publicación
export const deletePost = id => firebase.firestore().collection('posts').doc(id).delete();
// Editar Publicación
export const editPost = (idPost, newTextPost, newPostState) => {
  const obj = {
    notes: newTextPost,
    privacity: newPostState,
  };
  return firebase.firestore().collection('posts').doc(idPost).update(obj);
};
// Likes y Contador

export const likesPost = id => firebase.firestore().collection('posts').doc(id).get();

export const likesPostCount = (id, likes) => {
  let likesPosts = likes;
  const obj = {
    like: likesPosts += 1,
  };
  return firebase.firestore().collection('posts').doc(id).update(obj);
};

// agregar comentario
export const addCommentPost = (idPost, id, text) => {
  firebase.firestore().collection('comment').add({
    idPost,
    idUsuario: id,
    comment: text,
  });
};
