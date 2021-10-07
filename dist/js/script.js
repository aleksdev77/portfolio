
window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    const burger = document.querySelector('.hamburger'),
        menu = document.querySelector('.menu'),
        closeElem = document.querySelector('.menu__close'),
        overlay = document.querySelector('.menu__overlay'),
        modal = document.querySelector('.modal-overlay'),
        modalText = document.querySelector('.modal p'),
        closeModal = document.querySelector('.modal__close'),
        link = document.querySelectorAll('.menu__link'),
        form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('[data-input]'),
        scroll = calcScroll(),

        message = {
            loading: 'Подождите, идет отправка данных...',
            success: 'Спасибо за ваше обращение, в ближайшее время я свяжусь с вами.',
            error: 'Что-то пошло не так...',
        };


    // Бургер меню (открытие меню)

    burger.addEventListener('click', () => {
        menu.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
    });

    // Функция закрытие меню

    function closeMenu() {
        menu.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.marginRight = `0px`;
    }

    closeElem.addEventListener('click', closeMenu);

    // Закрытие меню при нажатии на ссылку

    link.forEach(item => {
        item.addEventListener('click', closeMenu);
        document.body.style.overflow = '';
        document.body.style.marginRight = `0px`;
    });

    // Закрытие меню при нажатии на подложку

    overlay.addEventListener('click', (event) => {
        if (event.target == overlay) {
            closeMenu();
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        }
    });

    // Открытие, закрытие модалки

    function showModal() {
        modal.classList.remove('fadeTwo');
        modal.classList.add('fadeOne');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
    }

    function hideModal() {
        modal.classList.remove('fadeOne');
        modal.classList.add('fadeTwo');
        setTimeout(() => {
            modal.classList.remove('active');
        }, 600);
    }

    // Скрипт отправки данных, открытие модалки, закрытие модалки через 3 секунды

    const postData = async (url, data) => {
        modalText.textContent = message.loading;
        showModal();
        let res = await fetch(url, {
            method: "POST",
            body: data,
        });

        return await res.text();
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(item);

            postData('mailer/smart.php', formData)
                .then(res => {
                    modalText.textContent = message.success;
                })
                .catch(() => {
                    modalText.textContent = message.error;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        hideModal();
                        setTimeout(() => {
                            document.body.style.overflow = '';
                            document.body.style.marginRight = `0px`;
                        }, 600);
                    }, 3000);
                });
        });
    });

    // Очистка инпутов

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    // Плавное всплытие секций при прокрутке

    const about = document.querySelector('.about'),
        resume = document.querySelector('.resume'),
        skills = document.querySelector('.skills'),
        portfolio = document.querySelector('.portfolio'),
        contacts = document.querySelector('.contacts');

    about.style.visibility = "hidden";
    resume.style.visibility = "hidden";
    skills.style.visibility = "hidden";
    portfolio.style.visibility = "hidden";
    contacts.style.visibility = "hidden";



    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop >= 200) {
            about.style.visibility = "visible";
            about.classList.add('animated', 'fadeInUp');
        }
        if (document.documentElement.scrollTop >= 1100) {
            resume.style.visibility = "visible";
            resume.classList.add('animated', 'fadeInUp');
        }
        if (document.documentElement.scrollTop >= 1900) {
            skills.style.visibility = "visible";
            skills.classList.add('animated', 'fadeInUp');
        }
        if (document.documentElement.scrollTop >= 2500) {
            portfolio.style.visibility = "visible";
            portfolio.classList.add('animated', 'fadeInUp');
        }
        if (document.documentElement.scrollTop >= 3300) {
            contacts.style.visibility = "visible";
            contacts.classList.add('animated', 'fadeInUp');
        }
    });

    // Скролл вверх

    // Появление скролла 'up'

    const upElem = document.querySelector('.pageup');

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1000) {
            upElem.classList.remove('fadeOut');
            upElem.classList.add('animated', 'fadeIn');
        } else {
            upElem.classList.remove('fadeIn');
            upElem.classList.add('fadeOut');
        }
    });

    // Scrolling with raf // Плавный скролл
    let links = document.querySelectorAll('[href="#up"]'),
        speed = 0.3;

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }

                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) :
                        Math.min(widthTop + progress / speed, widthTop + toBlock));

                document.documentElement.scrollTo(0, r);

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });

    const sidepanelIcons = document.querySelectorAll('.sidepanel__link svg path'),
        sidepanelDivider = document.querySelector('.sidepanel .sidepanel__divider'),
        sidepanelText = document.querySelector('.sidepanel .sidepanel__text');


    // Смена цвета aside панели при прокрутке страницы

    window.addEventListener('scroll', () => {

        if (document.documentElement.scrollTop > 400) {
            sidepanelIcons.forEach(item => {
                item.classList.add('black');
            });
            sidepanelDivider.style.backgroundColor = 'black';
            sidepanelText.style.color = 'black';
        } else {
            sidepanelIcons.forEach(item => {
                item.classList.remove('black');
                item.classList.add('white');
            });
            sidepanelDivider.style.backgroundColor = 'white';
            sidepanelText.style.color = 'white';
        }
    });

    // Функция расчета ширины скролла

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

});


