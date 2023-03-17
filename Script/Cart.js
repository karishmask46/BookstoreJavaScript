function dashboard() {
    window.location.href = "/Templates/Dasboard/dashboard.html"
}
$(function () {
    $.ajax({
        type: "GET",
        url: "https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items",
        contentType: 'application/json',
        headers: { "x-access-token": localStorage.getItem('token') },
        success: function (result) {
            console.log(result);
            bookArray = result.result
            console.log(bookArray);

            bookArray.forEach(function (item) {
                $(".book-cartlist").append(` 
         <div class="crt">
             <div class="image">
                 <img class="cart-Image" src="/Assets/Image 12@2x.png" alt="" height="100px" width="80px">
             </div>
             <div class="book-description">
              <div class="desc-Text">
                 <span class="cart-Desc">`+ item.product_id.bookName +`</span>
                 <span class="cart-author">by `+ item.product_id.author + `</span>
                 </div>
                 <div class="price-container">
                     <div class="discounted-price">
                         <b>Rs.`+ item.product_id.discountPrice + `</b>
                     </div>
                     <div class="actual-price">
                         Rs.`+ item.product_id.price + `
                     </div>
                 </div>
                 <div class="quantity">
                     <button class="subtract">-</button>
                     <span class="numder"></span>
                     <button class="add">+</button>
                     <div class="btn">
                         <button id="${item.product_id._id }" onclick="removeCart(this)" class="Remove-Button">
                             Remove
                         </button>
                     </div>
                 </div>
             </div></div>`)
                $(".checkoutCartOrder").append(`
                <div class="cart1"><div class="image">
          <img src="/Assets/Image 12@2x.png" alt="" height="150px" width="120px">
      </div>
      <div class="book-description">
      <div class="desc-Text">
          <span class="cart-Desc">
          `+ item.product_id.bookName + `
          </span>
          <span class="cart-author">by
          `+ item.product_id.author + `
          </span>
          </div>
          <div class="price-container">
              <div class="discounted-price">
                  <b>Rs.`+ item.product_id.discountPrice + `</b>
              </div>
              <div class="actual-price">
                  Rs.`+ item.product_id.price + `
              </div>
          </div>
      </div>
  </div>
  </div>`)
            })
            $(".quantityArray").append(`<h3 class="heading">My cart
  (`+ bookArray.length + `)
</h3>`)
        },
        error: function (error) {
            console.error(error);
        }
    });
});

$(function(){
    $(".place").on("click",function(){
        console.log("clicked");
        $(".Abcd").css( 'display' , 'block')
        $(".first").hide();
    })
   
})
$(function(){
    $(".continue-button").on("click",function(){
        $(".work").css('display' , 'block')
    })
})
function removeCart(element){
    var deleteId=$(element).attr('id')
    console.log(deleteId);
    $.ajax({
        type: "DELETE",
        url: `https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_cart_item/${deleteId}`,
        contentType: 'application/json',
        headers: { "x-access-token": localStorage.getItem('token') },
        success: function (data) {
          console.log(data);
        },
        error: function (error) {
          console.error(error);
        }
      });
}
$(function(){
    $("#customerDetails").on("submit",function(){
        addressType=['Home','work','others']
        let details={
            addressType: addressType,
            fullAddress:$("#full_adress").val(),
            city: $("#Town-Input").val(),
            state: $("#State-Input").val(),
        }
        $.ajax({
            type: "PUT",
            url: "https://bookstore.incubation.bridgelabz.com/bookstore_user/edit_user",
            contentType: 'application/json',
            data:JSON.stringify(details),
            headers: { "x-access-token": localStorage.getItem('token') },
            success: function (data) {
              console.log(data);
            },
            error: function (error) {
              console.error(error);
            }
          });
    })
})