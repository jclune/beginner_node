/*
 * grunt-init-jquery
 * https://gruntjs.com/
 *
 * Copyright (c) 2014 Hirofumi Matamura
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Generate a web project';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'ウェブサイト制作環境を構築します。';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'webapp'}, [
    init.prompt('name'),
    init.prompt('title'),
    init.prompt('description', 'Input your project description.'),
    init.prompt('version'),
    init.prompt('author_name'),
    {
      name: 'use_test',
      message: 'Do testing',
      default: 'y/N',
      warning: 'Yes: add mocha test task. No: nothing to see here.'
    }
  ], function(err, props) {
    console.log(props.use_test);
    props.use_test = /y$/i.test(props.use_test);
    console.log(props.use_test);
    //props.use_test = false;

    var files = init.filesToCopy(props);
    init.copyAndProcess(files, props, {noProcess: '**/*.{png,jpg,gif}'});

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', {
      name: props.name,
      version: props.version,
      node_version: '>= 0.8.0',
      devDependencies: {
        "grunt": "~0.4.1",
        "grunt-contrib-copy": "~0.4.1",
        "grunt-contrib-concat": "~0.3.0",
        "grunt-contrib-uglify": "~0.2.0",
        "grunt-contrib-compass": "~0.7.0",
        "grunt-contrib-jshint": "~0.7.0",
        "grunt-contrib-cssmin": "~0.7.0",
        "grunt-contrib-connect": "~0.5.0",
        "grunt-contrib-clean": "~0.5.0",
        "grunt-bower-install": "~1.0.0",
        "grunt-contrib-imagemin": "~0.5.0",
        "grunt-contrib-watch": "~0.5.2",
        "grunt-rev": "~0.1.0",
        "grunt-autoprefixer": "~0.6.0",
        "grunt-mocha": "~0.4.0",
        "grunt-newer": "~0.6.0",
        "load-grunt-tasks": "~0.2.0",
        "time-grunt": "~0.2.0",
        "jshint-stylish": "~0.1.3",
        "grunt-contrib-sass": "^0.7.3"
      },
    });
  
    done();
  });

};
