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
        document.getElementsByClassName('header')[0].innerHTML += `
        <div class="menu">
                <div class="menu-i">
                    <div class="menu-line">
                        <!-- rectangle -->
                        <svg class="rect-left" width="30" height="5" viewbox="0 0 30 5" xmlns="http://www.w3.org/2000/svg">
                            <rect class="" width="30" height="5" rx="2.5" fill="#7033FF" />
                        </svg>
                        <!-- circle -->
                        <svg class="circle-right" width="5" height="5" viewbox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">
                            <rect class="" width="5" height="5" rx="2.5" fill="#FFBC29" />
                        </svg>
                    </div>
                    <div class="menu-line">
                        <!-- circle -->
                        <svg class="circle-left" width="5" height="5" viewbox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">
                            <rect class="" width="5" height="5" rx="2.5" fill="#7033FF" />
                        </svg>
                        <!-- rectangle -->
                        <svg class="rect-right" width="30" height="5" viewbox="0 0 30 5" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <rect class="" width="30" height="5" rx="2.5" fill="#FF6024" />
                        </svg>
                    </div>
                    <!-- rectangle -->
                    <div class="menu-line">
                        <svg class="rect-left" width="30" height="5" viewbox="0 0 30 5" fill="#FF6024"  xmlns="http://www.w3.org/2000/svg">
                            <rect class="" width="30" height="5" rx="2.5" fill="#FFBC29" />
                        </svg>
                        <!-- circle -->
                        <svg class="circle-right" width="5" height="5" viewbox="0 0 5 5" fill="#FF6024"  xmlns="http://www.w3.org/2000/svg">
                            <rect class="" width="5" height="5" rx="2.5" fill="#FF6024" />
                        </svg>
                    </div>
                </div>
                <!-- <img src="assets/img/menu.svg" class="menu-icon"> -->
                <div class="menu-list">
                    <ul class="menu-ul">
                        <li class="menu-link" linkName = "m">Main Page</li>
                        <li class="menu-link" linkName = "0">Fairytales</li>
                        <li class="menu-link" linkName = "1">Animals 1</li>
                        <li class="menu-link" linkName = "2">Animals 2</li>
                        <li class="menu-link" linkName = "3">Animals 3</li>
                        <li class="menu-link" linkName = "4">Food 1</li>
                        <li class="menu-link" linkName = "5">Food 2</li>
                        <li class="menu-link" linkName = "6">Emotions</li>
                        <li class="menu-link" linkName = "7">Places</li>
                    </ul>
                </div>
            </div>`;
        return this;
    }
}

export default Menu;