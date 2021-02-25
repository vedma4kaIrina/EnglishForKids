import Component from '../../views/component';
import Cards from '../../models/card';
import Menu from '../../models/Menu';
import SwitchCheck from '../../models/Switch';

import CardsTemplate from '../../../templates/pages/cards/main';

class Main extends Component {
    constructor() {
        super();
        this.model = new Cards();
    }

    getData() {
        return new Promise(resolve => this.model.getCardsList().then(cards => resolve(cards)));
    }

    render(cards) {
        this.cards = cards;
        return new Promise(resolve => {

            resolve(`
                ${cards.map(card => CardsTemplate({card}))}
            `);
        });

    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        this.menu = new Menu(this.cards).createMenu();
        this.switchCheckbox = new SwitchCheck().createSwitch().getSwitchCheckFromLS();
        this.menu.menuOpen().menuPush();
        this.switchCheckbox.switchClick();

        if (!this.switchCheckbox.defaultisTrain.isTrain) {
            this.switchCheckbox.loadPage();
        }

        const cardsContainer = document.getElementsByClassName('categoryConteiner')[0];
        cardsContainer.addEventListener('click', event => {
            const target = event.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('img-card'):
                case targetClassList.contains('task__title'):
                case targetClassList.contains('statusDone'):
                    this.redirectToTaskInfo(target.dataset.id);
                    break;
            }
        });
    }

    redirectToTaskInfo(id) {
        location.hash = `#/card/${id}`;
    }

}

export default Main;