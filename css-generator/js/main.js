function restart() {
  $('#filename').val();
  $('#file_creator_popup .popup_err').hide();
  grids_ok = 0;
  id = 0;
  $('.grid').each(function() {
    $(this).removeAttr('style');
    $('.item', this).each(function() {
      $(this).removeAttr('style');
    });
    if ($(this).hasClass('not_empty')) {
      $(this).fadeOut('fast', function() { 
        $(this).show().removeClass('not_empty').html(''); 
        $('.no_content_panel', $(this).parent()).hide().fadeIn('fast');
      });
      $('.control_panel', $(this).parent()).fadeOut('fast');
    }
  });
  $('#next_step').removeClass('visible').slideUp('fast');
}

$(document).ready(function() {
  set_w3_urls();
  $('#restart').click(function() {
    restart();
  });
});
