# gustavkarlsson.se

This is the source code for my personal website.

`master` should be what's in production on [gustavkarlsson.se](http://gustavkarlsson.se/).

## Tools used
The project is built using the following tools:

- [HTML5 Boilerplate](http://html5boilerplate.com/)
- [Modernizr](http://modernizr.com/)
- [SASS](http://sass-lang.com/)
- [Compass](http://compass-style.org/)
- [jQuery](http://jquery.com/)
- [fancyBox](http://fancyapps.com/fancybox/)

## How to build
The project relies on Compass components, so to build it; Compass must be installed.

### Preparation
1. Install Ruby (required for Compass)
2. Install the Compass gem (`gem install compass`)

### Building
Use the Compass compiler to build the project: `compass compile [project-home]`

## TODO
- Optimize Javascript (especially the functions bound to scroll and resize events)
- Refactor SASS code
- Externalize social icon style (put it in index.sass)
- Design some nicer favicons
- Create separate build files for production and development1
- Test and handle older browsers
- Don't use fancyBox on small screens
- Improve SEO
- Replace mailto with popup textfield containing email
- Make intro text more readable
