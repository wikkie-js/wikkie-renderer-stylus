var path = require('path');
var stylus = require('stylus');
var nib = require('nib');

exports.init = function init(wikkie, conf) {
  var utils = wikkie.utils;
  var config = wikkie.config;

  function main(generatedFile, locals) {
    var filename = generatedFile.filename;
    return utils.readFileAsync(filename, 'utf-8').then(function(str) {
      return new Promise(function (resolve, reject) {
        stylus(str)
          .use(nib())
          // .use(defineConfig)
          .set('filename', filename)
          // .set('compress', config.compress)
          .set('include css', true)
          .render(function(err, css) {
            if (err) {
              reject(err);
            } else {
              generatedFile.content = css;
              resolve(css);
            }
          });
      });
    });
  }

  wikkie.plugins.renderer.add('wikkie-renderer-stylus', 'styl', main, undefined, undefined, undefined);
  wikkie.plugins.renderer.add('wikkie-renderer-stylus', 'stylus', main, undefined, undefined, undefined);
}
