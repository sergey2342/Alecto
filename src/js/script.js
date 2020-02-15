window.addEventListener('DOMContentLoaded', ()=> {
    'use strict';

    // Кнопка ScrollDown

    let scroll = document.getElementById('scroll'),
        divScroll = document.querySelector('.main__scroll'),
        main = document.getElementById('main'),
        feature = document.getElementById('feature');

    scroll.addEventListener('click', () => {
        feature.scrollIntoView({behavior: "smooth"});
    });

    // Плавный скролл между якорями

    $(document).ready(function(){
        $("#menu").on("click","a", function (event) {
            event.preventDefault();
            var id  = $(this).attr('href'),
                top = $(id).offset().top;
            $('body,html').animate({scrollTop: top}, 1000);
        });
    });

    // Кнопка ScrollUp

    let scrollUp = document.getElementById('scroll-up');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset <= 800) {
            scrollUp.classList.add('fadeOutDown');
            scrollUp.classList.remove('fadeInUp');
            scrollUp.addEventListener('animationend', ()=> {
                scrollUp.style.display = 'none';
            });
        } else if (window.pageYOffset > 800) {
            scrollUp.style.display = 'block';
            scrollUp.classList.remove('fadeOutDown');
            scrollUp.classList.add('fadeInUp');
            scrollUp.addEventListener('animationend', ()=> {
                scrollUp.style.display = 'block';
            });
        }
    });

    scrollUp.addEventListener('click', () => {
       main.scrollIntoView({behavior: "smooth"});
    });

    // Hamburger

    let hamburger = document.getElementById('hamburger'),
        hamburgerI = document.querySelectorAll('i')[5],
        headerMenu = document.querySelector('ul');
        
    hamburger.addEventListener('click', ()=> {
        let bars = hamburgerI.classList.contains('fa-bars'),
            times = hamburgerI.classList.contains('fa-times');

        if (bars === true) {
            hamburgerI.classList.remove('fa-bars');
            hamburgerI.classList.add('fa-times');
            headerMenu.style.display = 'flex';
            headerMenu.style.top = '-142px';

            window.addEventListener('resize', () => {
                if (window.innerWidth <= 767) {
                    headerMenu.style.top = '-142px';
                } else if (window.innerWidth > 767) {
                    headerMenu.style.top = '';
                }
            });
        } else if (times === true) {
            hamburgerI.classList.add('fa-bars');
            hamburgerI.classList.remove('fa-times');
            headerMenu.style.display = 'flex';
            headerMenu.style.top = '-462px';

            window.addEventListener('resize', () => {
                if (window.innerWidth <= 767) {
                    headerMenu.style.top = '-462px';
                } else if (window.innerWidth > 767) {
                    headerMenu.style.top = '';
                }
            });
        }
    });
    
    window.addEventListener('resize', ()=> {
        if (window.innerWidth <= 767) {
            hamburger.style.display = 'block';
            headerMenu.style.display = 'flex';
        } else if (window.innerWidth > 767) {
            hamburger.style.display = 'none';
            headerMenu.style.display = 'flex';
        }
    });


    // Menu Fixed

    let up;

    window.addEventListener('scroll', ()=> {
        if (window.pageYOffset > 0 && window.pageYOffset <= 300 && window.innerWidth > 767) {
            up = 300;
        } else if (window.pageYOffset > 300 && window.pageYOffset <= 700  && window.innerWidth > 767) {
            up = true;
        } else if (window.pageYOffset > 700 && window.innerWidth > 767) {
            up = false;
        }
        if (up === 300) {
            headerMenu.classList.remove('header__menu-fixed');
            headerMenu.classList.remove('fadeInDown');
            headerMenu.classList.remove('fadeOutUp');
        } else if (up === true) {
            headerMenu.classList.add('fadeOutUp');
            headerMenu.classList.remove('fadeInDown');

        } else if (up === false) {
            headerMenu.classList.remove('fadeOutUp');
            headerMenu.classList.add('fadeInDown');
            headerMenu.classList.add('header__menu-fixed');
        }
    });


    // Form

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.contacts__form'),
        input = form.getElementsByTagName('input'),
        textarea = document.querySelector('#textarea'),
        statusMessage = document.createElement('div');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.appendChild(statusMessage);
        statusMessage.classList.add('contacts__status');

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });

        let json = JSON.stringify(obj);

        //request.send(json);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
                textarea.value = '';
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });
    });
});
