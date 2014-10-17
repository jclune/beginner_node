var users = {
  admin: 'adpswd',
  q: 'q'
};

exports.user = function(u,p) {
  if (users[u]){
    if (users[u] === p){
      return true;
    } else{
      return false;
      //wrong password      
    }
    return false;
    //wrong username
  }
}