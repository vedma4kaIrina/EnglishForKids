import Component from '../../views/component';
import Menu from '../../models/Menu';
import SwitchCheck from '../../models/Switch';
import Cards from '../../models/card';

import CardTemplate from '../../../templates/pages/cards/play';

class Play extends Component {
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
                ${this.cards.find(card => card.id === this.request.id).cardsChildren.map(card => CardTemplate({card}))}
            `);
        });
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        let _this = this;
        this.menu = new Menu(this.cards).createMenu();
        this.switchCheckbox = new SwitchCheck().createSwitch().getSwitchCheckFromLS();
        this.menu.menuOpen().menuPush();
        this.switchCheckbox.switchClick();

        if (!this.switchCheckbox.defaultisTrain.isTrain) {
            this.switchCheckbox.loadPage();
        }

        this.cardsContainer = document.getElementsByClassName('cards')[0];
        this.cardsContainer.onclick = function(event)  {

            const target = event.target,
                targetClassList = target.classList;

            if (_this.switchCheckbox.defaultisTrain.isTrain) {

                switch (true) {
                    case targetClassList.contains('img-card'):
                    case targetClassList.contains('description'):
                        event.stopPropagation();
                        _this.playWord(target.parentNode.parentNode);
                        break;

                    case targetClassList.contains('description-string'):
                        event.stopPropagation();
                        _this.playWord(target.parentNode.parentNode.parentNode);
                        break;

                    case targetClassList.contains('description-title'):
                        event.stopPropagation();
                        _this.playWord(target.parentNode.parentNode.parentNode.parentNode);
                        break;

                    case targetClassList.contains('arrow'):
                        event.stopPropagation();
                        _this.clickRotate(target.parentNode.parentNode.parentNode.parentNode);
                        break;

                }
            } else {
                switch (true) {
                    case targetClassList.contains('img-card'):
                    case targetClassList.contains('description'):

                        event.stopPropagation();
                        if (document.getElementsByClassName('button-repeat').length
                            && !target.parentNode.classList.contains('back')) {
                            _this.checkWord(target.parentNode.parentNode);
                            break;
                        }

                }
            }
        };
    }

    checkWord(word) {

        if (this.switchCheckbox.arrayRandom[this.switchCheckbox.currentItem].id === word.dataset.id) {

            this.audioPlayYes();

            this.switchCheckbox.correctAnswers++;
            this.switchCheckbox.currentItem++;

            word.classList.add('inactive');

            if (this.switchCheckbox.currentItem === this.switchCheckbox.arrayRandom.length) {

                if (this.switchCheckbox.incorrectAnswer > 0){
                    this.audioPlayBad();
                    this.cardsContainer.innerHTML = `
                        <div class="exellent-container">
                            <img src="../../../img/bad.svg" alt="" class="exellent">
                        </div>`;
                    this.addResult();
                    this.switchCheckbox.currentItem = 0;
                    this.switchCheckbox.incorrectAnswer = 0;
                    this.switchCheckbox.arrayRandom = [];

                } else {
                    this.audioPlayGood();
                    this.cardsContainer.innerHTML = `
                        <div class="exellent-container">
                            <img src="../../../img/exellent.svg" alt="" class="exellent">
                        </div>`;
                }
                setTimeout(this.redirectToCard, 5500);
            } else {
                this.switchCheckbox.startGame();
            }
        } else {
            this.switchCheckbox.incorrectAnswer++;
            this.audioPlayNO();
        }
    }

    playWord(cardContainer) {
        new Audio(`../../../${cardContainer.dataset.audio}`).play();
    }

    audioPlayNO() {
        new Audio('../../../audio/error.mp3').play();
    }

    audioPlayYes() {
        new Audio('../../../audio/correct.mp3').play();
    }

    audioPlayGood() {
        new Audio('../../../audio/exellent.mp3').play();
    }

    audioPlayBad() {
        new Audio('../../../audio/bad.mp3').play();
    }

    addResult() {
        this.result = document.createElement('div');
        this.result.classList.add('result');
        this.result.innerHTML = ''.concat(this.switchCheckbox.incorrectAnswer, ' mistakes');
        document.querySelector('.exellent-container').append(this.result);
    }

    clickRotate(frontContainer) {

        frontContainer.classList.add('front-rotate');
        frontContainer.nextElementSibling.classList.add('back-rotate');

        frontContainer.parentNode.addEventListener('mouseleave', () => {
            frontContainer.classList.remove('front-rotate');
            frontContainer.nextElementSibling.classList.remove('back-rotate');
        });
    }

    redirectToCard() {
        location.hash = '#/card';
    }
}

export default Play;