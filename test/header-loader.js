Element.prototype.hasClass = function (className) {
    return new RegExp(' ' + className + ' ').test(' ' + this.className + ' ');
};

Element.prototype.addClass = function (className) {
    if (!this.hasClass(className)) {
        this.className += ' ' + className;
    }
    return this;
};

Element.prototype.removeClass = function (className) {
    var newClass = ' ' + this.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (this.hasClass(className)) {
        while (newClass.indexOf( ' ' + className + ' ') >= 0) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        this.className = newClass.replace(/^\s+|\s+$/g, ' ');
    }
    return this;
};
// Load fonts
WebFontConfig = {
  google: { families: [ 'Fira+Sans::latin' ] }
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

// Load html & css
(function () {
    var scriptPram = document.getElementById('loader-gfw');
    var current = scriptPram.getAttribute('data-current');

    var links = {
        htmlHeader: 'https://rawgit.com/simbiotica/gfw_assets/feature/loading-by-js/test/header_test.html',
        htmlFooter: 'https://rawgit.com/simbiotica/gfw_assets/feature/loading-by-js/test/footer_test.html',
        css: 'https://rawgit.com/simbiotica/gfw_assets/feature/loading-by-js/test/gfw-styles.css'
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
            xhrFooter.open("GET", links.htmlFooter, true);
            xhrFooter.send();
        }
    }

    xhrHeader.onreadystatechange = function (e) { 
        if (xhrHeader.readyState == 4 && xhrHeader.status == 200) {
            header.innerHTML = xhrHeader.responseText;
            headerUl = document.getElementById('headerUl');
            document.querySelector(current).addClass('current');
        }
    }
    xhrFooter.onreadystatechange = function (e) { 
        if (xhrFooter.readyState == 4 && xhrFooter.status == 200) {
            footer.innerHTML = xhrFooter.responseText;
            $('#footer-logos').slick({
                infinite: true,
                slidesToShow: 5,
                slidesToScroll: 5,
                speed: 500,
                autoplay: true,
                autoplaySpeed: 3000
            });
        }
    }

}());