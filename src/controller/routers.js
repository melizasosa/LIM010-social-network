import { components } from '../views/components.js';
import { getPost } from '../module/controllerdata.js';

// rutas
export const changeView = (routers) => {
  const containerGlobal = document.getElementById('container-global');
  containerGlobal.innerHTML = '';
  switch (routers) {
    case '#/': containerGlobal.appendChild(components.login());
      break;
    case '#/register': containerGlobal.appendChild(components.register());
      break;
    case '#/home':
      // eslint-disable-next-line no-case-declarations
      const callback = (objData) => {
        containerGlobal.innerHTML = '';
        containerGlobal.appendChild(components.home(objData));
      };
      getPost(callback);
      break;
    case '#/profile': containerGlobal.appendChild(components.profile());
      break;
    default: containerGlobal.appendChild(components.login());
      break;
  }
};
