//= require "_app"
//= require angular-utils-pagination/dirPagination
//= require "_include/ui-bootstrap-custom-0.13.0"
//= require "underscore/underscore-min"
//= require "_include/pourover"
//= require "magnific-popup/dist/jquery.magnific-popup"

$(document).ready(function() {
  $('.img-popup-link').magnificPopup({type:'image', closeOnContentClick: true});
});