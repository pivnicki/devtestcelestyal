/* eslint-disable no-console */

(function ($) {
    'use strict';
    /**
     * Global Variables
     */
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    /**
     * Returns a function, that, as long as it continues to be invoked, will not
     * be triggered. The function will be called after it stops being called for
     * N milliseconds. If `immediate` is passed, trigger the function on the
     * leading edge, instead of the trailing.
     * @param {fn} func - function to debounce
     * @param {number} wait - time to wait
     * @param {bool} immediate
     * @returns {Function}
     */
    var debounce = function (func, wait, immediate) {
        var timeout;
        var waitTime = wait || 100;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            }, waitTime);
            if (immediate && !timeout) {
                func.apply(context, args);
            }
        };
    };
    /**
     * Collection of useful site functions
     * @type {{init: init, smoothScroll: smoothScroll}}
     */
    var siteFunctions = {
        init: function () {
            siteFunctions.smoothScroll();
        },
        /**
         * Smooth Scroll function for anchor clicks
         */
        smoothScroll: function () {
            $('a[href*="#"]:not(.menu-item a, .wpml-ls-item-toggle, .signin a, .tab)').click(function () {
                var target = $(this.hash);
                if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html, body').stop().animate({
                            scrollTop: target.offset().top - 75
                        }, 1000);
                        return false;
                    }
                }
            });
        }
    };

    var siteHeader = {
        init: function () {

        },
        /**
         * Handle on scroll header functionality
         */
        scrollChange: function () {
            var $body = $('body');
            $(document).scrollTop() > 50 ? $body.addClass('scroll') : $body.removeClass('scroll'); //jshint ignore:line
        }
    };

    var siteMenu = {
        prevent: false,
        init: function () {
            /**
             * Toggle menu with clicking on hamburger menu and overlay
             */
            $('#menu-button, .m-overlay').click(function (e) {
                e.preventDefault();
                siteMenu.toggle();
            });
        },
        toggle: function () {
            if (!siteMenu.prevent) {
                $('body').toggleClass('m-open');
                siteMenu.prevent = !siteMenu.prevent;

                setTimeout(function () {
                    siteMenu.prevent = !siteMenu.prevent;
                }, 400);
            }
        }
    };

    var slickSliders = {
        init: function () {
            slickSliders.mainHomeSlider();
            slickSliders.cardSlider();
            slickSliders.excSlider();
            slickSliders.infoSlider();
            slickSliders.itinerary();
        },
        itineraryRef: null,
        mainHomeSlider: function () {

            $('.js-headerSlider').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                autoplay: true,
                draggable: true,
                infinite: true,
                arrows: false,
                dots: true,
                speed: 1000,
                slide: '.js-headerSlide',
                responsive: [
                    {
                        breakpoint: 540,
                        settings: {
                            slidesToShow: 1
                        }
                    },
                ]
            });
        },

        cardSlider: function () {

            $('.js-cardSlider').each(function () {
                //var items =  $($('.js-cardSlider')[0]).find('.js-cardSlide').length;
                $(this).on('init', function(event, slick) {
                    
                    $(this).children('.slick-dots').addClass('card-slider-dots');
                    var dotsAmount = $(this).children('.slick-dots').children('li').length;

                    var dot = $(this).children('.slick-dots').children('li');    
                
                    for (var i = 0; i < dotsAmount; i++) {

                        if( $(dot[i]).hasClass('slick-active') ) {
                            //update DOM siblings
                            $(dot[i]).prevAll().slice(0,2).addClass('visible-dot');
                            $(dot[i]).nextAll().slice(0,2).addClass('visible-dot');
                        }

                    }
                }).on('afterChange', function(event, slick, direction) {
                    var dotsAmount = $(this).children('.slick-dots').children('li').length;
                    var dot = $(this).children('.slick-dots').children('li');
                    dot.removeClass('prev-dot').removeClass('visible-dot');

                    // find current slide
                    for (var i = 0; i < dotsAmount; i++) {
                        //console.log(dot[i]);

                        if( $(dot[i]).hasClass('slick-active') ) {
                            //update DOM siblings
                            $(dot[i]).prevAll().slice(0,2).addClass('visible-dot');
                            $(dot[i]).nextAll().slice(0,2).addClass('visible-dot');
                        }

                    }

                }).slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: false,
                    draggable: true,
                    arrows: true,
                    infinite: true,
                    speed: 1000,
                    slide: '.js-cardSlide',
                    appendArrows: $('.m-nav', this),
                    prevArrow: $('.m-nav .left', this),
                    nextArrow: $('.m-nav .right', this),
                    adaptiveHeight: true,
                    responsive: [
                        {
                            breakpoint: 540,
                            settings: {
                                slidesToShow: 1,
                                arrows: false,
                                dots: true
                            }

                        },
                        {
                            breakpoint: 990,
                            settings: {
                                slidesToShow: 2
                            }
                        }
                    ]
                });
            });
        },

        excSlider: function () {

            $('.js-excSlider').each(function () {
               // var items =  $($('.js-excSlider')[0]).find('.js-excSlide').length;
                $(this).slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: false,
                    draggable: true,
                    arrows: true,
                    infinite: true,
                    speed: 1000,
                    slide: '.js-excSlide',
                    appendArrows: $('.m-nav', this),
                    prevArrow: $('.m-nav .left', this),
                    nextArrow: $('.m-nav .right', this),
                    adaptiveHeight: true,
                    responsive: [
                        {
                            breakpoint: 540,
                            settings: {
                                slidesToShow: 1,
                                arrows: false,
                                dots: true
                            }

                        },
                        {
                            breakpoint: 990,
                            settings: {
                                slidesToShow: 2
                            }
                        }
                    ]
                });
            });
        },

        infoSlider: function () {

            $('.js-infoSlider').each(function () {
                $(this).slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: false,
                    draggable: true,
                    arrows: true,
                    infinite: true,
                    speed: 1000,
                    slide: '.js-infoSlide',
                    appendArrows: $('.m-nav', this),
                    prevArrow: $('.m-nav .left', this),
                    nextArrow: $('.m-nav .right', this),
                    responsive: [
                        {
                            breakpoint: 540,
                            settings: {
                                slidesToShow: 1,
                                arrows: false,
                                dots: true
                            }

                        },
                        {
                            breakpoint: 990,
                            settings: {
                                slidesToShow: 2
                            }
                        }
                    ]
                });
            });
        },

        itinerary: function () {

            $('.js-oneHalf').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: false,
                draggable: true,
                arrows: true,
                infinite: false,
                centerMode: true,
                speed: 1000,
                slide: '.js-slide',
                appendArrows: $('.m-nav.it'),
                prevArrow: $('.m-nav.it .left'),
                nextArrow: $('.m-nav.it .right'),
                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            arrows: false
                        }
                    },
                ]
            });
        }
    };

    var clickDrop = {

        init: function () {
            clickDrop.language();
            clickDrop.openForm();
        },

        language: function () {
            var trigger = $('.js-wpml-ls-item-toggle');

            $(document).click(function (e) {
                var target = e.target;

                if (!$(trigger).is(target) && $(trigger).has(target).length === 0) {
                    $(this).removeClass('active');
                    $('.wpml-ls-sub-menu').slideUp();
                }
            });

            trigger.click(function (e) {
                e.preventDefault();
                $(this).addClass('active');
                $(this).siblings('.wpml-ls-sub-menu').slideDown();
            });
        },

        openForm: function () {
            $(document).click(function (event) {
                if (!$(event.target).closest('.header-search-form').length) {
                    if ($('.header-search-form').is(':visible')) {
                        $('.header-search-form').slideUp().removeClass('active');
                    }
                }
            });

            $('.js-trigger').click(function (e) {
                // e.preventDefault();
                e.stopPropagation();
                $('.header-search-form').slideToggle().toggleClass('active');
                $('.header-search-form input').focus();
            });
        }
    };

    var theLanguage = $('html').attr('lang');
    var search = {
        init: function () {
            search.filter();
        },

        filter: function () {
            var jsonList;
            if (theLanguage == 'fr-FR'){ 
                jsonList = [
                    { destination: "Greece & Greek Islands", departure: "Avr. 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Mai 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Juin 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Juil. 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Août 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Sept. 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Oct. 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Nov. 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Déc 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Mars 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Avr. 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Mai 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Juin 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Juil. 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Août 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Sept. 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Oct. 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Nov. 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Déc 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Avr. 2021", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Mai 2021", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Juin 2021", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Juil. 2021", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Août 2021", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Sept. 2021", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Oct. 2021", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Nov. 2021", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Mars 2022", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Avr. 2022", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Mai 2022", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Juin 2022", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Juil. 2022", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Août 2022", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Sept. 2022", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Oct. 2022", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Nov. 2022", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Avr. 2021", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Mai 2021", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Juin 2021", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Juil. 2021", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Août 2021", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Sept. 2021", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Oct. 2021", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Nov. 2021", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Mars 2022", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Avr. 2022", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Mai 2022", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Juin 2022", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Juil. 2022", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Août 2022", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Sept. 2022", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Oct. 2022", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Nov. 2022", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Egypt", departure: "Nov. 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/243?sid=42052&language=fr&currency=EUR" },
                    { destination: "Egypt", departure: "Déc 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/243?sid=42052&language=fr&currency=EUR" },
                    { destination: "Egypt", departure: "Mars 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/243?sid=42052&language=fr&currency=EUR" },
                    { destination: "Egypt", departure: "Avr. 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/243?sid=42052&language=fr&currency=EUR" },
                    { destination: "Egypt", departure: "Nov. 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/243?sid=42052&language=fr&currency=EUR" },
                    { destination: "Egypt", departure: "Déc 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/243?sid=42052&language=fr&currency=EUR" },
                    { destination: "Israel", departure: "Nov. 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/465?sid=42052&language=fr&currency=EUR" },
                    { destination: "Israel", departure: "Déc 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/465?sid=42052&language=fr&currency=EUR" },
                    { destination: "Israel", departure: "Mars 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/465?sid=42052&language=fr&currency=EUR" },
                    { destination: "Israel", departure: "Avr. 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/465?sid=42052&language=fr&currency=EUR" },
                    { destination: "Israel", departure: "Nov. 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/465?sid=42052&language=fr&currency=EUR" },
                    { destination: "Israel", departure: "Déc 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/465?sid=42052&language=fr&currency=EUR" },
                    { destination: "Cyprus", departure: "Nov. 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/171?sid=42052&language=fr&currency=EUR" },
                    { destination: "Cyprus", departure: "Déc 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/171?sid=42052&language=fr&currency=EUR" },
                    { destination: "Cyprus", departure: "Mars 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/171?sid=42052&language=fr&currency=EUR" },
                    { destination: "Cyprus", departure: "Avr. 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/171?sid=42052&language=fr&currency=EUR" },
                    { destination: "Cyprus", departure: "Nov. 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/171?sid=42052&language=fr&currency=EUR" },
                    { destination: "Cyprus", departure: "Déc 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/171?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Avr. 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Mai 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Juin 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Juil. 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Août 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Sept. 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Oct. 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Nov. 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Déc 2021", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Mars 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Avr. 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Mai 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Juin 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Juil. 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Août 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Sept. 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Oct. 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Nov. 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Déc 2022", duration: "7 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Avr. 2021", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Mai 2021", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Juin 2021", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Juil. 2021", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Août 2021", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Sept. 2021", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Oct. 2021", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Nov. 2021", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Mars 2022", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Avr. 2022", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Mai 2022", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Juin 2022", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Juil. 2022", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Août 2022", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Sept. 2022", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Oct. 2022", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Nov. 2022", duration: "3 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Avr.il 2021", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Mai 2021", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Juin 2021", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Juil. 2021", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Août 2021", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Sept. 2021", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Oct. 2021", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Nov. 2021", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Mars 2022", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Avr. 2022", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Mai 2022", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Juin 2022", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Juil. 2022", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Août 2022", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Sept. 2022", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Oct. 2022", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                    { destination: "Turkey", departure: "Nov. 2022", duration: "4 Nuits", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42052&language=fr&currency=EUR" },
                ]; 
               } else if (theLanguage == 'nl-DE') {
                jsonList = [
                    { destination: "Greece & Greek Islands", departure: "Apr. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Mai. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Jun. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Jul. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Aug. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Sep. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Okt. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Nov. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Dez. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Mrz. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Apr. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Mai. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Jun. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Jul. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Aug. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Sep. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Okt. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Nov. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Dez. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Apr. 2021", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Mai. 2021", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Jun. 2021", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Jul. 2021", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Aug. 2021", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Sep. 2021", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Okt. 2021", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Nov. 2021", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Mrz. 2022", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Apr. 2022", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Mai. 2022", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Jun. 2022", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Jul. 2022", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Aug. 2022", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Sep. 2022", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Okt. 2022", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Nov. 2022", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Apr. 2021", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Mai. 2021", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Jun. 2021", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Jul. 2021", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Aug. 2021", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Sep. 2021", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Okt. 2021", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Nov. 2021", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Mrz. 2022", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Apr. 2022", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Mai. 2022", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Jun. 2022", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Jul. 2022", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Aug. 2022", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Sep. 2022", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Okt. 2022", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Nov. 2022", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Egypt", departure: "Nov. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/243?sid=42046&language=de&currency=EUR" },
                    { destination: "Egypt", departure: "Dez. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/243?sid=42046&language=de&currency=EUR" },
                    { destination: "Egypt", departure: "Mrz. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/243?sid=42046&language=de&currency=EUR" },
                    { destination: "Egypt", departure: "Apr. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/243?sid=42046&language=de&currency=EUR" },
                    { destination: "Egypt", departure: "Nov. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/243?sid=42046&language=de&currency=EUR" },
                    { destination: "Egypt", departure: "Dez. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/243?sid=42046&language=de&currency=EUR" },
                    { destination: "Israel", departure: "Nov. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/465?sid=42046&language=de&currency=EUR" },
                    { destination: "Israel", departure: "Dez. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/465?sid=42046&language=de&currency=EUR" },
                    { destination: "Israel", departure: "Mrz. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/465?sid=42046&language=de&currency=EUR" },
                    { destination: "Israel", departure: "Apr. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/465?sid=42046&language=de&currency=EUR" },
                    { destination: "Israel", departure: "Nov. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/465?sid=42046&language=de&currency=EUR" },
                    { destination: "Israel", departure: "Dez. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/465?sid=42046&language=de&currency=EUR" },
                    { destination: "Cyprus", departure: "Nov. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/171?sid=42046&language=de&currency=EUR" },
                    { destination: "Cyprus", departure: "Dez. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/171?sid=42046&language=de&currency=EUR" },
                    { destination: "Cyprus", departure: "Mrz. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/171?sid=42046&language=de&currency=EUR" },
                    { destination: "Cyprus", departure: "Apr. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/171?sid=42046&language=de&currency=EUR" },
                    { destination: "Cyprus", departure: "Nov. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/171?sid=42046&language=de&currency=EUR" },
                    { destination: "Cyprus", departure: "Dez. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/171?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Apr. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Mai. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Jun. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Jul. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Aug. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Sep. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Okt. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Nov. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Dez. 2021", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Mrz. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Apr. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Mai. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Jun. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Jul. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Aug. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Sep. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Okt. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Nov. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Dez. 2022", duration: "7 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Apr. 2021", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Mai. 2021", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Jun. 2021", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Jul. 2021", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Aug. 2021", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Sep. 2021", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Okt. 2021", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Nov. 2021", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Mrz. 2022", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Apr. 2022", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Mai. 2022", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Jun. 2022", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Jul. 2022", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Aug. 2022", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Sep. 2022", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Okt. 2022", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Nov. 2022", duration: "3 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Apr. 2021", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Mai. 2021", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Jun. 2021", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Jul. 2021", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Aug. 2021", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Sep. 2021", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Okt. 2021", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Nov. 2021", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Mrz. 2022", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Apr. 2022", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Mai. 2022", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Jun. 2022", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Jul. 2022", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Aug. 2022", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Sep. 2022", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Okt. 2022", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                    { destination: "Turkey", departure: "Nov. 2022", duration: "4 Nächte", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42046&language=de&currency=EUR" },
                ];
               } else if (theLanguage == 'el-GR') {
                jsonList = [
                    { destination: "Greece & Greek Islands", departure: "Απρ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Μάι 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Ιούν 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Ιούλ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Αύγ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Σεπ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Οκτ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Νοέ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Δεκ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Μάρ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Απρ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Μάι 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Ιούν 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Ιούλ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Αύγ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Σεπ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Οκτ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Νοέ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Δεκ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Απρ 2021", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Μάι 2021", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Ιούν 2021", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Ιούλ 2021", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Αύγ 2021", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Σεπ 2021", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Οκτ 2021", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Νοέ 2021", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Μάρ 2022", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Απρ 2022", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Μάι 2022", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Ιούν 2022", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Ιούλ 2022", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Αύγ 2022", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Σεπ 2022", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Οκτ 2022", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Νοέ 2022", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Απρ 2021", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Μάι 2021", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Ιούν 2021", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Ιούλ 2021", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Αύγ 2021", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Σεπ 2021", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Οκτ 2021", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Νοέ 2021", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Μάρ 2022", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Απρ 2022", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Μάι 2022", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Ιούν 2022", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Ιούλ 2022", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Αύγ 2022", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Σεπ 2022", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Οκτ 2022", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "Νοέ 2022", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Egypt", departure: "Νοέ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/243?sid=42058&language=el&currency=EUR" },
                    { destination: "Egypt", departure: "Δεκ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/243?sid=42058&language=el&currency=EUR" },
                    { destination: "Egypt", departure: "Μάρ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/243?sid=42058&language=el&currency=EUR" },
                    { destination: "Egypt", departure: "Απρ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/243?sid=42058&language=el&currency=EUR" },
                    { destination: "Egypt", departure: "Νοέ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/243?sid=42058&language=el&currency=EUR" },
                    { destination: "Egypt", departure: "Δεκ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/243?sid=42058&language=el&currency=EUR" },
                    { destination: "Israel", departure: "Νοέ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/465?sid=42058&language=el&currency=EUR" },
                    { destination: "Israel", departure: "Δεκ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/465?sid=42058&language=el&currency=EUR" },
                    { destination: "Israel", departure: "Μάρ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/465?sid=42058&language=el&currency=EUR" },
                    { destination: "Israel", departure: "Απρ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/465?sid=42058&language=el&currency=EUR" },
                    { destination: "Israel", departure: "Νοέ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/465?sid=42058&language=el&currency=EUR" },
                    { destination: "Israel", departure: "Δεκ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/465?sid=42058&language=el&currency=EUR" },
                    { destination: "Cyprus", departure: "Νοέ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/171?sid=42058&language=el&currency=EUR" },
                    { destination: "Cyprus", departure: "Δεκ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/171?sid=42058&language=el&currency=EUR" },
                    { destination: "Cyprus", departure: "Μάρ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/171?sid=42058&language=el&currency=EUR" },
                    { destination: "Cyprus", departure: "Απρ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/171?sid=42058&language=el&currency=EUR" },
                    { destination: "Cyprus", departure: "Νοέ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/171?sid=42058&language=el&currency=EUR" },
                    { destination: "Cyprus", departure: "Δεκ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/171?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Απρ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Μάι 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Ιούν 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Ιούλ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Αύγ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Σεπ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Οκτ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Νοέ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Δεκ 2021", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Μάρ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Απρ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Μάι 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Ιούν 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Ιούλ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Αύγ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Σεπ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Οκτ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Νοέ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Δεκ 2022", duration: "7 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Απρ 2021", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Μάι 2021", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Ιούν 2021", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Ιούλ 2021", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Αύγ 2021", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Σεπ 2021", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Οκτ 2021", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Νοέ 2021", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Μάρ 2022", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Απρ 2022", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Μάι 2022", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Ιούν 2022", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Ιούλ 2022", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Αύγ 2022", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Σεπ 2022", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Οκτ 2022", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Νοέ 2022", duration: "3 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Απρ 2021", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Μάι 2021", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Ιούν 2021", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Ιούλ 2021", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Αύγ 2021", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Σεπ 2021", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Οκτ 2021", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Νοέ 2021", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Μάρ 2022", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Απρ 2022", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Μάι 2022", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Ιούν 2022", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Ιούλ 2022", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Αύγ 2022", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Σεπ 2022", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Οκτ 2022", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                    { destination: "Turkey", departure: "Νοέ 2022", duration: "4 Νύχτες", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42058&language=el&currency=EUR" },
                ];
               } else if (theLanguage == 'es-ES') {
                jsonList = [
                    { destination: "Greece & Greek Islands", departure: "abr. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "may. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "jun. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "jul. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "ago. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "sept. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "oct. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "nov. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "dic. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "mar. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "abr. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "may. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "jun. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "jul. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "ago. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "sept. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "oct. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "nov. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "dic. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "abr. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "may. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "jun. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "jul. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "ago. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "sept. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "oct. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "nov. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "mar. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "abr. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "may. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "jun. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "jul. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "ago. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "sept. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "oct. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "nov. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "abr. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "may. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "jun. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "jul. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "ago. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "sept. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "oct. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "nov. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "mar. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "abr. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "may. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "jun. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "jul. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "ago. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "sept. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "oct. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "nov. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Egypt", departure: "nov. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/243?sid=42040&language=es&currency=EUR" },
                    { destination: "Egypt", departure: "dic. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/243?sid=42040&language=es&currency=EUR" },
                    { destination: "Egypt", departure: "mar. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/243?sid=42040&language=es&currency=EUR" },
                    { destination: "Egypt", departure: "abr. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/243?sid=42040&language=es&currency=EUR" },
                    { destination: "Egypt", departure: "nov. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/243?sid=42040&language=es&currency=EUR" },
                    { destination: "Egypt", departure: "dic. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/243?sid=42040&language=es&currency=EUR" },
                    { destination: "Israel", departure: "nov. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/465?sid=42040&language=es&currency=EUR" },
                    { destination: "Israel", departure: "dic. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/465?sid=42040&language=es&currency=EUR" },
                    { destination: "Israel", departure: "mar. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/465?sid=42040&language=es&currency=EUR" },
                    { destination: "Israel", departure: "abr. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/465?sid=42040&language=es&currency=EUR" },
                    { destination: "Israel", departure: "nov. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/465?sid=42040&language=es&currency=EUR" },
                    { destination: "Israel", departure: "dic. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/465?sid=42040&language=es&currency=EUR" },
                    { destination: "Cyprus", departure: "nov. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/171?sid=42040&language=es&currency=EUR" },
                    { destination: "Cyprus", departure: "dic. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/171?sid=42040&language=es&currency=EUR" },
                    { destination: "Cyprus", departure: "mar. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/171?sid=42040&language=es&currency=EUR" },
                    { destination: "Cyprus", departure: "abr. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/171?sid=42040&language=es&currency=EUR" },
                    { destination: "Cyprus", departure: "nov. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/171?sid=42040&language=es&currency=EUR" },
                    { destination: "Cyprus", departure: "dic. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/171?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "abr. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "may. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "jun. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "jul. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "ago. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "sept. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "oct. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "nov. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "dic. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "mar. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "abr. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "may. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "jun. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "jul. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "ago. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "sept. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "oct. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "nov. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "dic. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "abr. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "may. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "jun. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "jul. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "ago. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "sept. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "oct. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "nov. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "mar. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "abr. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "may. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "jun. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "jul. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "ago. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "sept. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "oct. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "nov. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "abr. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "may. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "jun. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "jul. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "ago. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "sept. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "oct. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "nov. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "mar. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "abr. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "may. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "jun. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "jul. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "ago. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "sept. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "oct. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                    { destination: "Turkey", departure: "nov. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42040&language=es&currency=EUR" },
                ];
               } else if (theLanguage == 'pt-BR') {
                jsonList = [
                    { destination: "Greece & Greek Islands", departure: "abr. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "mai. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jun. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jul. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "ago. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "set. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "out. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "nov. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "dez. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "mar. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "abr. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "mai. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jun. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jul. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "ago. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "set. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "out. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "nov. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "dez. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "abr. 2021", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "mai. 2021", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jun. 2021", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jul. 2021", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "ago. 2021", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "set. 2021", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "out. 2021", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "nov. 2021", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "mar. 2022", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "abr. 2022", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "mai. 2022", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jun. 2022", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jul. 2022", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "ago. 2022", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "set. 2022", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "out. 2022", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "nov. 2022", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "abr. 2021", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "mai. 2021", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jun. 2021", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jul. 2021", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "ago. 2021", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "set. 2021", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "out. 2021", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "nov. 2021", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "mar. 2022", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "abr. 2022", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "mai. 2022", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jun. 2022", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jul. 2022", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "ago. 2022", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "set. 2022", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "out. 2022", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "nov. 2022", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Egypt", departure: "nov. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/243?sid=42655&language=pt&currency=USD" },
                    { destination: "Egypt", departure: "dez. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/243?sid=42655&language=pt&currency=USD" },
                    { destination: "Egypt", departure: "mar. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/243?sid=42655&language=pt&currency=USD" },
                    { destination: "Egypt", departure: "abr. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/243?sid=42655&language=pt&currency=USD" },
                    { destination: "Egypt", departure: "nov. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/243?sid=42655&language=pt&currency=USD" },
                    { destination: "Egypt", departure: "dez. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/243?sid=42655&language=pt&currency=USD" },
                    { destination: "Israel", departure: "nov. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/465?sid=42655&language=pt&currency=USD" },
                    { destination: "Israel", departure: "dez. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/465?sid=42655&language=pt&currency=USD" },
                    { destination: "Israel", departure: "mar. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/465?sid=42655&language=pt&currency=USD" },
                    { destination: "Israel", departure: "abr. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/465?sid=42655&language=pt&currency=USD" },
                    { destination: "Israel", departure: "nov. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/465?sid=42655&language=pt&currency=USD" },
                    { destination: "Israel", departure: "dez. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/465?sid=42655&language=pt&currency=USD" },
                    { destination: "Cyprus", departure: "nov. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/171?sid=42655&language=pt&currency=USD" },
                    { destination: "Cyprus", departure: "dez. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/171?sid=42655&language=pt&currency=USD" },
                    { destination: "Cyprus", departure: "mar. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/171?sid=42655&language=pt&currency=USD" },
                    { destination: "Cyprus", departure: "abr. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/171?sid=42655&language=pt&currency=USD" },
                    { destination: "Cyprus", departure: "nov. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/171?sid=42655&language=pt&currency=USD" },
                    { destination: "Cyprus", departure: "dez. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/171?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "abr. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "mai. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "jun. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "jul. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "ago. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "set. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "out. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "nov. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "dez. 2021", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "mar. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "abr. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "mai. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "jun. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "jul. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "ago. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "set. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "out. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "nov. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "dez. 2022", duration: "7 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "abr. 2021", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "mai. 2021", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "jun. 2021", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "jul. 2021", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "ago. 2021", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "set. 2021", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "out. 2021", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "nov. 2021", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "mar. 2022", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "abr. 2022", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "mai. 2022", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "jun. 2022", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "jul. 2022", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "ago. 2022", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "set. 2022", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "out. 2022", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "nov. 2022", duration: "3 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "abr. 2021", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "mai. 2021", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "jun. 2021", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "jul. 2021", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "ago. 2021", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "set. 2021", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "out. 2021", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "nov. 2021", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "mar. 2022", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "abr. 2022", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "mai. 2022", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "jun. 2022", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "jul. 2022", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "ago. 2022", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "set. 2022", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "out. 2022", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                    { destination: "Turkey", departure: "nov. 2022", duration: "4 Noites", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42655&language=pt&currency=USD" },
                ];
               } else if (theLanguage == 'es-ar') {
                jsonList = [
                    { destination: "Greece & Greek Islands", departure: "abr. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "may. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jun. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jul. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "ago. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "sept. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "oct. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "nov. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "dic. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "mar. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "abr. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "may. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jun. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jul. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "ago. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "sept. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "oct. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "nov. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "dic. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "abr. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "may. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jun. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jul. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "ago. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "sept. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "oct. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "nov. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "mar. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "abr. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "may. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jun. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jul. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "ago. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "sept. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "oct. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "nov. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "abr. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "may. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jun. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jul. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "ago. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "sept. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "oct. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "nov. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "mar. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "abr. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "may. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jun. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "jul. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "ago. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "sept. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "oct. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "nov. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Egypt", departure: "nov. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/243?sid=42632&language=es&currency=USD" },
                    { destination: "Egypt", departure: "dic. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/243?sid=42632&language=es&currency=USD" },
                    { destination: "Egypt", departure: "mar. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/243?sid=42632&language=es&currency=USD" },
                    { destination: "Egypt", departure: "abr. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/243?sid=42632&language=es&currency=USD" },
                    { destination: "Egypt", departure: "nov. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/243?sid=42632&language=es&currency=USD" },
                    { destination: "Egypt", departure: "dic. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/243?sid=42632&language=es&currency=USD" },
                    { destination: "Israel", departure: "nov. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/465?sid=42632&language=es&currency=USD" },
                    { destination: "Israel", departure: "dic. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/465?sid=42632&language=es&currency=USD" },
                    { destination: "Israel", departure: "mar. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/465?sid=42632&language=es&currency=USD" },
                    { destination: "Israel", departure: "abr. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/465?sid=42632&language=es&currency=USD" },
                    { destination: "Israel", departure: "nov. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/465?sid=42632&language=es&currency=USD" },
                    { destination: "Israel", departure: "dic. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/465?sid=42632&language=es&currency=USD" },
                    { destination: "Cyprus", departure: "nov. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/171?sid=42632&language=es&currency=USD" },
                    { destination: "Cyprus", departure: "dic. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/171?sid=42632&language=es&currency=USD" },
                    { destination: "Cyprus", departure: "mar. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/171?sid=42632&language=es&currency=USD" },
                    { destination: "Cyprus", departure: "abr. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/171?sid=42632&language=es&currency=USD" },
                    { destination: "Cyprus", departure: "nov. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/171?sid=42632&language=es&currency=USD" },
                    { destination: "Cyprus", departure: "dic. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/171?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "abr. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "may. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "jun. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "jul. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "ago. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "sept. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "oct. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "nov. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "dic. 2021", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "mar. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "abr. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "may. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "jun. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "jul. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "ago. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "sept. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "oct. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "nov. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "dic. 2022", duration: "7 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "abr. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "may. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "jun. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "jul. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "ago. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "sept. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "oct. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "nov. 2021", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "mar. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "abr. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "may. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "jun. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "jul. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "ago. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "sept. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "oct. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "nov. 2022", duration: "3 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "abr. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "may. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "jun. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "jul. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "ago. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "sept. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "oct. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "nov. 2021", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "mar. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "abr. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "may. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "jun. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "jul. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "ago. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "sept. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "oct. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "nov. 2022", duration: "4 Noches", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                ];
               }  else if (theLanguage == 'en-blk') {
                jsonList = [
                    { destination: "Greece & Greek Islands", departure: "April 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "May 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "June 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "July 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "August 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "September 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "October 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "May 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "June 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "July 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "August 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "September 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "October 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "April 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "May 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "June 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "July 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "August 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "September 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "October 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "November 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "March 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "April 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "May 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "June 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "July 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "August 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "September 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "October 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "November 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "April 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "May 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "June 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "July 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "August 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "September 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "October 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "November 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "March 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "April 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "May 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "June 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "July 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "August 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "September 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "October 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "November 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Egypt", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/243?sid=42712&language=en&currency=EUR" },
                    { destination: "Egypt", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/243?sid=42712&language=en&currency=EUR" },
                    { destination: "Egypt", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/243?sid=42712&language=en&currency=EUR" },
                    { destination: "Egypt", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/243?sid=42712&language=en&currency=EUR" },
                    { destination: "Egypt", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/243?sid=42712&language=en&currency=EUR" },
                    { destination: "Egypt", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/243?sid=42712&language=en&currency=EUR" },
                    { destination: "Israel", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/465?sid=42712&language=en&currency=EUR" },
                    { destination: "Israel", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/465?sid=42712&language=en&currency=EUR" },
                    { destination: "Israel", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/465?sid=42712&language=en&currency=EUR" },
                    { destination: "Israel", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/465?sid=42712&language=en&currency=EUR" },
                    { destination: "Israel", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/465?sid=42712&language=en&currency=EUR" },
                    { destination: "Israel", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/465?sid=42712&language=en&currency=EUR" },
                    { destination: "Cyprus", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/171?sid=42712&language=en&currency=EUR" },
                    { destination: "Cyprus", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/171?sid=42712&language=en&currency=EUR" },
                    { destination: "Cyprus", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/171?sid=42712&language=en&currency=EUR" },
                    { destination: "Cyprus", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/171?sid=42712&language=en&currency=EUR" },
                    { destination: "Cyprus", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/171?sid=42712&language=en&currency=EUR" },
                    { destination: "Cyprus", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/171?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "April 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "May 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "June 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "July 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "August 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "September 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "October 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "May 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "June 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "July 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "August 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "September 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "October 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "April 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "May 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "June 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "July 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "August 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "September 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "October 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "November 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "March 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "April 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "May 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "June 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "July 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "August 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "September 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "October 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "November 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "April 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "May 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "June 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "July 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "August 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "September 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "October 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "November 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "March 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "April 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "May 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "June 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "July 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "August 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "September 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "October 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "November 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42712&language=en&currency=EUR" },
                ];
               } else if (theLanguage == 'en-eu') {
                jsonList = [
                    { destination: "Greece & Greek Islands", departure: "April 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "May 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "June 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "July 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "August 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "September 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "October 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "May 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "June 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "July 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "August 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "September 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "October 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "April 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "May 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "June 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "July 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "August 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "September 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "October 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "November 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "March 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "April 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "May 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "June 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "July 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "August 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "September 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "October 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "November 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "April 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "May 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "June 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "July 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "August 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "September 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "October 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "November 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "March 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "April 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "May 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "June 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "July 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "August 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "September 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "October 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Greece & Greek Islands", departure: "November 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Egypt", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/243?sid=42064&language=en&currency=EUR" },
                    { destination: "Egypt", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/243?sid=42064&language=en&currency=EUR" },
                    { destination: "Egypt", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/243?sid=42064&language=en&currency=EUR" },
                    { destination: "Egypt", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/243?sid=42064&language=en&currency=EUR" },
                    { destination: "Egypt", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/243?sid=42064&language=en&currency=EUR" },
                    { destination: "Egypt", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/243?sid=42064&language=en&currency=EUR" },
                    { destination: "Israel", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/465?sid=42064&language=en&currency=EUR" },
                    { destination: "Israel", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/465?sid=42064&language=en&currency=EUR" },
                    { destination: "Israel", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/465?sid=42064&language=en&currency=EUR" },
                    { destination: "Israel", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/465?sid=42064&language=en&currency=EUR" },
                    { destination: "Israel", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/465?sid=42064&language=en&currency=EUR" },
                    { destination: "Israel", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/465?sid=42064&language=en&currency=EUR" },
                    { destination: "Cyprus", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/171?sid=42064&language=en&currency=EUR" },
                    { destination: "Cyprus", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/171?sid=42064&language=en&currency=EUR" },
                    { destination: "Cyprus", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/171?sid=42064&language=en&currency=EUR" },
                    { destination: "Cyprus", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/171?sid=42064&language=en&currency=EUR" },
                    { destination: "Cyprus", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/171?sid=42064&language=en&currency=EUR" },
                    { destination: "Cyprus", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/171?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "April 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "May 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "June 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "July 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "August 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "September 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "October 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "May 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "June 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "July 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "August 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "September 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "October 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "April 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "May 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "June 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "July 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "August 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "September 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "October 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "November 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "March 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "April 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "May 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "June 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "July 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "August 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "September 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "October 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "November 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "April 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "May 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "June 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "July 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "August 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "September 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "October 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "November 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "March 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "April 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "May 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "June 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "July 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "August 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "September 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "October 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                    { destination: "Turkey", departure: "November 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42064&language=en&currency=EUR" },
                ];
               } else if (theLanguage == 'es-mx' || theLanguage == 'es-co' || theLanguage == 'es-cl') {
                jsonList = [
                    { destination: "Greece & Greek Islands", departure: "April 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "May 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "June 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "July 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "August 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "September 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "October 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "May 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "June 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "July 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "August 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "September 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "October 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "April 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "May 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "June 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "July 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "August 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "September 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "October 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "November 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "March 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "April 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "May 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "June 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "July 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "August 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "September 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "October 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "November 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "April 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "May 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "June 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "July 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "August 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "September 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "October 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "November 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "March 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "April 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "May 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "June 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "July 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "August 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "September 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "October 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Greece & Greek Islands", departure: "November 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Egypt", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/243?sid=42632&language=es&currency=USD" },
                    { destination: "Egypt", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/243?sid=42632&language=es&currency=USD" },
                    { destination: "Egypt", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/243?sid=42632&language=es&currency=USD" },
                    { destination: "Egypt", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/243?sid=42632&language=es&currency=USD" },
                    { destination: "Egypt", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/243?sid=42632&language=es&currency=USD" },
                    { destination: "Egypt", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/243?sid=42632&language=es&currency=USD" },
                    { destination: "Israel", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/465?sid=42632&language=es&currency=USD" },
                    { destination: "Israel", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/465?sid=42632&language=es&currency=USD" },
                    { destination: "Israel", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/465?sid=42632&language=es&currency=USD" },
                    { destination: "Israel", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/465?sid=42632&language=es&currency=USD" },
                    { destination: "Israel", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/465?sid=42632&language=es&currency=USD" },
                    { destination: "Israel", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/465?sid=42632&language=es&currency=USD" },
                    { destination: "Cyprus", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/171?sid=42632&language=es&currency=USD" },
                    { destination: "Cyprus", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/171?sid=42632&language=es&currency=USD" },
                    { destination: "Cyprus", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/171?sid=42632&language=es&currency=USD" },
                    { destination: "Cyprus", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/171?sid=42632&language=es&currency=USD" },
                    { destination: "Cyprus", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/171?sid=42632&language=es&currency=USD" },
                    { destination: "Cyprus", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/171?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "April 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "May 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "June 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "July 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "August 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "September 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "October 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "May 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "June 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "July 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "August 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "September 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "October 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "April 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "May 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "June 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "July 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "August 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "September 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "October 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "November 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "March 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "April 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "May 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "June 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "July 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "August 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "September 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "October 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "November 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "April 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "May 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "June 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "July 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "August 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "September 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "October 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "November 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "March 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "April 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "May 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "June 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "July 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "August 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "September 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "October 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                    { destination: "Turkey", departure: "November 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42632&language=es&currency=USD" },
                ];
               }
                else { 
            jsonList = [
                { destination: "Greece & Greek Islands", departure: "April 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "May 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "June 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "July 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "August 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "September 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "October 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "May 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "June 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "July 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "August 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "September 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "October 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "April 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "May 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "June 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "July 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "August 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "September 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "October 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "November 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "March 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "April 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "May 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "June 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "July 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "August 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "September 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "October 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "November 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "April 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "May 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "June 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "July 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "August 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "September 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "October 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "November 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "March 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "April 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "May 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "June 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "July 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "August 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "September 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "October 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Greece & Greek Islands", departure: "November 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Egypt", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/243?sid=42076&language=en&currency=USD" },
                { destination: "Egypt", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/243?sid=42076&language=en&currency=USD" },
                { destination: "Egypt", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/243?sid=42076&language=en&currency=USD" },
                { destination: "Egypt", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/243?sid=42076&language=en&currency=USD" },
                { destination: "Egypt", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/243?sid=42076&language=en&currency=USD" },
                { destination: "Egypt", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/243?sid=42076&language=en&currency=USD" },
                { destination: "Israel", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/465?sid=42076&language=en&currency=USD" },
                { destination: "Israel", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/465?sid=42076&language=en&currency=USD" },
                { destination: "Israel", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/465?sid=42076&language=en&currency=USD" },
                { destination: "Israel", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/465?sid=42076&language=en&currency=USD" },
                { destination: "Israel", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/465?sid=42076&language=en&currency=USD" },
                { destination: "Israel", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/465?sid=42076&language=en&currency=USD" },
                { destination: "Cyprus", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/171?sid=42076&language=en&currency=USD" },
                { destination: "Cyprus", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/171?sid=42076&language=en&currency=USD" },
                { destination: "Cyprus", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/171?sid=42076&language=en&currency=USD" },
                { destination: "Cyprus", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/171?sid=42076&language=en&currency=USD" },
                { destination: "Cyprus", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/2/495/3712/_/6273/171?sid=42076&language=en&currency=USD" },
                { destination: "Cyprus", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/171?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "April 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "May 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "June 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "July 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "August 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "September 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "October 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "November 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "December 2021", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2021-12-01/2021-12-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "March 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "April 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "May 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "June 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "July 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "August 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "September 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "October 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "November 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-11-30/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "December 2022", duration: "7 nights", search: "http://book.celestyal.com/search/cruise/results/2022-12-01/2022-12-31/2/495/3712/_/6273/_?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "April 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "May 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "June 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "July 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "August 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "September 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "October 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "November 2021", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "March 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "April 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "May 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "June 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "July 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "August 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "September 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "October 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "November 2022", duration: "3 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/596?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "April 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-04-01/2021-04-30/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "May 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-05-01/2021-05-31/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "June 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-06-01/2021-06-30/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "July 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-07-01/2021-07-31/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "August 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-08-01/2021-08-31/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "September 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-09-01/2021-09-30/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "October 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-10-01/2021-10-31/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "November 2021", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2021-11-01/2021-11-30/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "March 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-03-01/2022-03-31/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "April 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-04-01/2022-04-30/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "May 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-05-01/2022-05-31/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "June 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-06-01/2022-06-30/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "July 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-07-01/2022-07-31/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "August 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-08-01/2022-08-31/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "September 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-09-01/2022-09-30/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "October 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-10-01/2022-10-31/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
                { destination: "Turkey", departure: "November 2022", duration: "4 nights", search: "http://book.celestyal.com/search/cruise/results/2022-11-01/2022-11-30/1/495/3498/_/6273/266?sid=42076&language=en&currency=USD" },
            ];
        }

            var depSelect = $('.departure-select');
            var durSelect = $('.duration-select');
            var search = $('#search-filter');

            depSelect.siblings('.select-styled').addClass('disabled');
            durSelect.siblings('.select-styled').addClass('disabled');
            search.addClass('disabled');

            $('.destination-select li').click( function () {
                var val = $(this).attr('rel');
                var tempList = jsonList.filter( function(item) {
                    return item.destination === val;
                });
                var count = Object.keys(tempList).length;
                var departureOptions = [];
                var linkLanguage;
                switch (theLanguage) {
                    case 'fr-FR':
                        linkLanguage = 'Sélectionner';
                        break;
                    case 'nl-DE':
                        linkLanguage = 'Wählen';
                        break;
                    case 'el-GR':
                        linkLanguage = 'Επιλέγω';
                        break;
                    case 'es-ES':
                    linkLanguage = 'Seleccionar';
                        break;
                    case 'pt-br':
                        linkLanguage = 'Selecionar';
                        break;
                    case 'es-ar':
                    linkLanguage = 'Selecionar';
                    break;
                    case 'es-mx':
                    linkLanguage = 'Seleccionar';
                        break;
                    case 'es-co':
                    linkLanguage = 'Seleccionar';
                        break;
                    default:
                        linkLanguage = 'Select';
                        break;
                }
                depSelect.siblings('.select-styled').text(linkLanguage).removeClass('disabled');
                durSelect.siblings('.select-styled').text(linkLanguage).addClass('disabled');
                search.addClass('disabled');

                for (var i = 0; i < count; i++) {
                    if (!departureOptions.includes(tempList[i].departure)) {
                        departureOptions.push(tempList[i].departure);
                    }
                }

                depSelect.html(departureOptions.map( function(item) {
                    return '<li rel="' + item + '" value="' + item + '">' + item + '</li>';
                }));

                $('.departure-select li').click(function () {
                    var val = $(this).attr('rel');
                    var tempList2 = tempList.filter(function(item) {
                        return item.departure === val;
                    });
                    var count = Object.keys(tempList2).length;
                    var durationOptions = [];

                    durSelect.siblings('.select-styled').text(linkLanguage).removeClass('disabled');
                    search.addClass('disabled');

                    for (var i = 0; i < count; i++) {
                        if (!durationOptions.includes(tempList2[i].duration)) {
                            durationOptions.push(tempList2[i].duration);
                        }
                    }

                    durSelect.html(durationOptions.map( function(item) {
                        return '<li rel="' + item + '" value="' + item + '">' + item + '</li>';
                    }));


                    $(this).parent().siblings('.select-styled').text($(this).text()).removeClass('active');

                    $('.duration-select li').click(function () {
                        var val = $(this).attr('rel');

                        var tempList3 = tempList2.reduce( function(retVal, item) {
                            if (item.duration === val) {
                                retVal = item;
                            }
                            return retVal;
                        }, null);

                        search.attr('href', tempList3.search).removeClass('disabled');
                        $(this).parent().siblings('.select-styled').text($(this).text()).removeClass('active');
                    });
                });
            });
        }
    };

    var selectStyle = {

        init: function () {
            selectStyle.functionality();
        },

        functionality: function () {
            $('select').each(function () {
                var $this = $(this),
                    numberOfOptions = $(this).children('option').not('.hidden').length;

                var id = $(this).attr('id');

                $this.addClass('select-hidden');
                $this.wrap('<div class="select"></div>');
                $this.after('<div class="select-styled"></div>');

                var $styledSelect = $this.next('div.select-styled');
                $styledSelect.text($this.children('option:selected').text());

                var $list = $('<ul />', {
                    'class': 'select-options ' + id
                }).insertAfter($styledSelect);

                for (var i = 0; i < numberOfOptions; i++) {
                    $('<li />', {
                        text: $this.children('option').not('.hidden').eq(i).text(),
                        rel: $this.children('option').not('.hidden').eq(i).val()
                    }).appendTo($list);
                }

                var $listItems = $list.children('li');

                $styledSelect.click(function (e) {
                    e.stopPropagation();
                    if ($('div.select-styled').hasClass('active')) {
                        $(this).removeClass('active').next('ul.select-options').slideUp();
                    }
                    else {
                        $(this).addClass('active').next('ul.select-options').slideDown();
                    }
                });

                $listItems.click(function (e) {
                    e.stopPropagation();
                    $styledSelect.text($(this).text()).removeClass('active');
                    $this.val($(this).attr('rel'));
                    $this.trigger('change');
                    $list.slideUp();
                });

                $(document).click(function () {
                    $styledSelect.removeClass('active');
                    $list.slideUp();
                });

            });
        },
    };

    var responsiveMenu = {

        init: function () {
            responsiveMenu.mobile();
            responsiveMenu.desktop();
            responsiveMenu.top();
        },

        top : function () {
            var closeMenu;
            var menu = $('.top-navigation .menu');
            var trigger = $('.top-navigation .menu > .menu-item');

            $(document).bind('click', function(e) {
                if($(e.target).closest(menu).length === 0) {
                    menu.find('.menu-item').removeClass('active');
                    trigger.find('.sub-menu').hide();
                }
            });

            trigger.mouseenter(function() {
                var current = $(this);

                current.addClass('active').find('.sub-menu').css('display', 'flex');

                clearTimeout(closeMenu);
            });

            trigger.mouseleave(function() {
                var current = $(this);
                closeMenu = setTimeout(function() {
                    current.removeClass('active').find('.sub-menu').hide();
                }, 1200);
            });
        },

        mobile: function () {
            var _menuTrigger = $('[data-menu-trigger]');
            var _menuAndItems = $('.mobile-menu ul.menu, .site-header li.menu-item-has-children');
            var _menuTriggerFirstLevel = $('.mobile-menu ul.menu > .menu-item-has-children > .sub-menu-d-wrapper > .sub-menu-trigger');
            var _menuTriggerSecondLevel = $('.mobile-menu ul.menu > .menu-item-has-children > .sub-menu-d-wrapper > .submenu-wrap > .sub-menu > .menu-item-has-children > .sub-menu-trigger');
            var _menuTriggerThirdLevel = $('.mobile-menu ul.menu > .menu-item-has-children > .sub-menu-d-wrapper > .submenu-wrap > .sub-menu > .menu-item-has-children > .submenu-wrap > .sub-menu > .menu-item-has-children > .sub-menu-trigger');
            var _menuList = _menuTriggerFirstLevel.closest('ul.menu');

            _menuTriggerFirstLevel.on('click', function (e) {
                e.stopPropagation();
                var _parentMenuItem = $(this).closest('li.menu-item-has-children');
                var _siblingMenuItem = $(this).parent().siblings('li.menu-item-has-children');

                _parentMenuItem.toggleClass('open');
                _menuList.toggleClass('opened').find('.sub-menu li.menu-item-has-children').removeClass('open');
                _siblingMenuItem.removeClass('open');
            });

            _menuTriggerSecondLevel.on('click', function (e) {
                e.stopPropagation();
                var _parentMenuItem = $(this).closest('li.menu-item-has-children');
                var _siblingMenuItem = $(this).parent().siblings('li.menu-item-has-children');

                _parentMenuItem.toggleClass('open');
                _siblingMenuItem.removeClass('open');
            });

            _menuTriggerThirdLevel.on('click', function (e) {
                e.stopPropagation();
                var _parentMenuItem = $(this).closest('li.menu-item-has-children');
                var _siblingMenuItem = $(this).parent().siblings('li.menu-item-has-children');

                _parentMenuItem.toggleClass('open');
                _siblingMenuItem.removeClass('open');
            });

            $(document).on('click', function () {
                _menuAndItems.removeClass('open opened');
            });

            _menuTrigger.on('click', function () {
                _menuAndItems.removeClass('open opened');
            });
        },

        desktop: function () {
            var menu = $('.desktop-menu .menu');
            var menuItem = $('.desktop-menu .menu .menu-item');
            var trigger = $('.desktop-menu .menu .menu-item-has-children');
            var triggerFirstLevel = $('.desktop-menu .menu > .menu-item-has-children');
            var triggerSecondLevel = $('.desktop-menu .menu > .menu-item-has-children .sub-menu > .menu-item-has-children');
            var submenu = $('.desktop-menu .menu .sub-menu .menu-item-has-children');
            var closeMenu;
            var biggestHeight = 0;

            submenu.each(function(){
                $(this).wrapInner('<div class="item-wrap"></div>');
            });

            $(document).bind('click', function(e) {
                if($(e.target).closest(menu).length === 0) {
                    menu.find('.menu-item').removeClass('active');
                    trigger.find('.sub-menu').hide();
                    menu.find('.sub-menu-d-wrapper').height(0);
                }
            });

            trigger.find('.sub-menu').hide();

            trigger.mouseleave(function() {
                biggestHeight = 0;
            }).mouseenter(function() {
                var current = $(this);
                current.siblings('.menu-item-has-children').removeClass('active').find('.sub-menu').hide();
                current.addClass('active').find('.submenu-wrap').first().children('.sub-menu').css('display', 'inline-flex');
                clearTimeout(closeMenu);
            });


            triggerFirstLevel.mouseleave(function() {
                biggestHeight = 0;
                var current = $(this);

                $(this).find('.sub-menu-d-wrapper').css('min-height', '0');
                closeMenu = setTimeout(function() {
                    current.find('.sub-menu-d-wrapper').height(0);
                    trigger.find('.sub-menu').hide();
                }, 400);

            }).mouseenter(function() {
                var minHeight = $(this).find('.sub-menu-d-wrapper > .submenu-wrap > .sub-menu').actual('height');

                $(this).siblings().find('.sub-menu-d-wrapper').height(0);

                $(this).find('.sub-menu').each(function(){
                    if ($(this).actual('height') > biggestHeight ) {
                        biggestHeight = $(this).actual('height');
                    }
                });

                $(this).find('.sub-menu-d-wrapper').height(biggestHeight + 60).css('min-height', minHeight + 60);

            });

            triggerSecondLevel.mouseleave(function() {
                var current = $(this);

                closeMenu = setTimeout(function() {
                    current.removeClass('active').find('.sub-menu').hide();
                }, 400);

            });

            menuItem.mouseenter(function() {
                $(this).siblings().find('.sub-menu-d-wrapper').height(0);

                $(this).find('.sub-menu').each(function(){
                    if ($(this).actual('height') > biggestHeight ) {
                        biggestHeight = $(this).actual('height');
                    }
                });

                $(this).closest('.sub-menu-d-wrapper').height(biggestHeight + 60);
            });
        }
    };

    var accordions = {

        init: function () {
            accordions.activate();
            accordions.footer();
            accordions.cruise();
        },

        activate: function () {
            var intro = document.getElementsByClassName('m-accordion__intro');

            for (var i = 0; i < intro.length; i++) {
                intro[i].addEventListener('click', function () {
                    var content = this.nextElementSibling;
                    this.parentNode.classList.toggle('active');

                    if (content && content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                });
            }
        },

        footer: function () {
            var trigg = $('.js-accTrigg');
            var list = $('.js-accList');
            var $window = $(window);

            function checkWidth() {
                var windowsize = $window.width();

                if (windowsize < 760) {
                    list.removeClass('active').slideUp();
                } else {
                    list.slideDown();
                }
            }

            checkWidth();
            $(window).resize(checkWidth);

            trigg.click(function(j) {
                var dropDown = $(this).closest('.js-accordion').find(list);

                $(this).closest(list).not(dropDown).slideUp();

                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                } else {
                    $(this).addClass('active');
                }

                dropDown.stop(false, true).slideToggle();
                j.preventDefault();
            });
        },

        cruise: function () {
            var acc = $('.acc');
            var country = $('.-country');
            var show = $('.filter-cruise li:nth-child(n+2)');
            var $window = $(window);
            var windowsize = $window.width();
            var hide = $('.acc.hide');

            function checkWidth() {
                if (windowsize < 760) {
                    country.addClass('mob');
                    acc.on('click',function () {
                        show.toggle();
                        if ($( '.acc .js-accTrigg').css( 'transform' ) == 'none' ){
                            $('.acc .js-accTrigg').css('transform','rotate(-180deg)');
                        } else {
                            $('.acc .js-accTrigg').css('transform','' );
                        }
                    });

                    show.on('click',function () {
                        $('.acc .js-accTrigg').removeClass('active',200);
                        show.toggle();
                        if ($( '.acc .js-accTrigg').css( 'transform' ) == 'none' ){
                            $('.acc .js-accTrigg').css('transform','rotate(-180deg)');
                        } else {
                            $('.acc .js-accTrigg').css('transform','' );
                        }
                        acc.html(this.innerHTML + '<i class="fa fa-chevron-down js-accTrigg"></i>');
                    });

                } else {
                    country.removeClass('mob');
                    hide.css('display','none');
                }
            }
            checkWidth();
            $(window).resize(checkWidth);
        }
    };

    var form = {

        init:function () {
            form.submit();
        },

        submit: function () {
            var submit = $('.m-contact .wpcf7-submit');
            var company = $('#company');

            $('.-touch').hide();

            submit.on('click', function () {
                var name = $('#name').val();
                var newStr = company.html().replace('[Your Name]', name);

                $('.wpcf7, .-help').hide();
                $('.-touch').show();
                $('.form-g').hide();
                company.html(newStr);
                $('html').animate({ scrollTop: 500 });
            });
        }
    };

    var guide = {

        init:function () {
            guide.submit();
        },

        submit: function () {
            var submit = $('#guide');

            $('.form-g').hide();

            submit.on('click', function () {
                $('.wpcf7, .-help').hide();
                $('.form-g').show();
                $('.-touch').hide();
                $('html').animate({ scrollTop: 500 });
            });
        }
    };

    var deck = {

        init:function () {
            deck.change();
            this.stateroomRepeaters =  $('.stateroom_repeater');
            this.shipImages = $('.ship_image');
        },

        stateroomRepeaters: null,
        shipImages:null,

        change: function () {
            var self = this;

            $('#deck-select').change(function () {
                self.stateroomRepeaters.addClass('fade');
                $('.stateroom_repeater_'+$(this).val()).removeClass('fade');
                self.shipImages.addClass('fade');
                $('.ship_image_'+$(this).val()).removeClass('fade');
            });
        }
    };

    var login = {

        init:function () {
            login.submit();
            this.manage = $('.-manage');
        },

        submit: function () {
            var self = this;

            $('.-booking:first').click(function () {
                self.manage.addClass('fade');
                $('.-login').css('display','block');
            });
        }
    };

    var cruiseFilter = {
        init: function() {
            cruiseFilter.filt();
        },

        filt: function() {
            $('.nd-cr').css({"height": "0", "opacity": "0","z-index":"-1"});
            $('.incl #1').on('click',function(){
                $('.incl #2').removeClass('active');
                $(this).addClass('active');
                $('.nd-cr').css({"height": "0", "opacity": "0"});
                $('.fs-cr').css({"height": "auto", "opacity": "1"});
            })
            $('.incl #2').on('click',function(){
                $('.incl #1').removeClass('active');
                $(this).addClass('active');
                $('.fs-cr').css({"height": "0", "opacity": "0"});
                $('.nd-cr').css({"height": "auto", "opacity": "1","z-index":"0"});
            })
        }
    }

    var sliderFilter = {

        init: function () {
            sliderFilter.filter();
            sliderFilter.cruise();
            sliderFilter.included();
            sliderFilter.map();
        },

        filter: function () {
            $(document).on('click', '.filter li', function(){
                $('.filter li').removeClass('active');
                $(this).addClass('active');
                var cat = $(this).attr('data-category');
                if(cat !== 'all'){
                    $('.item-slider').slick('slickUnfilter');
                    $('.item-slider div').each(function(){
                        $(this).removeClass('slide-shown');
                    });
                    $('.item-slider div[data-match='+ cat +']').addClass('slide-shown');
                    $('.item-slider').slick('slickFilter', '.slide-shown');
                }
                else {
                    $('.item-slider div').each(function(){
                        $(this).removeClass('slide-shown');
                    });
                    $('.item-slider').slick('slickUnfilter');
                }

            });
        },

        cruise: function () {
            $(document).on('click', '.filter-cruise li', function(){
                $('.filter-cruise li').removeClass('active');
                $(this).addClass('active');
                var cat = $(this).attr('data-category');
                if(cat !== 'all'){
                    $('.cruise-slider').slick('slickUnfilter');
                    $('.cruise-slider div').each(function(){
                        $(this).removeClass('slide-shown');
                    });
                    $('.cruise-slider div[data-match="'+ cat +'"]').addClass('slide-shown');
                    $('.cruise-slider').slick('slickFilter', '.slide-shown');
                }
                else {
                    $('.cruise-slider div').each(function(){
                        $(this).removeClass('slide-shown');
                    });
                    $('.cruise-slider').slick('slickUnfilter');
                }
            });
        },

        included: function () {
            $(document).on('click', '.filter-included li', function(){
                $('.filter-included li').removeClass('active');
                $(this).addClass('active');
                var cat = $(this).attr('data-category');
                if(cat !== 'all'){
                    $('.include-slider').slick('slickUnfilter');
                    $('.include-slider div').each(function(){
                        $(this).removeClass('slide-shown');
                    });
                    $('.include-slider div[data-match="'+ cat +'"]').addClass('slide-shown');
                    $('.include-slider').slick('slickFilter', '.slide-shown');
                }
                else {
                    $('.include-slider div').each(function(){
                        $(this).removeClass('slide-shown');
                    });
                    $('.include-slider').slick('slickUnfilter');
                }
            });
        },

        map: function () {
            $(document).on('click', '.icons .icon', function(){
                $('.icons .icon').removeClass('active');
                $(this).addClass('active');
                var cat = $(this).attr('data-category');
                $('.js-oneHalf').slick('slickGoTo',parseInt(cat) - 1);
            });
        }
    };

    var stateroom = {

        init: function () {
            stateroom.tabs();
        },

        tabs: function () {
            var parentTab = $('.js-suites a.tab');
            var parentContent = $('.js-parentContent');
            var childTab = $('.js-suitesChild a.tab');
            var childContent = $('.js-childContent');
            var childImage = $('.js-childImage');

            parentTab.first().addClass('active');
            parentTab.not(':first').addClass('inactive');
            parentContent.hide();
            parentContent.first().show();

            childTab.first().addClass('active');
            childTab.not(':first').addClass('inactive');
            childContent.hide();
            childContent.first().show();
            childImage.hide();
            childImage.first().show();

            parentTab.click(function(e){
                e.preventDefault();
                var t = $(this).attr('data-id');

                if($(this).hasClass('inactive')){
                    var content = $('[data-id='+ t + 'C]');

                    parentTab.addClass('inactive').removeClass('active');
                    $(this).addClass('active').removeClass('inactive');
                    parentContent.hide();

                    content.fadeIn();
                    content.find(childTab).first().addClass('active');
                    content.find(childTab).not(':first').addClass('inactive').removeClass('active');
                    content.find(childContent).hide();
                    content.find(childContent).first().show();
                    content.find(childImage).hide();
                    content.find(childImage).first().show();
                }
            });

            childTab.click(function(e){
                e.preventDefault();
                var j = $(this).attr('data-trig');

                if($(this).hasClass('inactive')){
                    childTab.addClass('inactive').removeClass('active');
                    $(this).addClass('active').removeClass('inactive');

                    childContent.hide();
                    childImage.hide();
                    $('[data-trig='+ j + 'C]').fadeIn();
                }
            });
        }
    };

    var cruiseModal = {
        init: function () {
            cruiseModal.modal();
        },

        modal: function () {
            var elements = $('.modal-overlay, .modal');
            $('.pop').click(function(e){
                e.preventDefault();
                elements.addClass('active');
            });
            $('.close-modal').click(function(){
                elements.removeClass('active');
            });
        }
    };

    var destination = {
        init: function () {
            destination.show();
        },

        show: function () {
            var elem = $('.-more');
            $('.show').click(function () {
                elem.animate({
                    height: elem.get(0).scrollHeight
                }, 500, function(){
                    $(this).height('auto');
                    $('.show').css('opacity',0);
                });
            });

        },
    };

    var destMob = {
        init:function () {
            destMob.show();
        },

        show: function () {
            var $window = $(window);
            var windowsize = $window.width();
            var cat = $('.cat');
            var catMob = $('.cat-mob');

            function checkWidth() {
                if (windowsize < 760) {
                    $('.filter.desk').remove();
                    cat.addClass('js-cardSlider');
                    catMob.addClass('js-cardSlide');
                    $('.cat .m-nav').css('display','block');
                } else {
                    cat.removeClass('js-cardSlider');
                    catMob.removeClass('js-cardSlide');
                    $('.cat .m-nav').css('display','none');
                }
            }

            checkWidth();
            $(window).resize(checkWidth);
        }
    };

    $(document).ready(function () {
        cruiseFilter.init();
        destMob.init();
        destination.init();
        cruiseModal.init();
        siteFunctions.init();
        siteMenu.init();
        slickSliders.init();
        clickDrop.init();
        selectStyle.init();
        responsiveMenu.init();
        accordions.init();
        form.init();
        guide.init();
        deck.init();
        login.init();
        sliderFilter.init();
        stateroom.init();
        search.init();

        $(window).scroll(debounce(function () {
            siteHeader.scrollChange();
        }));
    });

    $(window).on('load', function () {

    });
}(jQuery));
