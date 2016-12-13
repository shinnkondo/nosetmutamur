var $ = require("jquery")
require("magnific-popup")

$(document).ready(function() {
    if ($('.img-popup-link').length) {
        $('.img-popup-link').magnificPopup({type:'image', closeOnContentClick: true});
    }
});
