// Load fonts
WebFontConfig = {
  google: { families: [ 'Fira+Sans:300,400,500:latin' ] }
};
(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})(); 


// Google translate
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: '',
      includedLanguages: 'ar,es,en,fr,id,pt,ru,zh-CN,de,uk,ro,tr,it,hi,km',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    },
    'google_translate_element');
}


// Load html & css & translate script
(function () {
    var scriptPram = document.getElementById('loader-gfw');
    var current = (scriptPram) ? scriptPram.getAttribute('data-current') : '.home_data';

    var links = {
        htmlHeader: 'https://cdn.rawgit.com/simbiotica/gfw_assets/7fd84d2301de1fe7c4be31cac77b2da74798e8b1/src/header.html',
        htmlFooter: 'https://cdn.rawgit.com/simbiotica/gfw_assets/acf40ed4e8f1fbed6dea5f10c9cd063d13f8c04a/src/footer.html',
        css: 'https://cdn.rawgit.com/simbiotica/gfw_assets/ae6aa8d029bbe0289051c87acc17e695d25bf5e8/src/gfw-styles.css',
        translate: 'http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    }

    var header = document.getElementById('headerGfw'),
        footer = document.getElementById('footerGfw'),
        head = document.head || document.getElementsByTagName('head')[0], 
        xhrHeader = new XMLHttpRequest(),
        xhrFooter = new XMLHttpRequest(),
        xhrCss = new XMLHttpRequest();
        href = location.href;

    xhrCss.open("GET", links.css, true);
    xhrCss.send();

    xhrCss.onreadystatechange = function (e) { 
        if (xhrCss.readyState == 4 && xhrCss.status == 200) {
            var style = document.createElement('style');
                style.type = 'text/css';
                style.appendChild(document.createTextNode(xhrCss.responseText));
            // Append to header
            head.appendChild(style);
            xhrHeader.open("GET", links.htmlHeader, true);
            xhrHeader.send();
        }
    }

    xhrHeader.onreadystatechange = function (e) { 
        if (xhrHeader.readyState == 4 && xhrHeader.status == 200) {
            header.innerHTML = xhrHeader.responseText;
            headerUl = document.getElementById('headerUl');
            $(current).addClass('current');
            var translate = document.createElement('script');
                translate.type = 'text/javascript';
                translate.src = links.translate;
            // Append to header
            head.appendChild(translate);
            init(true, false);
            xhrFooter.open("GET", links.htmlFooter, true);
            xhrFooter.send();
        }
    }
    xhrFooter.onreadystatechange = function (e) { 
        if (xhrFooter.readyState == 4 && xhrFooter.status == 200) {
            footer.innerHTML = xhrFooter.responseText;
            init(false,true);
        }
    }


}());

// MOBILE MENU //
var headerLoad = null;
var footerLoad = null;
function init(_header,_footer){
  headerLoad = headerLoad || _header;
  footerLoad = footerLoad || _footer;
  // HEADER
  if (headerLoad && footerLoad) {
    $el = $('#headerView');
    $htmlbody = $('html,body');
    $window = $(window);
    $navMobile = $('#nav-mobile');
    $footer = $('#footerMenu');
    $siteMap = $('#siteMap');
    $mobileMenu = $('#mobileMenu');
    $translate = $('#google_translate_element');
    createMenu();
    $window.on('resize',createMenu); 
    $('#btn-menu').on('click', toggleMenu);
    initSlick();
  }
}

function initSlick () {
  $('#footer-logos').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slide: 'li'
  });
}


function toggleMenu(e){
  $(e.currentTarget).toggleClass('active');
  if ($(e.currentTarget).hasClass('active')) {
    $htmlbody.addClass('active');
    $el.addClass('active');
    $navMobile.addClass('active');
  }else{
    $htmlbody.removeClass('active');
    $el.removeClass('active');
    $navMobile.removeClass('active');
  }
}

function createMenu(){
  if ($window.width() > 850) {
    $footer.appendTo($siteMap);
    $translate.appendTo($('#google_translate_element_box1'));
  }else{
    $footer.appendTo($mobileMenu);
    $translate.appendTo($('#google_translate_element_box2'));
  }
}