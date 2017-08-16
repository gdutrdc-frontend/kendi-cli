var match = require('minimatch')

module.exports = function (files, data, done) {
  var fileNames = Object.keys(files)
  fileNames.forEach(function (file) {
    for (var em in data) {
      var re = new RegExp('{{\\s*' + em + '\\s*}}', 'g')
      var newfile = file.replace(re, data[em])
      if (file !== newfile) {
        var val = files[file]
        delete files[file]
        files[newfile] = val
      }
    }
  })

  done()
}
