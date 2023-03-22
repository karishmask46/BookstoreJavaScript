$(function () {
    $.ajax({
        type: "GET",
        url: "https://bookstore.incubation.bridgelabz.com/bookstore_user/get_wishlist_items",
        contentType: 'application/json',
        headers: { "x-access-token": localStorage.getItem('token') },
        success: function (result) {
            console.log(result);
            bookArray = result.result
            console.log(bookArray);

            bookArray.forEach(function (item) {
                $(".book-cartlist").append(` 
         <div class="crt">
         <div class="bookPart">
             <div class="image">
                 <img class="cart-Image" src="/Assets/Image 12@2x.png" alt="" height="100px" width="80px">
             </div>
             <div class="book-description">
              <div class="desc-Text">
                 <span class="cart-Desc">`+ item.product_id + `</span>
                 <span class="cart-author">by `+ item.product_id + `</span>
                 </div>
                 <div class="price-container">
                     <div class="discounted-price">
                         <b>Rs.`+ item.product_id + `</b>
                     </div>
                     <div class="actual-price">
                         Rs.`+ item.product_id + `
                     </div>
                 </div>
             </div>
             </div>
             <div class="delete" >
                <img class="deletebutton" src="/Assets/delete_FILL0_wght400_GRAD0_opsz48.svg" alt="" height="30px" width=""30px>
            </div>
             </div>
             `)
            })
            $(".quantityArray").append(` <h3 class="j1">My Wishlist(` + bookArray.length + `)</h3>`)
        },
        error: function (error) {
            console.error(error);
        }
    });
});
function dashboard() {
    window.location.href = "/Templates/Dasboard/dashboard.html"
}
function cart() {
    window.location.href = "/Templates/Dasboard/cart.html"
  }


