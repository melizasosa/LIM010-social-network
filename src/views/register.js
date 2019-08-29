import { functionRegisterClick } from '../controller/register-controller.js';

export default () => {
  const containerToRegister = document.createElement('div');
  containerToRegister.className = 'container column  container-register';

  const templateRegister = `
    <div class="cover-page-imagen two-column center-items">
    </div>
    <div class="center-items two-column  flex-c">
      <div class="title-form column">
        <img  class="logo" src="img/easyStart.png" alt="logo easy start"><a href="#"></a>
        <h2 >Crear tu cuenta de Easy Start</h2>
        <form class="flex-c center-items" action="">
          <input class="input-login" id="txt-name-register" type="email" placeholder="Usuario" required>
          <input class="input-login" id="txt-email-register" type="text" placeholder="Email">
          <input class="input-login" id="txt-password-register" type="password" placeholder="Password">
          <label class="error-registra" id="txt-message-error-register"></label>
          <button class="btn-login" id="btn-toRegister" >Registrar</button>
          <a class="" href="#/"><span id="register" class="bold">Iniciar Sesión</span></a>
        </form>
      </div>
    </div>`;
  containerToRegister.innerHTML = templateRegister;
  containerToRegister.setAttribute('class', 'two-column flex-r');
  const btnToRegister = containerToRegister.querySelector('#btn-toRegister');
  btnToRegister.addEventListener('click', functionRegisterClick);
  return containerToRegister;
};