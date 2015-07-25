//= require "_include/extoc_1_0"
//= require "bootstrap/affix"
//= require "bootstrap/scrollspy"
$('#toc').exTOC({
    headFrom : 2,
    headTo : 5,
    insertMethod : 'prepend',
    contents: '.article-content',
    ulclass: "nav",
    offset: 5,
    numbering: false
});
$('body').scrollspy({ target: '#toc' });
