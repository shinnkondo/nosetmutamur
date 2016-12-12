require("magnific-popup")

require('./_app.coffee')
require('./article.js')

require('../stylesheets/main.css.scss')

$(document).ready(function() {
  $('.img-popup-link').magnificPopup({type:'image', closeOnContentClick: true});
});
