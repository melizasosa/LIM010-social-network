export const configFirebase = () => {
  const config = {
    apiKey: 'AIzaSyAY3VOT2W4EKd4wxEfo759lF2sjMk6Hy4I',
    authDomain: 'sweet-diet-5c3e2.firebaseapp.com',
    databaseURL: 'https://sweet-diet-5c3e2.firebaseio.com',
    projectId: 'sweet-diet-5c3e2',
    storageBucket: '',
    messagingSenderId: '114566620755',
    appId: '1:114566620755:web:0b0b489f58560e4e',
  };
  // Initialize Firebase
  firebase.initializeApp(config);
};
