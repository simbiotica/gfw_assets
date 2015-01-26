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
        html: 'https://cdn.rawgit.com/simbiotica/gfw_assets/feature/loading-by-js/test/header_test.html',
        css: 'https://rawgit.com/simbiotica/gfw_assets/feature/loading-by-js/test/header-gfw.css'
    }

    var header = document.getElementById('headerGfw'),
        head = document.head || document.getElementsByTagName('head')[0], 
        xhrHtml = new XMLHttpRequest(),
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
            xhrHtml.open("GET", links.html, true);
            xhrHtml.send();
        }
    }

    xhrHtml.onreadystatechange = function (e) { 
        if (xhrHtml.readyState == 4 && xhrHtml.status == 200) {
            header.innerHTML = xhrHtml.responseText;
            headerUl = document.getElementById('headerUl');
            console.log(headerUl);
            headerUl.find('.shape-fire').addClass('current');
        }
    }

}());