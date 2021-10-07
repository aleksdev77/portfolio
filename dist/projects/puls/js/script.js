//Slick slider

$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        fade: true,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: '<button type="button" class="slick-prev"><img src="./img/icons/arrow-left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="./img/icons/arrow-right.png"></button>',
        responsive: [{
            breakpoint: 992,
            settings: {
                dots: true,
                arrows: false
            }
        }]
    });

    //tabs

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).click(function (e) {
                e.preventDefault();
                $('.catalog__information').eq(i).toggleClass('catalog__information_active');
            });

        });
    }

    toggleSlide('.catalog__item-link');
    toggleSlide('.catalog__item-links');

    //modal

    $('[data-modal="consultation"]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.catalog__item-btn').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__description').text($('.catalog__item-title').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true,
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите свой телефон",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес"
                }
            }
        });
    }

    valideForms('#main-form form');
    valideForms('#consultation form');
    valideForms('#order form');

    //Mask phone

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    //Form

    $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            setTimeout(() => {
                $('.overlay, #thanks').fadeOut('slow');
            }, 3000);
            $('form').trigger('reset');
        });
        return false;
    });
});

