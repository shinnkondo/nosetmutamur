require("magnific-popup")

require('./_app.coffee')
require('./article.js')

require('../stylesheets/main.css.scss')

$(document).ready(function() {
    if ($('.img-popup-link').length) {
        $('.img-popup-link').magnificPopup({type:'image', closeOnContentClick: true});
    }
});
