class SwitchCheck {
    constructor() {
        this.arrayRandom = [];
        this.defaultisTrain = {isTrain :true};
        this.currentItem = 0;
        this.correctAnswers = 0;
        this.incorrectAnswer = 0;
        this.startGame = this.startGame.bind(this);
    }

    switchClick() {
        let _this = this;

        this.trainPlay = document.querySelector('.checkbox');
        this.trainMode = document.querySelector('.train');
        this.playMode = document.querySelector('.play');
        this.category = document.querySelectorAll('.condition');
        this.menuBg = document.querySelector('.menu-content');
        this.cardsSwitch = document.getElementsByClassName('cards')[0];

        this.trainPlay.onclick = function() {

            _this.trainMode.classList.toggle('none');
            _this.playMode.classList.toggle('none');
            _this.menuBg.classList.toggle('purple-bg');
            _this.defaultisTrain.isTrain = !_this.defaultisTrain.isTrain;

            SwitchCheck.setSwitchCheckFromLS({isTrain : _this.defaultisTrain.isTrain});

            let m = document.querySelectorAll('.inactive');
            for (let i = 0; i < m.length; i++){
                m[i].classList.remove('inactive');
            }

            _this.chageMenuBg();

        };

        return _this;
    }

    loadPage() {
        this.chageMenuBg();
        this.trainPlay.checked = true;
        this.trainMode.classList.toggle('none');
        this.playMode.classList.toggle('none');

        this.menuBg = document.querySelector('.menu-content');

        this.menuBg.classList.toggle('purple-bg');

    }

    chageMenuBg() {
        this.category = document.querySelectorAll('.condition');
        this.category.forEach(el => el.classList.toggle('purple'));
        if (this.cardsSwitch.children.length > 0){
            this.showButton();
        }
    }

    showButton() {

        const imgCard = document.querySelectorAll('.img-card'),
            description = document.querySelectorAll('.description');

        if (!this.defaultisTrain.isTrain) {

            const addButton = document.createElement('div');

            this.arrayRandom = [];
            this.currentItem = 0;

            for (let i = 0; i < this.cardsSwitch.children.length; i++) {
                this.arrayRandom.push({audio: this.cardsSwitch.children[i].dataset.audio, id: this.cardsSwitch.children[i].dataset.id});
            }
            this.arrayRandom.sort(() => Math.random() - 0.5);

            addButton.classList.add('start');
            addButton.innerHTML = `
                <div class="button-start">
                    <div class="circle" style="background-image: url();">
                        <img src="../../img/arrow-but.svg" alt="" class="arrow-but">
                    </div>
                    <span class="button-text">ST\u0410RT</span>
                </div>`;
            imgCard.forEach(el => el.classList.toggle('height100'));
            description.forEach(el => el.classList.toggle('none'));
            this.cardsSwitch.appendChild(addButton);
            addButton.addEventListener('click', this.repeatButton);
            addButton.addEventListener('click', this.startGame);

        } else {
            const buttonStart = document.getElementsByClassName('start');
            if (buttonStart.length) buttonStart[0].remove();
            imgCard.forEach(el => el.classList.toggle('height100'));
            description.forEach(el => el.classList.toggle('none'));

        }
    }

    repeatButton() {
        this.firstElementChild.classList.add('button-repeat');

        let circle = document.querySelector('.circle');
        circle.classList.add('circle-repeat');
        circle.innerHTML = '<img src="../../img/arrow-repeat.svg" class="repeat-but">';

        let text = document.querySelector('.button-text');
        text.innerText = '';
        circle.classList.add('circle-rep');
    }

    startGame() {

        const buttonStart = document.getElementsByClassName('start')[0];

        buttonStart.removeEventListener('click', this.startGame);

        this.repeatListener(buttonStart);
    }

    repeatListener(thisButton) {
        let _this = this;

        if (this.currentItem < this.arrayRandom.length) {
            this.audioPlay(_this.arrayRandom[_this.currentItem].audio);
            thisButton.onclick = function() {
                _this.audioPlay(_this.arrayRandom[_this.currentItem].audio);
            };
        }
    }

    audioPlay(cardContainer){
        let audio = new Audio(`../../${cardContainer}`);
        audio.play();
    }

    getSwitchCheckFromLS() {
        this.defaultisTrain = JSON.parse(localStorage.getItem('check')) || this.defaultisTrain && SwitchCheck.setSwitchCheckFromLS(this.defaultisTrain);
        return this;
    }

    static setSwitchCheckFromLS(check) {
        localStorage.setItem('check', JSON.stringify(check));
    }

    createSwitch() {

        document.getElementsByClassName('header')[0].innerHTML += `
                <div class="switch">
                <input type="checkbox" class="checkbox" id="checkbox">
                <label for="checkbox" class="checkbox-label"></label>
                <span class="train">Train</span>
                <span class="play none">Play</span>
                <span class="switch-bg"></span>
                </div>`;
        return this;
    }
}

export default SwitchCheck;
