import Component from '../../views/component.js';
import Cards from '../../models/card.js';
import Menu from '../../models/Menu.js';
import SwitchCheck from '../../models/Switch.js';

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
                ${cards.map(card => this.createCard(card))}
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

    createCard(card) {

        return `
        <div class="card" data-id=${card.id}">
            <div class="front">
                <div class="img-card" data-id=${card.id} style="background-image: url('../../../img/${card.image}')"></div>
                <div class="description">
                    <div class="description-string">
                        <div class="description-title">${card.word}</div>
                    </div>
                    <div class="description-string">
                        <div class="description-amount">8 cards</div>
                        <div class="condition-wrapper">
                            <div class="condition"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="back">
                <div class="img-card" style="background-image: url('../../../img/${card.image}')"></div>
                <div class="description">
                    <div class="description-string">
                        <div class="description-title">${card.translation}</div>
                    </div>
                    <div class="description-string">
                        <div class="description-amount">8 cards</div>
                        <div class="condition-wrapper">
                            <div class="condition"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

export default Main;