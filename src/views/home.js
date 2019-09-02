//import { logOutOnClick } from '../controller/login-controller.js';
import { functionSharePost } from '../controller/post-controller.js';
import { listPosts } from './post.js';
import { userCurrent } from '../module/controllerdata.js';
//import { listCommentPost } from './post-comment.js';


export default (allPost) => {

 
  const containerHome = document.createElement('div');
  const templateHome = `
      <header>
        <div class="contenedor-header">
          <h1>Easy Start</h1>
          <input type="checkbox" id="menu-bar">
          <label for="menu-bar"><i class="fas fa-bars"></i></label>
          <nav class="menu">
            <a href="">${userCurrent().displayName}</a>
            <a href="#/">Cesar Sesion</a>
          </nav>
        </div>
      </header>   
    <div class="two-column flex-r">
      <div class="column-post wall-feed margin-left" >
      <div class="form-post border-perfil">
        <img class="foto-user" id="foto" src="${userCurrent().photoURL}" />
        <div class="datos">
          <label  id="name" for="name">${userCurrent().displayName}</label>
          <label id="correo" for="name">${userCurrent().email}</label>
        </div>
        </div>
      </div>
      <div class="column-post wall-feed margin-left">
      <div class="wall-feed margin-left " >
        <div class="form-post">
          <form>
          <textarea  type="text" id="txt-new-post" class="input-post" placeholder="¿Qué quieres compartir?"></textarea>  
          </form>
          <div class="btn-comment">
            <form class="btn-comment-right">
              <img src="" class="">
              <select id="post-state" class="privacy">
                <option value="Privado" class="font-weight-privacy">Privado</option>
                <option value="Público" class="font-weight-privacy">Público</option>
              </select>
              <button id="btn-share-post" class="btn-post btn-compartir">Compartir</button>
            </form>
          </div>
        </div>
      </div>
      <div class="wall-feed margin-left " id="container-list-post">
      </div>
    </div>`;
  containerHome.innerHTML = templateHome;
  // const divElem = document.createElement('div');
  // divElem.innerHTML = viewHome;
  const userName = containerHome.querySelector('#name');
  const userCorreo = containerHome.querySelector('#correo');

  //const btnLogOut = containerHome.querySelector('#logout');


  // Imprimir todo las publicaciones dinamicamente
  console.log(allPost);
  const containerListPost = containerHome.querySelector('#container-list-post');
  for (let i = 0; i < allPost.length; i++) {
    containerListPost.appendChild(listPosts(allPost[i]));
  }




  // Publicar post
  const btnSharePost = containerHome.querySelector('#btn-share-post');
  btnSharePost.addEventListener('click', functionSharePost);

  //   const btnLogout=nav.querySelector('#logout');
//   btnLogout.addEventListener('click', logOutOnClick);
  // btnLogOut.addEventListener('click', logOutOnClick);
  //obtenerInfo(userName, userCorreo); // pinta en el home esos datos de argumento
  
  return containerHome;
};