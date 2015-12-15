module.exports = {
  server: {
    options: {
      port: 8000,
      base: './',
      middleware: function(connect, options, middlewares) {
        middlewares.unshift(function(req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', '*');
          next();
        });

        return middlewares;
      }      
    }
  }
}