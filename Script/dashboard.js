function quickview(element) {
    var bookId = $(element).attr('id')
    localStorage.setItem('quickView', bookId)
    window.location.href = "/Templates/Dasboard/QuickView.html"
}
function cart() {
    window.location.href = "/Templates/Dasboard/cart.html"
  }
  function logout(){
    localStorage.removeItem('token');
    window.location.href="/Templates/Login/login.html"
  }