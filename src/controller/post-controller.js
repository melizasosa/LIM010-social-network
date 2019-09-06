import {
  userCurrent, addPost, deletePost, editPost, likesPost, likesPostCount,
} from '../module/controllerdata.js';

// agregar un post en la bd
export const functionSharePost = (event) => {
  event.preventDefault();
  const txtPost = document.getElementById('txt-new-post').value;
  const postState = document.getElementById('post-state').value;

  const user = userCurrent();
  const countLike = 0;
  addPost(txtPost, user.uid, postState, user.email, countLike)
    .then(() => {
      document.getElementById('txt-new-post').value = '';
    });
};

// editar
export const editPost1 = (idPost, newtextPost, newPostState) => {
  editPost(idPost, newtextPost, newPostState)
    .then(() => {
    // console.log('Document written with ID: ', docRef.id);
    }).catch(() => {
    // console.error('Error adding document: ', error);
    });
};

// Eliminar Post
export const deletePostClick = (id) => {
  deletePost(id.id)
    .then(() => {
      // console.log('Document written with ID: ', docRef.id);
    }).catch(() => {
      // console.error('Error adding document: ', error);
    });
};

// Likes de Post
export const likePostClick = (id) => {
  likesPost(id.id)
    .then((result) => {
      const seeCount = result.data().like;
      return seeCount;
    }).catch(() => {});
  const likePostCountshow = document.getElementById('like-count');
  likePostCountshow.innerHTML = likesPostCount(id.id, id.like);
};

// export const postUser = (content1) => {
//   const contentPost = content1.querySelector('#content-post');
//   firebase.auth().onAuthStateChanged((user) => {
//       showPostUser((myPostnotes) => {
//       contentPost.innerHTML = '';
//       contentPost.appendChild(myPost(myPostnotes));
//     });
//   });
// };

// // agregar un comentario en la bd
// export const functionShareComment = (event) => {
//   event.preventDefault();
//   const txtComment = document.getElementById('txt-comment').value;
//   const user = userCurrent();
//   addCommentPost (txtComment, user.uid)
//     .then(() => {
//       document.getElementById('txt-comment').value = '';
//       alert('comment agregado');
// });
// };
