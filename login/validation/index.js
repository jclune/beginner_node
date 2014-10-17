exports.login = function(req, res, next) {
  var user = req.user = req.param('user', {});
  var errors = req.errors = req.errors || [];
  if (!user.type) {
    errors.push('管理者かゲストを選択してください。');
    return next();
  }

  if (user.type == 'admin') {
    if (!user.name) {
      errors.push('名前を入力してください。');
    }
    if (!user.password) {
      errors.push('パスワードを入力してください。');
    }
  } else if (user.type != 'guest') {
    errors.push('不正なパラメータを受け取りました。');
  }
  return next();
}
