import MenuTemplate from '../../templates/partials/menu';

class Menu {
    constructor(linkName) {
        this.linkName = linkName;
    }

    menuOpen() {

        let _this = this;

        this.menuIcon = document.querySelector('.menu-i');
        this.menuBg = document.querySelector('.menu-open');
        this.menuCont = document.querySelector('.menu-content');
        this.menuLinks = document.querySelector('.menu-list');
        this.allLinks = document.querySelectorAll('.menu-link');
        this.links = document.querySelector('.menu-ul');
        this.containerCategory = document.querySelector('.categoryConteiner');

        this.allLinks[0].setAttribute('linkName', 'card');
        for (let i = 0; i < this.allLinks.length - 1; i++) {
            this.allLinks[i + 1].setAttribute('linkName', this.linkName[i].id);
        }

        this.menuIcon.addEventListener('click', () => {
            // animationmenu icon
            document.querySelectorAll('.circle-right').forEach(function(el) {
                el.classList.toggle('right-86');
            });
            document.querySelector('.circle-left').classList.toggle('left-86');
            document.querySelectorAll('.rect-left').forEach(function(el) {
                el.classList.toggle('left-22');
            });
            document.querySelector('.rect-right').classList.toggle('right-22');
            document.querySelectorAll('rect').forEach(function(el) {
                el.classList.toggle('fill-white');
            }); // animation menu bg

            _this.menuBg.classList.toggle('none');

            document.body.classList.toggle('scroll-disable');

            _this.menuBg.classList.toggle('transparent-menu-open');
            _this.menuCont.classList.toggle('transformX-menu-list');
            _this.menuLinks.classList.toggle('transformX-menu-list');
        });

        return _this;
    }

    menuPush() {
        let _this = this;

        this.links.addEventListener('click',e => {

            if (e.target.classList.contains('menu-link')) {
                if (e.target.getAttribute('linkName') === 'card') {
                    location.hash = '#/card';
                } else {
                    location.hash = `#/card/${e.target.getAttribute('linkName')}`;
                }
                _this.closeMenu();
            }
        });

        return _this;
    }

    closeMenu() {
        // animationmenu icon
        document.querySelectorAll('.circle-right').forEach(el =>
            el.classList.toggle('right-86'));
        document.querySelector('.circle-left').classList.toggle('left-86');
        document.querySelectorAll('.rect-left').forEach(el =>
            el.classList.toggle('left-22'));
        document.querySelector('.rect-right').classList.toggle('right-22');
        document.querySelectorAll('rect').forEach(el =>
            el.classList.toggle('fill-white')); // animation menu bg


        this.menuBg.classList.toggle('none');
        document.body.classList.toggle('scroll-disable');
        this.menuBg.classList.toggle('transparent-menu-open');
        this.menuCont.classList.toggle('transformX-menu-list');
        this.menuLinks.classList.toggle('transformX-menu-list');
    }

    createMenu() {
        document.getElementsByClassName('header')[0].innerHTML += MenuTemplate();
        return this;
    }
}

export default Menu;