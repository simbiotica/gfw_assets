# GFW Assets

This repo powers the navigation bar shared by all Global Forest Watch
websites, such as GFW, GFW Fires, Commodities, etc.

![Navbar in action](images/demo.png?raw=true)

## Developing

Install the dependencies and run grunt -- this watches for changes and
sets up a local server for you to test with:

```
npm install
grunt dev
```

You can now use your build with the URLs
[http://localhost:9000/js/build/production.js](http://localhost:9000/js/build/production.js)
or
[http://localhost:9000/js/build/production.min.js](http://localhost:9000/js/build/production.min.js).

For example, in GFW.org they are loaded in via the [layout
files](https://github.com/Vizzuality/gfw/blob/master/app/views/layouts/map.html.erb#L30).
