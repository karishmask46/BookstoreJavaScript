function quickview(element) {
    var bookId = $(element).attr('id')
    localStorage.setItem('quickView', bookId)
    window.location.href = "/Templates/Dasboard/QuickView.html"
}