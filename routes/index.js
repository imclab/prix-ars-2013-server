
/**
 * Module dependencies.
 */

var path = require('path')
  , fs = require('fs')
  , Photo = require('../models').Photo; 

/*
 * GET /
 */

exports.index = function(req, res) {
  Photo.find({}, function(err, photos) {
    if (err) console.log(err);

    photos.forEach(function(photo) {
      photo.file = './photos/' + photo.file;
    });

    res.render('index', { photos: photos });
  });
};

/*
 * POST /photos
 */

exports.photos = function(req, res) {
  var body     = req.body;
    // , pathname = req.files.file.path
    // , filename = path.basename(pathname);

  console.log(body);

  var filename = Math.floor(Math.random() * 10000000) + '.png'
    , filepath = './public/photos/' + filename
    , image = new Buffer(body.photo, 'base64');
    // , file = fs.openSync(fileName, "w");

  // fs.writeSync(file, image, 0, image.length);
  // fs.closeSync(file);

  fs.writeFile(filepath, image, function(err) {
    console.log(err);
  });

  // console.log(req);

  // res.header({
  //   'Content-Type':'application/json',
  //   'cache-control':'no-cache'
  // });

  // res.json(200, { status: 'OK' });

  Photo.create({ file: filename }, function(err, photo) {
    console.log(err, photo);
  });

  // Photo.create({
  //   file:      filename,
  //   binary:    body.photo,
  //   x:         body.x,
  //   y:         body.y,
  //   timestamp: body.timestamp,
  //   battery:   body.battery
  // },

  // function(err) {
  //   if (err) console.log(err);
  //   res.redirect('back');
  // });
  res.json(200, { status: 'OK' });
}