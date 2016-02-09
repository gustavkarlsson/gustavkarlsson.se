# gustavkarlsson.se
The source code for my personal website

## Running
The best way to run the project is using [Docker](https://www.docker.com/):

Build: `docker build -t gustavkarlsson/gustavkarlsson.se .`  
Run: `docker run -d -p <port>:8080 gustavkarlsson/gustavkarlsson.se` where `<port>` is the port you want to listen to.  
Stop: `docker stop <container-id>` where `<container-id>` is the id printed by the run command

## Building
This is how you build the project for development:

### Required software
- [Node](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Gulp](http://gulpjs.com/)

### Dependencies
Install dependencies by running `npm install`

### Tasks
This project uses [Gulp](http://gulpjs.com) to run automated tasks for development and production builds.
The tasks are as follows:

`gulp --production`: Build the production ready version of the project

`gulp serve`: Compiles preprocessors and boots up development server  
`gulp serve --open`: Same as `gulp serve` but will also open up site/app in your default browser  
`gulp serve --production`: Same as `gulp serve` but will run all production tasks so you can view the site/app in it's final optimized form

`gulp test`: Lints all `*.js` file in the `source` folder using eslint and runs all `*.test.js` file unit tests through [Karma](http://karma-runner.github.io/0.13/index.html) and [Jasmine](http://jasmine.github.io/)  
`gulp test --watch`: Same as `gulp test` but will constantly watch `*.test.js` files and rerun tests when changes are detected

***Adding the `--debug` option to any gulp task displays extra debugging information (ex. data being loaded into your templates)***

## Technologies used

Packaging and deployment
- [Docker](https://www.docker.com/)

Code Management
- [Git](https://git-scm.com/)
- [Editorconfig](http://editorconfig.org/)

Scaffolding
- [Yeoman](http://yeoman.io/)

Build automation
- [Gulp](http://gulpjs.com)

JavaScript
- [Browserify](http://browserify.org/)

Linting
- [ESlint](http://eslint.org/)

Markup
- [Jade](http://jade-lang.com/)

Styles
- [Stylus](https://learnboost.github.io/stylus/)
- [nib](https://tj.github.io/nib/)

Optimization
- [Imagemin](https://github.com/imagemin/imagemin)
- [Uglify](https://github.com/mishoo/UglifyJS)

Server
- [BrowserSync](http://www.browsersync.io/)

<!---
Testing
- [Karma](http://karma-runner.github.io/0.13/index.html)
- [Jasmine](http://jasmine.github.io/)
-->
