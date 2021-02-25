import '../styles/app';

import {parseRequestURL} from './helpers/utils';

import Main from './views/pages/main';
import Play from './views/pages/play';
import Error404 from './views/pages/error404';
import About from './views/pages/about';

const Routes = {
    '/': About,
    '/card': Main,
    '/card/:id': Play
};

function router() {
    const headerContainer = document.getElementsByClassName('header')[0],
        contentContainer = document.getElementsByClassName('categoryConteiner')[0],
        cardsContainer = document.getElementsByClassName('cards')[0],
        menuContent = document.getElementsByClassName('menu-content');

    menuContent[0].classList.remove('purple-bg');

    headerContainer.innerHTML = '';

    const request = parseRequestURL(),
        parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    page.getData().then(data => {
        page.render(data).then(html => {

            if (parsedURL === '/card/:id') {
                cardsContainer.innerHTML = html.replace(/,/g, '');
                contentContainer.innerHTML = '';
            } else {
                contentContainer.innerHTML = html.replace(/,/g, '');
                cardsContainer.innerHTML = '';
            }
            page.afterRender();
        });
    });

}
window.addEventListener('load', router);
window.addEventListener('hashchange', router);