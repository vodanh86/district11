(function($) {
    "use strict";

    // font loaded
    function waitForWebfonts(fonts, callback) {
        var loadedFonts = 0;
        for(var i = 0, l = fonts.length; i < l; ++i) {
            (function(font) {
                var node = document.createElement('span');
                // Characters that vary significantly among different fonts
                node.innerHTML = 'giItT1WQy@!-/#';
                // Visible - so we can measure it - but not on the screen
                node.style.position      = 'absolute';
                node.style.left          = '-10000px';
                node.style.top           = '-10000px';
                // Large font size makes even subtle changes obvious
                node.style.fontSize      = '300px';
                // Reset any font properties
                node.style.fontFamily    = 'sans-serif';
                node.style.fontVariant   = 'normal';
                node.style.fontStyle     = 'normal';
                node.style.fontWeight    = 'normal';
                node.style.letterSpacing = '0';
                document.body.appendChild(node);

                // Remember width with no applied web font
                var width = node.offsetWidth;

                node.style.fontFamily = font;

                var interval;
                function checkFont() {
                    // Compare current width with original width
                    if(node && node.offsetWidth != width) {
                        ++loadedFonts;
                        node.parentNode.removeChild(node);
                        node = null;
                    }

                    // If all fonts have been loaded
                    if(loadedFonts >= fonts.length) {
                        if(interval) {
                            clearInterval(interval);
                        }
                        if(loadedFonts == fonts.length) {
                            callback(loadedFonts);
                            return true;
                        }
                    }
                };

                if(!checkFont()) {
                    interval = setInterval(checkFont, 50);
                }
            })(fonts[i]);
        }
    }

    // loading
    function loading(isLoading) {
        if (isLoading) {
            $('.loader-wrap').show();
            $('.loader-wrap .loader-first').show();
            $('.loader-wrap .loader-second').hide();
            $('.canvas-wrapper').hide();
            $('#pp-nav').hide();
        } else {
            $('.loader-wrap .loader-first').hide();
            $('.canvas-wrapper').fadeIn();
            $('#pp-nav').fadeIn();
        }
    }

    $('.canvas-wrapper').hide();
    waitForWebfonts(['WorkSans', 'WorkSans-Bold', 'Inter', 'Inter-Bold'], function(size) {
        // loader
        setTimeout(function () {
            $('.loader-wrap .loader-first').hide();
            $('.loader-wrap .loader-second').show();

            setTimeout(function () {
                $('body').addClass('page-loaded').attr('id', 'page-home');
                $('.loader-wrap').fadeOut().addClass('loaded');
                $('#page-item-home').show();

                $('.canvas-wrapper').fadeIn();
            }, 1500);
        }, 1000);
    });

    // watch body
    $.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.height();
    }

    function handleChange() {
        console.log('has clicked');

        var page  = $('.page-item.active .page-item-slide-1');
        if (!page.hasClass('active')) {
            $('body').addClass('pp-viewing-page-detail');
        } else {
            $('body').removeClass('pp-viewing-page-detail');
        }

        if (!$('body').hasClass('pp-viewing-page-item-gallery')) {
            $('.mfp-full-screen').remove();
        }

        if ($('body.pp-viewing-page-item-home #page-item-home .page-item-slide-2').hasClass('active')) {
            $('.multi-tree').each(function () {
                var t = $(this);
                if (!t.hasScrollBar()) {
                    t.next().hide();
                }
            });
        }
    }

    $('body, a, button').on('mouseup', function () {
        setTimeout(function () {
            handleChange();
        });
    });

    $('body').scroll(function(){
        if ($(this).scrollTop() > 0) {
            $(this).addClass('is-go-scroll');
        } else {
            $(this).removeClass('is-go-scroll');
        }
    });

    // lazy load image
    $('.lazy').lazy();

    // full page
    var interval;
    var autoPlayDuration = 5000;
    function getInterval() {
        return setInterval(function () {
            $.fn.pagepiling.moveSectionDown();
        }, autoPlayDuration);
    }

    var w = $(window).width();
    if (w > 480) {
        console.log('desktop version');

        var anchors = window.pp.anchors;
        var tooltips = window.pp.tooltips;
        var sectionsColor = window.pp.sectionsColor;
        $('.content-wrap .content').pagepiling({
            sectionSelector: '.page-item',
            menu: '.menu-over-list',
            anchors: anchors,
            sectionsColor: sectionsColor,
            navigation: {
                'textColor': '#FFF',
                'bulletsColor': '#FFF',
                'position': 'left',
                'tooltips': tooltips
            },
            normalScrollElements: '.scroll-enable, .page-item-slide',
            loopBottom: true,
            afterRender: function() {},
            afterLoad: function(anchorLink, index) {
                console.log('afterLoad:', anchorLink, index);
                $('#'+ anchorLink +' .page-item-inner').show();

                switch (anchorLink) {
                    case 'page-item-news':
                        $('.news-owl-carousel .owl-dots .owl-dot').eq(0).trigger('click');
                        break;
                    case 'page-item-link':
                        $('body').addClass('page-link-first-load');
                        break;
                }

                // clearInterval(interval);
                // setTimeout(function () {
                //     interval = getInterval();
                // }, autoPlayDuration);
            },
            onLeave: function(index, nextIndex, direction) {
                console.log('onLeave:', index, nextIndex, direction);

                var current = anchors[index - 1];
                console.log('onLeave current:', current);
                $('#'+ current +' .page-item-inner').hide();

                var currNext = anchors[nextIndex - 1];
                console.log('onLeave currNext:', currNext);
                $('#'+ currNext +' .page-item-inner').hide();
            }
        });

        // personal structure horizontal
        $('#root > ul').removeAttr('type');
    } else {
        console.log('mobile version');

        $('body').addClass('mobile-version');
        $('.mobile-version .menu-over .a-menu').bind('click', function () {
            $('.menu-over-list li').removeClass('menu-item-active');
            $(this).parent('li').addClass('menu-item-active');

            var page = $(this).attr('href');
            console.log('page:', page);
            var item = $(this).data('item-page');

            $('.page-item').hide().removeClass('active');
            $(page).show().addClass('active');

            $('body').removeClass(function (index, css) {
                return (css.match (/(^|\s)pp-viewing-page-item-\S+/g) || []).join(' ');
            }).addClass('pp-viewing-page-item-'+ item);

            return false;
        });

        $('.logo-wrap').bind('click', function () {
            $('.mobile-version .menu-over .a-menu[data-item-page="home"]').trigger('click');
        });

        $('li[data-menuanchor="page-item-news"]').append($('.menu-si-list #sub-item-2').clone());
        $('li[data-menuanchor="page-item-doc"]').append($('.menu-si-list #sub-item-7').clone());

        var placeControl = '<select class="place-control-cat-opt">';
        $('.place-control-cat ul li a').each(function () {
            var t = $(this);
            placeControl += '<option value="'+ t.data('slider-item') +'">'+ t.text() +'</option>';
        });
        placeControl += '</select>';
        $('.place-slider').prepend(placeControl);
        $('body').on('change', '.place-control-cat-opt', function () {
            var id = $(this).val();

            var placeOwl = $('#place-slider-'+ id);
            if (placeOwl) {
                $('.place-slider .place-owl-carousel').each(function () {
                    var oid = $(this).attr('id');
                    var placeOwlOld = $('#place-slider-'+ oid);
                    placeOwlOld.owlCarousel('destroy');
                });

                $('.place-control-cat ul li').removeClass('active');
                $(this).parent('li').addClass('active');

                $('.place-owl-carousel').removeClass('active');
                placeOwl.addClass('active');

                var placeOwlSet = {
                    nav: false,
                    items: 3,
                    margin: 30,
                    slideBy: 3,
                    loop: true,
                    responsiveClass: true,
                    responsive: {
                        0: {
                            items: 2,
                            nav: true,
                            margin: 15
                        },
                        480: {
                            items: 3,
                            nav: false,
                            margin: 30
                        }
                    },
                    onInitialized: function (event) {
                        initPlaceDots();
                    },
                    onChanged: function (event) {
                        initPlaceDots();

                        var c = event.page.index;
                        var t = event.page.count;
                        var bar = ((c + 1) / t) * 102;

                        $('.place-control .place-control-dot .owl-dots .owl-dot-bar').animate({'width': bar});
                        console.log('bar:', bar);
                    }
                };

                $('.place-control-nav .owl-next').bind('click', function() {
                    placeOwl.trigger('next.owl.carousel', [300]);
                });

                $('.place-control-nav .owl-prev').bind('click', function() {
                    placeOwl.trigger('prev.owl.carousel', [300]);
                });

                placeOwl.owlCarousel(placeOwlSet);
            }
        });

        var eventControl = '<select class="event-control-cat-opt">';
        $('.event-slider-two .item').each(function () {
            var t = $(this);
            var k = t.find('h3').text() +' - '+ t.find('span').text();
            eventControl += '<option value="'+ t.data('event-month') +'">'+ k +'</option>';
        });
        eventControl += '</select>';
        $('.event-content-inner').prepend(eventControl);
        $('body').on('change', '.event-control-cat-opt', function () {
            var id = $(this).val();
            initEventBlock(id);
        });
    }

    $('img.svg').each(function() {
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = $(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    // show over menu
    $('.nav-icon').bind('click', function () {
        $('.menu-over-wrap').show().addClass('animate__slideInLeft').removeClass('animate__slideOutLeft');

        return false;
    });

    $('.close-icon').bind('click', function () {
        $('.menu-over-wrap').addClass('animate__slideOutLeft').removeClass('animate__slideInLeft');

        return false;
    });

    $('.menu-over > ul li a.a-menu').on({
        mouseenter: function (event) {
            var title = $(this).data('pi-title');
            var img = $(this).data('pi-img');

            $('.menu-over ul li .exp-icon').removeClass('active');
            $('.menu-si-list .menu-sub-item').hide();
            $('.menu-si-list').hide();

            $('.menu-preview .menu-preview-item .menu-pi-title').html(title);
            $('.menu-preview .menu-preview-item .menu-pi-image img').attr('src', img);
            $('.menu-preview').show();
        },
        mouseleave: function (event) {
            $('.menu-preview').hide();
        }
    });

    $('.menu-over ul li .exp-icon').bind('click', function () {
        var id = $(this).data('sub-item');
        $('.menu-over ul li .exp-icon').not($(this)).removeClass('active');
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('.menu-si-list .menu-sub-item').hide();
            $('.menu-si-list #'+ id).show();
            $('.menu-si-list').show();

            $('.menu-over-list li #'+ id).show();
        } else {
            $('.menu-si-list .menu-sub-item').hide();
            $('.menu-si-list').hide();

            $('.menu-over-list li #'+ id).hide();
        }

        return false;
    });

    // main menu
    $('.menu-over ul.menu-over-list li a.a-menu').bind('click', function () {
        $('.close-icon').click();
    });

    $('.logo-main').bind('click', function () {
        $('#pp-nav ul li a[href="#page-item-home"]').click();
    });

    // go to page slide
    $('body').on('click', 'a[data-pi-slide], div[data-pi-slide], span[data-pi-slide]', function () {
        var t = $(this).data('pi-slide');
        var type = $(this).data('pi-type');
        var id = $(this).data('pi-id');
        var page = $(this).data('pi-page');
        console.log('pi-slide:', t);
        console.log('pi-slide-type:', type);
        console.log('pi-slide-id:', id);

        $(this).parents('.page-item-inner').find('.page-item-slide').removeClass('active');
        $(this).parents('.page-item-inner').find('.'+ t).addClass('active');

        if (id) {
            // begin temp for data test
            var  url = '';
            switch (type) {
                case 'document-list':
                    url = 'document_list.php';
                    break;
                case 'document-detail':
                    url = 'document_detail.html';
                    break;
                case 'news-list':
                    url = 'news_list.php';
                    break;
                case 'news-detail':
                case 'news-detail-direct':
                case 'news-detail-search':
                    url = 'news_detail.php';
                    break;
                case 'service-list':
                    switch (id) {
                        case 5:
                            url = 'service_list_5.html';
                            break;
                        case 4:
                            url = 'service_list_4.html';
                            break;
                        case 3:
                            url = 'service_list_3.html';
                            break;
                        case 2:
                            url = 'service_list_2.php';
                            break;
                        default:
                            url = 'service_list.html';
                            break;
                    }
                    break;
                case 'service-detail':
                    switch (id) {
                        case 2:
                            url = 'service_detail_2.html';
                            break;
                        default:
                            url = 'service_detail.html';
                            break;
                    }
                    break;
                case 'service-detail-search':
                    url = 'service_detail_search.html';
                    break;
                case 'place-detail':
                    url = 'place_detail.html';
                    break;
                case 'gallery-detail':
                    url = 'gallery_detail.html';
                    break;
                default:
                    url = 'no_data.html';
                    break;
            }
            url = (url) ? 'temp/'+ url : url;
            // end temp for data test

            var data = {
                type: type,
                id: id,
                page: page
            };

            if ($(this).parents('.pagination').hasClass('pagination-doc')) {
                var docType = $(this).parents('.writing').find('#doc-type').val();
                var docCat = $(this).parents('.writing').find('#doc-cat').val();
                var docNo = $(this).parents('.writing').find('#doc-no').val();
                var docDateStart = $(this).parents('.writing').find('#doc-date-start').val();
                var docDateEnd = $(this).parents('.writing').find('#doc-date-end').val();
                var docDesc = $(this).parents('.writing').find('#doc-desc').val();

                data = {
                    type: type,
                    id: docType,
                    docCat: docCat,
                    page: page,
                    docNo: docNo,
                    docDateStart: docDateStart,
                    docDateEnd: docDateEnd,
                    docDesc: docDesc
                };
            }

            if ($(this).parents('.pagination').hasClass('pagination-service')) {
                var serviceJob = $(this).parents('.writing').find('#service-job').val();
                var serviceDomain = $(this).parents('.writing').find('#service-domain').val();
                var serviceWork = $(this).parents('.writing').find('#service-work').val();

                data = {
                    type: type,
                    page: page,
                    serviceJob: serviceJob,
                    serviceDomain: serviceDomain,
                    serviceWork: serviceWork
                };
            }

            var current = $(this).parents('.page-item-inner').find('.'+ t);
            $.ajax({
                url: url,
                data: data,
                beforeSend: function() {
                    // loading(true);
                },
                success: function(data) {
                    // loading(false);
                    current.html(data);
                }
            });
        }

        return false;
    });

    // home page
    $("#structure-tree-data").jOrgChart({
        chartElement: $("#structure-tree-view"),
        nodeClicked: nodeClicked
    });
    $('.node-container .node-cell').append('<button class="btn-structure-scroll"></button>');

    var isTop = true;
    $('body').on('click', '.btn-structure-scroll', function () {
        var t = $(this);
        var v = t.parent('.node-cell').find('.multi-tree');
        if (isTop) {
            v.animate({scrollTop: 1000});
            isTop = false;
        } else {
            v.animate({scrollTop: 0});
            isTop = true;
        }
        t.toggleClass('is-bottom');
    });

    // lighting a node in the selection
    function nodeClicked(node, type) {
        node = node || $(this);
        $('.jOrgChart .selected').removeClass('selected');
        node.addClass('selected');
        var id = node.attr('id');
        var skipNode = ['root', 'node-a', 'node-b', 'node-c', 'node-d'];
        console.log('node:', node.attr('id'));

        if (skipNode.indexOf(id) == -1) {
            $.magnificPopup.open({
                items: {
                    type: 'ajax',
                    src: 'temp/structure_detail.html'
                },
                closeBtnInside: false
            });
        }
    }

    $('.btn-popup-info').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });

    // zoom map
    var elem = document.getElementById('panzoom-element');
    var zoomInButton = document.getElementById('zoom-in');
    var zoomOutButton = document.getElementById('zoom-out');
    var panzoom = Panzoom(elem);
    var parent = elem.parentElement;
    parent.addEventListener('wheel', panzoom.zoomWithWheel);
    zoomInButton.addEventListener('click', panzoom.zoomIn);
    zoomOutButton.addEventListener('click', panzoom.zoomOut);

    $('.multi-tree').dragscroll({direction: 'scrollTop'});

    // service page
    $('.service-list .service-name a').bind('click', function () {
        var id = $(this).data('service-item');

        $('.service-list .service-name a').removeClass('active');
        $(this).addClass('active');

        $('.service-content-1 .service-items .service-item').hide();
        $('#'+ id).show();

        return false;
    });

    $('.service-title-wrap h2').bind('click', function () {
        if (!($(this).parents('.service-content-item').hasClass('active'))) {
            $('.service-content-item').removeClass('active');
            $(this).parents('.service-content-item').addClass('active');

            $(this).parents('.page-item-inner').removeClass('active-service-content-1');
            $(this).parents('.page-item-inner').removeClass('active-service-content-2');
            if ($(this).parents('.service-content-item').hasClass('service-content-1')) {
                $(this).parents('.page-item-inner').addClass('active-service-content-1');
            }
            if ($(this).parents('.service-content-item').hasClass('service-content-2')) {
                $(this).parents('.page-item-inner').addClass('active-service-content-2');
            }
        }

        return false;
    });

    $('body').on('submit', '.service-form-search-act', function () {
        var keyword = $(this).find('#service-keyword').val();
        var t = 'page-item-slide-2';

        $(this).parents('.page-item-inner').find('.page-item-slide').removeClass('active');
        $(this).parents('.page-item-inner').find('.'+ t).addClass('active');

        var current = $(this).parents('.page-item-inner').find('.'+ t);
        $.ajax({
            url: 'temp/service_search.html',
            data: {keyword: keyword},
            beforeSend: function() {
                // loading(true);
            },
            success: function(data) {
                handleChange();
                // loading(false);
                current.html(data);
            }
        });

        return false;
    });

    $('body').on('submit', '.service-country-form-search-act', function () {
        var serviceJob = $(this).find('#service-job').val();
        var serviceDomain = $(this).find('#service-domain').val();
        var serviceWork = $(this).find('#service-work').val();
        var t = 'page-item-slide-5';

        $(this).parents('.page-item-inner').find('.page-item-slide').removeClass('active');
        $(this).parents('.page-item-inner').find('.'+ t).addClass('active');

        var current = $(this).parents('.page-item-inner').find('.'+ t);
        $.ajax({
            url: 'temp/service_list_2.php',
            data: {
                serviceJob: serviceJob,
                serviceDomain: serviceDomain,
                serviceWork: serviceWork
            },
            beforeSend: function() {
                // loading(true);
            },
            success: function(data) {
                handleChange();
                // loading(false);
                current.html(data);
            }
        });

        return false;
    });

    // news page
    var owlNews = $('.news-owl-carousel');
    var owlNewsTimePlay = 10000;
    var owlNewsTitle = [];
    owlNews.owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        autoplay: true,
        autoplayTimeout: owlNewsTimePlay,
        nav: true,
        lazyLoad: true,
        mouseDrag: true,
        onInitialize: function (event) {
            $('.news-owl-carousel .item').each(function () {
                if ($(this).data('item-cat-title')) {
                    owlNewsTitle.push($(this).data('item-cat-title'));
                }
            });
        },
        onInitialized: function (event) {
            $('.news-owl-carousel .owl-dots .owl-dot').each(function (index) {
                $(this).html('<span class="owl-dot-ordering">0'+ (index + 1) +'</span><span class="owl-dot-bar"><span></span></span>');
            });

            navigationFill();
        },
        onTranslated: function (event) {
            $('.news-owl-carousel .owl-dots .owl-dot span.owl-dot-bar span').width(0);
        },
        onChanged: function (event) {
            var page      = event.page.index;
            var pages     = event.page.count;

            var p = 0;
            var n = 0;
            p = page - 1;
            n = page + 1;
            if (p == -1) {
                p = pages - 1;
            }
            if (n == pages) {
                n = 0;
            }
            $('.news-owl-carousel .owl-nav button.owl-prev').html(owlNewsTitle[p]);
            $('.news-owl-carousel .owl-nav button.owl-next').html(owlNewsTitle[n]);

            navigationFill();
        }
    });

    function navigationFill() {
        var pr = $('.news-owl-carousel .owl-dots .owl-dot.active span.owl-dot-bar span');
        $(pr).css({width: '0%'});

        var progressbar = $('.news-owl-carousel .owl-dots .owl-dot.active span.owl-dot-bar span');
        $(progressbar).animate({width: '100%'}, owlNewsTimePlay);
    };

    var owlNewsCat = $('.news-cat-owl-carousel');
    owlNewsCat.owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        autoplay: false,
        animateIn: 'animate__fadeIn',
        autoplayTimeout: 5000
    });
    
    $('body').on('submit', '.news-form-search-act', function () {
        var keyword = $(this).find('#news-keyword').val();
        var t = 'page-item-slide-2';

        $(this).parents('.page-item-inner').find('.page-item-slide').removeClass('active');
        $(this).parents('.page-item-inner').find('.'+ t).addClass('active');

        var current = $(this).parents('.page-item-inner').find('.'+ t);
        $.ajax({
            url: 'temp/news_search.html',
            data: {keyword: keyword},
            beforeSend: function() {
                // loading(true);
            },
            success: function(data) {
                // loading(false);
                current.html(data);
            }
        });

        return false;
    });

    $('body').on('click', '.pagination .previous', function () {
        var total = $(this).parents('.pagination').data('pi-total-page');
        var current = $('.pagination a.active').data('pi-page');

        if (current != 1) {
            $(this).parents('.pagination').find('a[data-pi-page="'+ (current-1) +'"]').trigger('click');
        }

        return false;
    });

    $('body').on('click', '.pagination .next', function () {
        var total = $(this).parents('.pagination').data('pi-total-page');
        var current = $('.pagination a.active').data('pi-page');

        if (current != total) {
            $(this).parents('.pagination').find('a[data-pi-page="'+ (current+1) +'"]').trigger('click');
        }

        return false;
    });

    // link page
    $('.links-carousel').owlCarousel({
        loop: true,
        margin: 30,
        items: 3,
        nav: true,
        responsive: {
            0: {
                items: 1,
                nav: true,
                dots: false,
                margin: 15
            },
            480: {
                items: 3,
                margin: 30
            }
        },
        navText: ["<img src='assets/img/icon_slide_right.svg'>","<img src='assets/img/icon_slide_left.svg'>"]
    });

    $(".title-item").click(function () {
        if(!$(this).hasClass('title-active'))
        {
            $(".title-item").removeClass("title-active");
            $(this).addClass("title-active");
        }
    });

    $('.title-block4 .title-item a').bind('click', function () {
        var id = $(this).data('link-item');
        $('body').removeClass('page-link-first-load');
        $('.link-content .link-block-5 .link-item').hide();
        $('#'+ id).show();
    });

    // doc page
    $('#doc-date').datepicker({format: "dd/mm/yyyy", language: "vi", autoclose: true});
    $('#doc-date-main').datepicker({format: "dd/mm/yyyy", language: "vi", todayBtn: true, autoclose: true});

    $('body').on('submit', '.doc-form-search-act', function () {
        var docNo = $(this).find('#doc-no').val();
        var docDateStart = $(this).find('#doc-date-start').val();
        var docDateEnd = $(this).find('#doc-date-end').val();
        var docDesc = $(this).find('#doc-desc').val();
        var t = 'page-item-slide-2';

        $(this).parents('.page-item-inner').find('.page-item-slide').removeClass('active');
        $(this).parents('.page-item-inner').find('.'+ t).addClass('active');

        var current = $(this).parents('.page-item-inner').find('.'+ t);
        $.ajax({
            url: 'temp/document_list.php',
            data: {
                docNo: docNo,
                docDateStart: docDateStart,
                docDateEnd: docDateEnd,
                docDesc: docDesc
            },
            beforeSend: function() {
                // loading(true);
            },
            success: function(data) {
                handleChange();
                // loading(false);
                current.html(data);
            }
        });

        return false;
    });

    $('body').on('change', '#doc-cat', function () {
        var docType = $(this).parents('.writing').find('#doc-type').val();
        var docCat = $(this).val();
        var docNo = $(this).parents('.writing').find('#doc-no').val();
        var docDateStart = $(this).parents('.writing').find('#doc-date-start').val();
        var docDateEnd = $(this).parents('.writing').find('#doc-date-end').val();
        var docDesc = $(this).parents('.writing').find('#doc-desc').val();

        var data = {
            id: docType,
            docCat: docCat,
            docNo: docNo,
            docDateStart: docDateStart,
            docDateEnd: docDateEnd,
            docDesc: docDesc
        };

        var t = 'page-item-slide-2';

        $(this).parents('.page-item-inner').find('.page-item-slide').removeClass('active');
        $(this).parents('.page-item-inner').find('.'+ t).addClass('active');

        var current = $(this).parents('.page-item-inner').find('.'+ t);
        $.ajax({
            url: 'temp/document_list.php',
            data: data,
            beforeSend: function() {
                // loading(true);
            },
            success: function(data) {
                // loading(false);
                current.html(data);
            }
        });
    });

    // event page
    var eventSlider = $('.event-slider-two .two');
    eventSlider.owlCarousel({
        items: 8,
        slideBy: 8,
        nav: true,
        margin: 15,
        mouseDrag: false,
        touchDrag: false
    });
    $('.event-slider-two .right-t').click(function() {
        $(".event-slider-two .owl-next").trigger('click');
    });
    $('.event-slider-two .left-t').click(function() {
        $(".event-slider-two .owl-prev").trigger('click');
    });

    $('.event-slider-two .item').click(function() {
        $('.event-slider-two .item').removeClass('active');
        $(this).addClass('active');

        var id = $(this).data('event-month');
        initEventBlock(id);
        $('.event-slider .owl-dots .owl-dot').eq(0).trigger('click');
    });
    $('.event-slider-two .item').eq(0).trigger('click');

    function initEventBlock(id) {
        var owl = $('#event-month-'+ id);
        if (owl) {
            $('.event-slider .owl-carousel').hide();
            $('#event-month-'+ id).show();

            $('.event-slider .owl-carousel').each(function () {
                var oid = $(this).attr('id');
                var eventOwlOld = $('#'+ oid);

                $('.event-slider .left, .event-slider .right').remove();
                eventOwlOld.owlCarousel('destroy');
            });

            owl.owlCarousel({
                nav: true,
                items: 1,
                slideBy: 1,
                dots: true,
                onInitialized: function (event) {
                    $('.event-slider').append('<div class="left"></div><div class="right"></div>');

                    $('.event-slider .right').click(function() {
                        owl.trigger('next.owl.carousel');
                    });

                    $('.event-slider .left').click(function() {
                        owl.trigger('prev.owl.carousel');
                    });

                    initEventDots(event);
                },
                onChanged: function (event) {
                    initEventDots(event);
                }
            });
        }
    }

    function initEventDots(event) {
        var c = (event.page.index == -1) ? 0 : event.page.index;
        var t = (event.page.count == 0) ? event.item.count : event.page.count;
        c = (c < 9) ? '0'+ (c + 1) : (c + 1);
        t = (t < 9) ? '0'+ t : t;

        $('.event-paging-wrap .event-paging-current').text(c);
        $('.event-paging-wrap .event-paging-total').text(t);

        if ($('body').hasClass('pp-viewing-page-item-event')) {
            var img = $('.event-slider .owl-item').eq(event.page.index).find('.event-thumb').data('background-img');
            if (!img) {
                img = $('.event-slider .owl-item').eq(event.page.index).find('.event-thumb img').attr('src');
            }
            $('#page-item-event .page-item-inner').css({'background-image': 'url('+ img +')'});
        }
    }

    // count down
    $('.event-count-down .event-count-down-content').each(function (index) {
        var d = $(this).data('event-date');
        $(this).attr('id', 'event-count-down-'+ Math.floor(Math.random() * 10000));

        if (d) {
            $('.event-count-down .event-count-down-content').eq(index).countdowntimer({
                dateAndTime: d,
                regexpMatchFormat: "([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
                regexpReplaceWith: "<span class='e-cdt-i'>$1<b>Ngày</b></span><span class='e-cdt-dot'>:</span><span class='e-cdt-i'>$2<b>Giờ</b></span><span class='e-cdt-dot'>:</span><span class='e-cdt-i'>$3<b>Phút</b></span><span class='e-cdt-dot'>:</span><span class='e-cdt-i'>$4<b>Giây</b></span>"
            });
        }
    });

    // place page
    $('.place-control .place-control-cat ul li a').bind('click', function () {
        var id = $(this).data('slider-item');

        var placeOwl = $('#place-slider-'+ id);
        if (placeOwl) {
            $('.place-slider .place-owl-carousel').each(function () {
                var oid = $(this).attr('id');
                var placeOwlOld = $('#place-slider-'+ oid);
                placeOwlOld.owlCarousel('destroy');
            });

            $('.place-control-cat ul li').removeClass('active');
            $(this).parent('li').addClass('active');

            $('.place-owl-carousel').removeClass('active');
            placeOwl.addClass('active');

            var placeOwlSet = {
                nav: false,
                items: 3,
                margin: 30,
                slideBy: 3,
                loop: true,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 2,
                        nav: true,
                        margin: 15
                    },
                    480: {
                        items: 3,
                        nav: false,
                        margin: 30
                    }
                },
                onInitialized: function (event) {
                    initPlaceDots();
                },
                onChanged: function (event) {
                    initPlaceDots();

                    var c = event.page.index;
                    var t = event.page.count;
                    var bar = ((c + 1) / t) * 102;

                    $('.place-control .place-control-dot .owl-dots .owl-dot-bar').animate({'width': bar});
                    console.log('bar:', bar);
                }
            };

            $('.place-control-nav .owl-next').bind('click', function() {
                placeOwl.trigger('next.owl.carousel', [300]);
            });

            $('.place-control-nav .owl-prev').bind('click', function() {
                placeOwl.trigger('prev.owl.carousel', [300]);
            });

            placeOwl.owlCarousel(placeOwlSet);
        }

        return false;
    });
    $('.place-control .place-control-cat ul li a').eq(0).trigger('click');
    
    $('.place-control-ca-nav span').bind('click', function () {
        $(this).parents('.place-control').toggleClass('active');
    });

    function initPlaceDots() {
        var html = $('.place-owl-carousel .owl-dots').html();
        html = '<span class="owl-dot-bar"></span>' + html;
        $('.place-control-dot .owl-dots').html(html).find('.owl-dot').each(function (index) {
            $(this).html('<span class="owl-dot-ordering">0'+ (index + 1) +'</span>');
            $(this).click(function () {
                $('.place-owl-carousel .owl-dots .owl-dot').eq(index).trigger('click');
            });
        });
    }

    // gallery page
    $('.gallery-content-thumb').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Đang tải ảnh #%curr%...',
        closeOnBgClick: false,
        gallery: {
            enabled: true
        },
        image: {
            tError: '<a href="%url%">Ảnh #%curr%</a> không thể tải.',
            titleSrc: function(item) {
                console.log('title:', item.el.attr('title'));
                return item.el.attr('title');
            }
        },
        callbacks: {
            open: function() {
                $('.pp-viewing-page-item-gallery .mfp-close').html('<span>Đóng</span>').before('<button class="mfp-full-screen"><span>Xem toàn màn hình</span></button>');
                $('.pp-viewing-page-item-gallery').removeClass('is-show-full');

                var $gallery = $('.gallery-content-thumb');
                var $result = '';
                if ($gallery.find('.gallery-content-item').length>0) {
                    $result = '<div class="mfp-pager">' +
                        '<div class="wrap-dots">' +
                        '<div class="dots owl-carousel">';
                    for (var i=0; i < $gallery.find('.gallery-content-item').length; i++) {
                        var $cl_active = ' class="item"';
                        var $thumb = $gallery.find('.gallery-content-item:eq('+i+')').find('img').attr('src');
                        $result += '<div'+ $cl_active +'>'+
                            '<button type="button" onclick="javascript:$(\'.gallery-content-thumb\').magnificPopup(\'goTo\', '+i+');return false;"><img src="' + $thumb + '" width="50"></button>' +
                            '</div>';
                    }
                    $result += '</div>'+
                        '</div>'+
                        '</div>';
                }

                $('.mfp-figure').append($result);
                $('.mfp-pager .dots').owlCarousel({
                    loop: true,
                    margin: 20,
                    items: 8,
                    nav: true,
                    navText: ["<img src='assets/img/icon_slide_left.svg'>", "<img src='assets/img/icon_slide_right.svg'>"],
                    dots: false,
                    responsive: {
                        0: {
                            items: 3,
                            nav: true,
                            dots: false,
                            margin: 20
                        },
                        480: {
                            items: 8,
                            margin: 20
                        }
                    },
                });
            }
        }
    });

    $('body').on('click', '.mfp-full-screen', function () {
        $(this).toggleClass('is-show-full');
        $('.pp-viewing-page-item-gallery').toggleClass('is-show-full');

        if ($(this).hasClass('is-show-full')) {
            $(this).html('<span>Thu nhỏ</span>');
        } else {
            $(this).html('<span>Xem toàn màn hình</span>');
        }
    });

    $('.photo-alubum-carosel').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        items: 4,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true,
                dots: false,
                margin: 15
            },
            480: {
                items: 4,
                margin: 30
            }
        },
        navText: ["<img src='assets/img/icon_slide_left.svg'>", "<img src='assets/img/icon_slide_right.svg'>"]
    });

    // contact page
    $('#file-2').click(function () {
        $('#file-1').click();
    });
    $('#file-1').change(function () {
        var t  = $(this).val();
        $('#file-2').val(t.replace(/C:\\fakepath\\/i, ''));
    });

    $('body').on('click', '.mfp-close span', function () {
        $('.mfp-close').trigger('click');
    });
})(jQuery);
