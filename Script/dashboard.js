var bookArray;

$(function () {
    $.ajax({
        type: "GET",
        url: "https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book",
        dataType: 'json',
        headers: { "Authorization": localStorage.getItem('token') },
        success: function (result) {
            console.log(result);
            bookArray = result.result
            console.log(bookArray);

            bookArray.forEach(function (item) {

                $('.innercontent').append(`<div class="bookdiv">
                <div class="book-image">
          <img src="/Assets/Image 12@2x.png" alt=""  height="125px" width="105px" onclick="quickview()"></div>
          <div class="descr">
            <div class="authorname"> 
                 <span class="bookname-text">`+ item.bookName + `</span>
                  <span class="author-text">by  `+ item.author + `</span>
            </div>
            <div class="rating-container">
                <div class="rating">
                    4.5
                    <img src="/Assets/icons8-star-24.png" alt="" height="12px" width="12px">
                </div>
                <div class="no-of-people-rated">
                    (`+ item.quantity + `)
                </div>
            </div>
            <div class="price-container" >
            <div class="priceText"> 
                <div class="dicounted-price">
                    <span>Rs.`+ item.discountPrice + `</span>
                </div>
                <div class="actual-price">
                    Rs.`+ item.price + `
                </div>
                </div>
            </div>
            </div>
       </div>`)
            })
        },
        error: function (error) {
            console.error(error);
        }
    });
});
function quickview(){
    window.location.href="/Templates/Dasboard/QuickView.html"
}
