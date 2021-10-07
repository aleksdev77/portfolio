'use strict';

const burger = document.querySelector('.header__berger-img'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close'),
    overlay = document.querySelector('.menu__overlay'),
    link = document.querySelectorAll('.menu__link'),
    modal = document.querySelector('.overlay'),
    closeModal = document.querySelector('.modal__close'),
    openModal = document.querySelectorAll('[data-modal]'),
    sendBtn = document.querySelector('.modal__btn'),
    form = document.querySelectorAll('form'),
    input = document.querySelector('input[name=phone]'),
    inputs = document.querySelectorAll('input'),
    scrolling = calcScroll(),
    message = {
        loading: 'Загрузка...',
        success: 'В ближайшее время с вами свяжутся',
        error: 'Что-то пошло не так...',
    };

let flag = true; // Используется для блокировки функции закрытия моадльного окна во время отправки данных

// Бургер меню

burger.addEventListener('click', () => {
    menu.classList.add('active');
});

let closeMenu = function () {
    menu.classList.remove('active');
    document.body.style.overflow = '';
};

closeElem.addEventListener('click', closeMenu);

link.forEach(item => {
    item.addEventListener('click', closeMenu);
});

overlay.addEventListener('click', (event) => {
    if (event.target == overlay) {
        closeMenu();
    }
});

// Модальное окно

openModal.forEach(item => {  // Открытие модального окна
    item.addEventListener('click', () => {
        modal.classList.remove('fadeOut');
        modal.classList.add('fadeIn');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scrolling}px`;
    });
});

function closeModals() { // Закрытие модального окна
    if (flag != false) {
        modal.classList.remove('fadeIn');
        modal.classList.add('fadeOut');
        setTimeout(() => {
            modal.classList.remove('active');
        }, 600);
    }
}

modal.addEventListener('click', (e) => { // Закрытие модально окна при нажатии на крестик или подложку
    if (e.target == modal || e.target == closeModal) {
        closeModals();
        setTimeout(() => { // Появление скролла через 0.6 секунды
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        }, 600);
    }
});

// Расчет ширины скролла (помогает избежать скачков экрана при открытии, закрытии модального окна)

function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth; // Отнимаем от полной ширины, ширину контента, получаем ширину скролла.
    div.remove();

    return scrollWidth;
}

// Ввод только цифр в поле инпут phone

input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/, '');
});

// Очистка инпутов

const clearInputs = () => {
    inputs.forEach(item => {
        item.value = '';
    });
};

// Отправка данных

const postData = async (url, data) => {
    document.body.style.overflow = 'hidden';
    flag = false;
    document.querySelector('.status').textContent = message.loading;
    let res = await fetch(url, {
        method: "POST",
        body: data,
    });

    return await res.text();
};

form.forEach(item => {
    item.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        item.appendChild(statusMessage);

        const formData = new FormData(item);

        postData('mailer/smart.php', formData)
            .then(res => {
                statusMessage.textContent = message.success;
                flag = true;
            })
            .catch(() => {
                statusMessage.textContent = message.error;
            })
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    statusMessage.remove();
                    closeModals();
                    setTimeout(() => {  // Появление скролла через 0.6 секунды
                        document.body.style.overflow = '';
                        document.body.style.marginRight = `0px`;
                    }, 600);
                }, 3000);
            });
    });
});