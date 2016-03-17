setTimeout(function() {
  var linkTag = document.createElement('link');
  linkTag.rel = 'stylesheet';
  linkTag.href = 'https://fonts.googleapis.com/css?family=Fira+Sans:300,400,500';
  document.head.appendChild(linkTag);
}, 0);


// Google translate
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: '',
      includedLanguages: 'ar,es,en,fr,id,pt,ru,zh-CN,de,uk,ro,tr,it,hi,km',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    },
    'googleTranslate');
}

// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cacheGFW = {};

  this.tmplGFW = function tmplGFW(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cacheGFW the result.
    var fn = !/\W/.test(str) ?
      cacheGFW[str] = cacheGFW[str] ||
        tmplGFW(document.getElementById(str).innerHTML) :

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +

        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();
