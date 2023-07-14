/*------------------------------------------------------------------
[Main JavaScript file]

    Project:    Wedge - Personal Website, Portfolio, Resume HTML Template
    Version:    1.0
    Created on:    14/03/2020 
    Last change:    15/03/2020 [Performance improvements]
-------------------------------------------------------------------*/

$(function(){
    "use strict";

    /****** Variables ********/
    var body = $('body'), mainHeader = $('#main-header'), menuBtn = $('#menu-button'), mainNavBar = $('#main-nav'), contactForm = $('#contact-form'), contactFormLoader = $('#contact-form-message-sending'), contactFormMessageSentElm = $('#contact-form-message-sent'), contactFormMessageFailElm = $('#contact-form-message-fail'), productLinkCover = $('#product-link-cover'), blurElements = $('#website-logo, main, footer, #dark-mode-control'), testimonial = $('.testimonial', '#testimonials-body'), contactFormFieldMessages = $('.contact-form-field-message', '#contact-form-body'), darkModeCheckInterval = null;

    /****** Functions ********/

    // Functions for smooth scroll
    function smoothScroll(targetOffset){
        $('html, body').animate({
            scrollTop: targetOffset
        },100);
    }

    function scrollToTarget(e, _this){
        var target = $(_this.attr('href')), extraPixels = 80, targetOffset;
        e.preventDefault();
        
        // If one of the main navigation link is clicked
        if( _this.parents('#main-header').length == 1 ){
            // 1. Add active class on clicked link
            mainNavBar.find('a').removeClass('active');
            _this.addClass('active');

            // 2. On small screen devices hide the main navigation
            if( _this.parent(mainNavBar).hasClass('show') ){
                hideMainNavigation();
                extraPixels = 20;
            }
        }

        if( _this.parents('#services-cover').length == 1 ){

            if( menuBtn.is(':visible') ){
                extraPixels = 20;
            }else{
                extraPixels = 80;
            }
        }

        // Scroll to target section
        targetOffset = target.offset().top - mainHeader.outerHeight() + extraPixels;

        if( target.length > 0 ){
            smoothScroll( targetOffset );
        }
    }

    // Function to show or hide main navigation menu
    function showOrHideMainNavigation(){
        body.toggleClass('overflow-hidden');
        menuBtn.toggleClass('shift-right');
        mainNavBar.toggleClass('show');

        blurElements.toggleClass('blur');
    }

    // Function to hide main navigation menu
    function hideMainNavigation(){
        body.removeClass('overflow-hidden');
        menuBtn.removeClass('shift-right');
        mainNavBar.toggleClass('show');

        blurElements.removeClass('blur');
    }

    // Function to slide and show new testimonial
    function switchTestimonial(dir){
        var currentActiveTestimonial = 0;
        var currentActiveTestimonialIndex = testimonial.index($('.testimonial.active'));
        var totalTestimonials = testimonial.length, newIndex;

        if( dir == 'right' ){
            newIndex = currentActiveTestimonialIndex + 1;
        }
        else{
            newIndex = currentActiveTestimonialIndex - 1;
        }

        if( totalTestimonials > 1 ){
            currentActiveTestimonial = newIndex % totalTestimonials;
            testimonial.removeClass('active');
            testimonial.eq(currentActiveTestimonial).addClass('active');
        }
    }

    // Function to show "field value required" message
    function showContactFormFieldMessage(fieldType){
        var targetFieldMessageBox = $('#contact-form-'+fieldType+'-box').find(contactFormFieldMessages);
        targetFieldMessageBox.slideDown(100);
    }

    // Function to hide "field value required" messages
    function hideContactFormFieldMessage(){
        contactFormFieldMessages.slideUp(100);
    }

    // Function check contact form data whether it is valid or not
    function checkContactFormData(){
        var nameField = $('#visitor-name'), emailField = $('#visitor-email'), message = $('#visitor-message'), emailRegEx = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/g, email, messageField = $('#visitor-message'), validData = true;

        // 1. Check name
        if( nameField.val() ){
            if( nameField.val().trim().length == 0 ){
                validData = false;
                showContactFormFieldMessage( 'name' );
            }
        }else{
            validData = false;
            showContactFormFieldMessage( 'name' );
        }

        // 2. Check for email
        if( emailField.val() ){
            email = emailField.val().trim();
            if(email.length == 0 ){
                validData = false;
                showContactFormFieldMessage( 'email' );
            }
            else{
                email = email.toLowerCase();
                if( ! emailRegEx.test(email) ){
                    validData = false;
                    showContactFormFieldMessage( 'email' );
                }
            }
        }else{
            validData = false;
            showContactFormFieldMessage( 'email' );
        }

        // 3. Check for message
        if( messageField.val() ){
            if( messageField.val().trim().length == 0 ){
                validData = false;
                showContactFormFieldMessage( 'message' );
            }
        }else{
            validData = false;
            showContactFormFieldMessage( 'message' );
        }

        if( !validData ){
            setTimeout(function(){
                hideContactFormFieldMessage();
            },4000);
        }

        return validData;
    }

    // Function to disable contact form input elements
    function disableContactFormFields(){
        $('#contact-form :input').prop('disabled', true);
    }

    // Function to enable contact form input elements
    function enableContactFormFields(){
        $('#contact-form :input').prop('disabled', false);
    }

    // Function to show "Sending message" blue message
    function showContactFormLoader(){
        contactFormLoader.fadeIn(0);
    }

    // Function to hide "Sending message" blue message
    function hideContactFormLoader(){
        contactFormLoader.fadeOut(0);
    }

    // Function to show "Message sent" green message
    function showMessageSentElm(){
        contactFormMessageSentElm.fadeIn(0);
    }

    // Function to hide "Message sent" green message
    function hideMessageSentElm(){
        contactFormMessageSentElm.fadeOut(0);
    }

    // Function to show "Message not sent" red message
    function showMessageFailElm(){
        contactFormMessageFailElm.fadeIn(0);
    }

    // Function to hide "Message not sent" red message
    function hideMessageFailElm(){
        contactFormMessageFailElm.fadeOut(0);
    }

    // Function to send contact form data to server
    function sendMessage(){
        var actionURL = contactForm.attr('action'), formData = contactForm.serialize();
        $.ajax({
            url: actionURL,
            method: 'POST',
            data: formData,
            beforeSend: function(){
                disableContactFormFields();
                hideMessageSentElm();
                hideMessageFailElm();
                showContactFormLoader();

                setTimeout(function(){ hideContactFormLoader(); }, 4000);
            },
            success: function(res){
                enableContactFormFields();
                hideContactFormLoader();

                if( res == 1 ){
                    hideMessageFailElm();
                    showMessageSentElm();
                    setTimeout(function(){ hideMessageSentElm(); }, 4000);
                }else{
                    hideMessageSentElm();
                    showMessageFailElm();
                    setTimeout(function(){ hideMessageFailElm(); }, 4000);
                }
            },
            error: function(){
                enableContactFormFields();
                hideContactFormLoader();
                hideMessageSentElm();
                showMessageFailElm();

                setTimeout(function(){ hideMessageFailElm(); }, 4000);
            }
        });
    }

    // Function to get current day seconds
    function getCurrentDaySeconds(_date){
        return _date.getSeconds() + (60 * _date.getMinutes()) + (60 * 60 * _date.getHours())
    }

    // Function to check if dark mode CSS file is used in HTML
    function isDarkModeStyleIncluded(darkStylesLoc){
        return $('link[href="'+darkStylesLoc+'"]', 'head').length > 0;
    }

    // Function to add dark mode CSS file in the head tag
    function addDarkModeCSSfile(darkStylesLoc){
        var isDarkModeActive = isDarkModeStyleIncluded(darkStylesLoc);
        if( !isDarkModeActive ){
            $('head').append('<link rel="stylesheet" href="'+darkStylesLoc+'">');
        }
    }

    // Function to remove dark mode CSS file from the head tag
    function removeDarkModeCSSfile(darkStylesLoc){
        var isDarkModeActive = isDarkModeStyleIncluded(darkStylesLoc);
        if( isDarkModeActive ){
            $('head').find('link[href="'+darkCSSpath+'"]').remove();
        }
    }

    // Function to turn ON dark mode when provided time has come
    function checkForDarkModeTime(totalSeconds, darkStylesLoc){
        var currSeconds = 0, _date;

        // Check instantly for dark mode ON
        currSeconds = getCurrentDaySeconds( new Date() );
        if(  currSeconds >= totalSeconds ){
            addDarkModeCSSfile(darkStylesLoc);
        }

        darkModeCheckInterval = setInterval(function(){
            _date = new Date();
            currSeconds = getCurrentDaySeconds(_date);

            if( currSeconds >= totalSeconds ){
                addDarkModeCSSfile(darkStylesLoc);
            }else{
                removeDarkModeCSSfile(darkStylesLoc);
            }
        },1000);
    }

    // Function to turn ON dark mode
    function turnOnDarkMode(darkModeTurnOnHour, darkModeTurnOnMinutes, darkModeTurnOnSeconds){
        var hr = parseInt(darkModeTurnOnHour), 
        min = parseInt(darkModeTurnOnMinutes), 
        sec = parseInt(darkModeTurnOnSeconds),
        darkStylesLoc = darkCSSpath,
        totalSeconds = 0;

        if( hr ){
            totalSeconds += hr * 60 * 60;
        }

        if( min ){
            totalSeconds += min * 60;
        }

        if( sec ){
            totalSeconds += sec;
        }
        
        checkForDarkModeTime(totalSeconds, darkStylesLoc);
    }

    // Function to start website functionalities
    function init(){

        // 1. Menu button functionality
        menuBtn.on('click', function(){
            showOrHideMainNavigation();
        });

        // 2. Main header links functionality
        $('a', mainNavBar).on('click', function(e){
            scrollToTarget(e, $(this));
        });

        // 3. Testimonials slider functionality
        $('#testimonial-right-arrow').on('click', function(){
            switchTestimonial('right');
        });

        $('#testimonial-left-arrow').on('click', function(){
            switchTestimonial('left');
        });

        // 4. Contact form functionality
        contactForm.on('submit', function(e){
            e.preventDefault();

            // 1. Check contact form data
            var validFormDataFlag = checkContactFormData();
            if( !validFormDataFlag )
                return false;

            // 2. Send request to server
            sendMessage();
        });

        // 5. "Get this service" link functionality
        $('.service-cta-btn', '#services').on('click', function(e){
            scrollToTarget(e, $(this));
        });

        // 6. Handle dark mode if "Auto Dark Mode" template is used
        try{
            if(darkModeAuto){
                turnOnDarkMode(darkModeTurnOnHour, darkModeTurnOnMinutes, darkModeTurnOnSeconds);
            }
        }catch(err){}
    }

    init();
});