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
          <img src="/Assets/Image 12@2x.png" alt="" id="${item._id}"  height="125px" width="105px" onclick="quickview(this)"></div>
          <div class="descr">
            <div class="authorname"> 
                 <span class="bookname-text"><b>`+ item.bookName + `</b></span>
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
            <div class="cart-wish">
            <div class="cart">
                <button class="Add-Bag" id="${item._id}" onclick="cart(this)">ADD TO BAG</button>
            </div>
            <div class="wish">
                <button class="Wish-list" id="${item._id}" onclick="wishlist(this)"> <img src="/Assets/icons8-heart-24.png" alt="">WISHLIST</button>
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
function quickview(element){
    var bookId=$(element).attr('id')
    localStorage.setItem('quickView',bookId)
    window.location.href="/Templates/Dasboard/QuickView.html"
}
function cart(cartId){
    var element=$(cartId).attr('id')
    console.log(element);
    let obj={
        bookid: element,
      }
      console.log(obj);
    $.ajax({
        type: "POST",
        url: `https://bookstore.incubation.bridgelabz.com/bookstore_user/add_cart_item/${element}`,
        data: JSON.stringify(obj),
        contentType: 'application/json',
        headers: { 'x-access-token': localStorage.getItem('token') },
        success: function (result) {
            console.log(result);
        },
        error: function (error) {
            console.error(error);
        }
    })
}
function wishlist(element){
    var wishID=$(element).attr('id')
    console.log(wishID);
    let obj={
        bookid: wishID,
      }
      console.log(obj);
    $.ajax({
        type: "POST",
        url: `https://bookstore.incubation.bridgelabz.com/bookstore_user/add_wish_list/${wishID}`,
        data: JSON.stringify(obj),
        contentType: 'application/json',
        headers: { 'x-access-token': localStorage.getItem('token') },
        success: function (result) {
            console.log(result);
        },
        error: function (error) {
            console.error(error);
        }
    })
}
function cart(){
    window.location.href="/Templates/Dasboard/cart.html"
}
