import { deletePostClick, likePostClick, editPost1 } from '../controller/post-controller.js';
import { addCommentPost, userCurrent } from '../module/controllerdata.js';

export const listPosts = (data) => {
  const containerOnePost = document.createElement('div');

  // Convertir la fecha
  const fecha = new Date(data.timePost.toDate());
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const fechaPost = fecha.toLocaleDateString('es-ES', options);
  const horaPost = fecha.getHours();
  const minPost = fecha.getMinutes();

  if (data.privacity === 'Público' || userCurrent().uid === data.idUser) {
    const templateOnePost = `
      <div class='form-post1 container-list-post'>
        <div class='post-article post-head border-box bg-blue '>
          <h4 class='name-post'>${'Publicado Por '}${data.emailUser}</h4>
          <p clas='txt-date'>${fechaPost} ${' | '} ${horaPost} ${':'} ${minPost}</p>
          <p> <strong>${data.privacity}</strong></p>
          </div>
        
        <div class='form-post1'>
        <textarea class='' id='text-${data.id}'  disabled>${data.notes}</textarea>
        <select id="new-post-state" class="privacy btn-save">
          <option value="Privado">Privado</option>
          <option value="Público">Público</option>
        </select>
        </div>
        <div class='form-post1  container-btn-share'>
        <div >
          <button id='confirm-delete'><i class='fas fa-trash-alt'></i></button>
          <button id='edit-${data.id}' class='btn-share'><i class='fas fa-edit'></i>Editar</button>
          <button type='button' id='edit-post' class='btn-save'>Guardar</button>

          <button id='like-post'><i class='fab fa-gratipay'></i></button>
          <span id='like-count'>${data.like}</span>
        </div>



        <div id='confirm-delete-view' class='modal'>
          <div class='modal-content'>
            <p>¿Deseas eliminar la publicación?</p>
            <button id='delete-post-${data.id}' class='btn-edit'>Si</button>
            <button id='no-delete-post' class='btn-edit'>No</button>
          </div>
        </div>
        <!--<div id='text-edit-view' class='modal'>
          <div class='modal-content'>
            <button id='close-post'> &times </button>
            <button class='btn-edit' id='edit-post-${data.id}'>Guardar</button>
            <textarea id='text-edit' cols='60' rows='5'>${data.notes}</textarea>
          </div>
        </div>-->
        </div>
        <div id='comments' class='form-post1  '>
            <div class=''> 
              <input id='txt-comment' type='text' class='input-comment' placeholder='Escribe un comentario'>
              <button id='btn-comment' class='btn-post btn-compartir' type='button'> Comentar</button>
            </div>
            <div id='comment-post'></div>
          </div>        
      </div>`;
    containerOnePost.innerHTML = templateOnePost;
    const viewConfirmDelete = containerOnePost.querySelector('#confirm-delete-view');
    const confirmDeleted = containerOnePost.querySelector('#confirm-delete');
    confirmDeleted.addEventListener('click', () => {
      viewConfirmDelete.style.display = 'block';
    });

    // editar
    const btnEdit = containerOnePost.querySelector(`#edit-${data.id}`);
    const deletePost = containerOnePost.querySelector(`#delete-post-${data.id}`);
    if (userCurrent().uid === data.idUser) {
      btnEdit.addEventListener('click', () => {
        const btnSaveEdit = containerOnePost.querySelector('#edit-post');
        const newPostState = containerOnePost.querySelector('#new-post-state');
        btnSaveEdit.classList.remove('btn-save');
        btnEdit.classList.add('btn-save');
        newPostState.classList.remove('btn-save');
        const textArea = containerOnePost.querySelector(`#text-${data.id}`);
        // textArea.addEventListener('focus', () => {
        textArea.disabled = false;
        textArea.focus();
        btnSaveEdit.addEventListener('click', () => {
          editPost1(data.id, textArea.value, newPostState.value);
          btnSaveEdit.classList.remove('btn-save');
          btnEdit.classList.remove('btn-save');
          newPostState.classList.add('btn-save');
        });
      // });
      });

      deletePost.addEventListener('click', () => deletePostClick(data));
      const noDelete = containerOnePost.querySelector('#no-delete-post');
      noDelete.addEventListener('click', () => {
        viewConfirmDelete.style.display = 'none';
      });
    } else {
      btnEdit.classList.add('btn-save');
      confirmDeleted.classList.add('btn-save');
    }
    const postLike = {
      '#like-post': likePostClick,
    };
    Object.keys(postLike).forEach((element) => {
      const btnLikePost = containerOnePost.querySelector(element);
      btnLikePost.addEventListener('click', () => postLike[element](data));
    });
    // Agregar comentario en la sub coleccion
    const btnComment = containerOnePost.querySelector('#btn-comment');
    btnComment.addEventListener('click', () => {
      const txtComment = document.getElementById('txt-comment').value;
      addCommentPost(data.id, data.userName, txtComment)
        .then(() => {
          containerOnePost.querySelector('#txt-comment').value = '';
        });
    });
  }
  return containerOnePost;
};
