$(document).ready(function() {

	/** 
	 * jQuery fullPagejs
	 */
    $('#fullpage').fullpage({
        anchors: ['home', 'heading', 'about-us', 'venue', 'registry', 'rsvp'],
        menu: '#nav',
        loopTop: false,
        loopBottom: false,
        slidesNavigation: true,
        scrollOverflow: true,
        css3: true,
        scrollBar: true,
        afterLoad: function() {
           // $(this).find('h1').addClass('animated fadeInDownBig');

           // Hide navigation bar
           $('.nav').removeClass('show');
        },
        onLeave: function() {
          //  $(this).find('h1').removeClass('animated fadeInDownBig');
        }
    });


    /** 
     * Accordion
     */
    $('.accordion-content').hide();

    $('.accordion-item').on('click', 'h2', function(e) {
        e.preventDefault();
        $(this)
            .scrollTop(1000)
            .toggleClass('accordion-active')
            .siblings('.accordion-content').slideToggle('fast')
        .end()
            .parent('li')
                .siblings('li').find('h2').removeClass('accordion-active')
                .siblings('.accordion-content').slideUp('fast');
    });


    // Sticky Header
    $(window).scroll(function(){
        if ($(window).scrollTop() >= 100) {
            $('.header').addClass('sticky');
        }
        else {
            $('.header').removeClass('sticky');
        }
    });


    // mobile menu icon toggler
    function mobileIconToggle() {
        var mobileMenu = $('.mobile-menu');
        mobileMenu.find('.fa').toggleClass('fa-bars');
        mobileMenu.find('.fa').toggleClass('fa-times');
    }

    // Mobile Menu
    $('body').on('click', '.mobile-menu', function(e) {
        e.preventDefault();

        // Toggle navigation
        $('.nav').toggleClass('show');

        // Add animation
        $('.nav').toggleClass('fadeInDown');

        // Toggle Menu Icon
        mobileIconToggle();

    });

    $('.nav').on('click', 'a', function(e) {
        
        $(this).closest('.nav').toggleClass('show');
        mobileIconToggle();
    });


});