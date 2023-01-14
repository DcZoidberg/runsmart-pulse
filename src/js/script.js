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
  });