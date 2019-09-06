import { functionSharePost } from '../controller/post-controller.js';
import { listPosts } from './post.js';
import { dataUser } from '../controller/register-controller.js';

export default (allPost) => {
  const containerHome = document.createElement('div');
  const templateHome = `
      <header>
        <div class="contenedor-header">
          <h1>Easy Start</h1>
          <input type="checkbox" id="menu-bar">
          <label for="menu-bar"><i class="fas fa-bars"></i></label>
          <nav class="menu">
            <a href="" id="name-menu"></a>
            <a href="#/">Cerrar Sesion</a>
          </nav>
        </div>
      </header>   
    <div class="two-column flex-r ">
      <div class="column-post wall-feed margin-left" >
      <div class="form-post border-perfil">
        <img class="foto-user" id="foto" src="./img/logo-user.png" />
        <div class="datos">
          <label  id="name" for="name"></label>
          <label id="correo" for="name"></label>
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
  const userName = containerHome.querySelector('#name');
  const userNameMenu = containerHome.querySelector('#name-menu');
  const userCorreo = containerHome.querySelector('#correo');

  // const btnLogOut = containerHome.querySelector('#logout');
  dataUser(userName, userCorreo, userNameMenu);

  // Imprimir todo las publicaciones dinamicamente
  const containerListPost = containerHome.querySelector('#container-list-post');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < allPost.length; i++) {
    containerListPost.appendChild(listPosts(allPost[i]));
  }

  // Publicar post
  const btnSharePost = containerHome.querySelector('#btn-share-post');
  btnSharePost.addEventListener('click', functionSharePost);

  return containerHome;
};
