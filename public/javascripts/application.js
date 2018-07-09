$(function() {
  $('.publish').on('click', function(e) {
    var repo = {
      id:    $(this).data('id'),
      name:  $(this).data('name'),
      desc:  $(this).data('desc'),
      url:   $(this).data('url'),
      stars: $(this).data('stars')
    };

    $.ajax({
      url: '/repositories/publish/' + $(this).data('id'),
      method: 'POST',
      data: repo
    }).done(function(response){
      console.log(response);
    });
  });
});