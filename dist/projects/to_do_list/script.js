window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let inputBox = document.querySelector('.inputField input'),
        addBtn = document.querySelector('.inputField button'),
        list = document.querySelector('.todoList'),
        clearBtn = document.querySelector('.footer button'),
        todos;
    //-----------------------------------------------------
    // Добавление содержимого ul в localstorage/ Полная очистка localstorage 

    function toLocal() {
        todos = list.innerHTML;
        localStorage.setItem('todos', todos);
    }

    //-----------------------------------------------------
    // Если в поле инпут есть значение, то кнопке добавляется класс active

    inputBox.addEventListener('input', () => {
        if (inputBox.value) {
            addBtn.classList.add('active');
        } else if (inputBox.value === '') {
            addBtn.classList.remove('active');
        }
    });

    //-----------------------------------------------------
    // Удаление тега li при помощи parentNode при нажатии на иконку, зачеркивание содержимого li

    list.addEventListener('click', (e) => {
        if (e.target.tagName === 'I') {
            let div = e.target.parentNode;
            div.remove();
            toLocal();
        } else if (e.target.tagName === 'LI') {
            document.querySelectorAll('li').forEach(item => {
                if (e.target === item) {
                    item.classList.toggle('checked');
                    toLocal();
                }
            });
        }
    });

    //-----------------------------------------------------
    // Создание тега li и I с последующим добавлением в ul, очистка инпута, 

    addBtn.addEventListener('click', () => {
        let li = document.createElement('li');

        li.innerHTML = `${inputBox.value}`;

        list.appendChild(li);

        inputBox.value = "";

        let icon = document.createElement('i');
        icon.classList.add('fas', 'fa-trash');
        li.appendChild(icon);
        toLocal();

        addBtn.classList.remove('active');

        if (localStorage.getItem('todos')) {
            clearBtn.classList.add('active');
        } else {
            clearBtn.classList.remove('active');
        }
    });

    //-----------------------------------------------------
    // Создание записи при помощи кнопки enter

    inputBox.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            let li = document.createElement('li');
            li.innerHTML = `${inputBox.value}`;

            list.appendChild(li);

            inputBox.value = "";

            let icon = document.createElement('i');
            icon.classList.add('fas', 'fa-trash');
            li.appendChild(icon);
            toLocal();

            addBtn.classList.remove('active');

            if (localStorage.getItem('todos')) {
                clearBtn.classList.add('active');
            } else {
                clearBtn.classList.remove('active');
            }
        }
    });

    //-----------------------------------------------------
    // Удаление всех задач из листа ul

    clearBtn.addEventListener('click', () => {       // Разобраться, в чем причина появления пустой задачи
        list.innerHTML = '';
        localStorage.clear();
        clearBtn.classList.remove('active');

    });

    if (localStorage.getItem('todos')) {
        clearBtn.classList.add('active');
    } else {
        clearBtn.classList.remove('active');
    }

    if (localStorage.getItem('todos')) {
        list.innerHTML = localStorage.getItem('todos');
    }
});





