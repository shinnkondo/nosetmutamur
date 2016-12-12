require("./_include/extoc_1_0.js")
require("bootstrap/js/affix")
require("bootstrap/js/scrollspy")

$(document).ready(function () {
  if ($('#toc').length) {
    $('#toc').exTOC({
      headFrom: 2,
      headTo: 5,
      insertMethod: 'prepend',
      contents: '.article-content',
      ulclass: "nav",
      offset: 5,
      // numbering: false
    });
    $('body').scrollspy({ target: '#toc' });
    var initPos = $('#toc').position().top;
    $('#toc').affix({
      offset: {
        top: initPos,
        bottom: function () {
          return (this.bottom = $('.footer').outerHeight(true));
        }
      }
    });
  }
});

