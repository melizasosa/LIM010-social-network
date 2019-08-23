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


export const addPost = (newPost, id, userNombre, privacyUser) => {
  return firebase.firestore().collection('posts').add({
    notes: newPost,
    user: id,
    userName: userNombre,
    privacity: privacyUser,
   // timePost: (new Date()).toLocaleDateString(),
  });
};

export const getPost = (callback) => {
  firebase.firestore().collection('posts')
    .onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      callback(data);
    });
};
