$(document).ready(function () {
    const $gallery = $('.gallery');
    const totalSlides = $gallery.children().length;
    let currentSlide = 0;

    $gallery.slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        arrows: true,
        dots: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    $gallery.on('afterChange', function (event, slick, currentSlideIndex) {
        currentSlide = currentSlideIndex;
        updatePager();
    });

    function updatePager() {
        $('.pager').text(`Страница ${currentSlide + 1} из ${Math.floor(totalSlides / 3)}`);
    }

    updatePager();
});
