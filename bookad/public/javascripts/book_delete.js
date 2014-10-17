$(function() {
  $('a.delete').on('click', function() {
    var ans = confirm('削除していいですか？');
    if (ans) {
      var self = $(this);
      $.post(self.prop('href') + '?_method=DELETE', function() {
        self.trigger('deleted');
      });
    }
    return false;
  });
});
