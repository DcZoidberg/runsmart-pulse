$(document).ready(function(){
    $('.carousel__inner').slick({
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/carousel/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/carousel/right.png"></button>',
        dots: false,
        responsive: [
            {
            breakpoint: 992,
            settings: {
                dots: true,
                arrows: false
            }
        }
        ]
    });

    $('ul.catalog-nav').on('click', 'li:not(.catalog-nav__item-active)', function() {
        $(this)
          .addClass('catalog-nav__item-active').siblings().removeClass('catalog-nav__item-active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content-active').eq($(this).index()).addClass('catalog__content-active');
      });

    function toogleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content-active');
                $('.catalog-item-list').eq(i).toggleClass('catalog-item-list-active');
            })
        })
    }
    toogleSlide('.catalog-item__link');
    toogleSlide('.catalog-item-list__back');

    // Modal
    $('[data-modal="consultation"]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut()
    });

    $('.catalog-item-button').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal-form__subtitle').text($('.catalog-item__title').eq(i).text());
            $('.overlay, #order').fadeIn();
        })
    });

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    valideForms('#consultation-form');
    valideForms('#consultation');
    valideForms('#order');
    // phone mask
    $('input[name=phone]').mask("+7 (999) 999-99-99");
    //validated forms 
    $('form').submit(function(e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
    }   
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();
            $('form').trigger('reset');
        });
        return false; 
    });


    // scroll up and smooth scroll

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^=#up]").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
    
  });