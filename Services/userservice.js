var bookArray;
console.log(localStorage.getItem('token'));

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
      filterArray = result.result

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
      $("#searchId").on("keyup",function(){
        var query = $("#searchId").val();
        console.log(query);
        var filteredNotes = filterArray.filter(function (book) {
          return book.bookName.indexOf(query) > -1 || book.author.indexOf(query) > -1
        });
        console.log(filteredNotes);
        $('.innercontent').empty();
        $.each(filteredNotes, function (key, value) {
          $('.innercontent').append(`<div class="bookdiv">
          <div class="book-image">
    <img src="/Assets/Image 12@2x.png" alt="" id="${value._id}"  height="125px" width="105px" onclick="quickview(this)"></div>
    <div class="descr">
      <div class="authorname"> 
           <span class="bookname-text"><b>`+ value.bookName + `</b></span>
            <span class="author-text">by  `+ value.author + `</span>
      </div>
      <div class="rating-container">
          <div class="rating">
              4.5
              <img src="/Assets/icons8-star-24.png" alt="" height="12px" width="12px">
          </div>
          <div class="no-of-people-rated">
              (`+ value.quantity + `)
          </div>
      </div>
      <div class="price-container" >
      <div class="priceText"> 
          <div class="dicounted-price">
              <span>Rs.`+ value.discountPrice + `</span>
          </div>
          <div class="actual-price">
              Rs.`+ value.price + `
          </div>
          </div>
      </div>
      <div class="cart-wish">
      <div class="cart">
          <button class="Add-Bag" id="${value._id}" onclick="cart(this)">ADD TO BAG</button>
      </div>
      <div class="wish">
          <button class="Wish-list" id="${value._id}" onclick="wishlist(this)"> <img src="/Assets/icons8-heart-24.png" alt="">WISHLIST</button>
      </div>
  </div>
      </div>
 </div>`)

        })
       

      })
      $(".home-Book").append(`<span class="Bookheading">Books</span>
            <span id="itemslength">(`+ bookArray.length + ` items) </span>`)
    },
    error: function (error) {
      console.error(error);
    }
  });
});
function cart(cartId) {
  var element = $(cartId).attr('id')
  console.log(element);
  let obj = {
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
function cart() {
  window.location.href = "/Templates/Dasboard/cart.html"
}
function wishlist(element) {
  var wishID = $(element).attr('id')
  console.log(wishID);
  let obj = {
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

// cart Api
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
               <span class="cart-Desc">`+ item.product_id.bookName + `</span>
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
                   <button class="subtract"  onclick="decreasebook('${encodeURIComponent(JSON.stringify(item))}')">-</button>
                   <span class="numder">`+item.quantityToBuy+`</span>
                   <button class="add"  onclick="increasebook('${encodeURIComponent(JSON.stringify(item))}')">+</button>
                   <div class="btn">
                       <button id="${item._id}" onclick="removeCart(this)" class="Remove-Button">
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
          var listObj=bookArray
          $(".xyz").append(` <a class="order" href="/Templates/Dasboard/Orderscucess.html"  onclick="checkout('${encodeURIComponent(JSON.stringify(listObj))}')">Checkout</a>`)

          console.log(bookArray);
          $(".quantityArray").append(`<h3 class="heading">My cart
(`+ bookArray.length + `)
</h3>`)

      },
      error: function (error) {
          console.error(error);
      }
  });
});
function removeCart(element) {
  var deleteId = $(element).attr('id')
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
$(function () {
  $("#customerDetails").on("submit", function (event) {
      event.preventDefault();
      addressType = ['Home', 'work', 'others']
      let details = {
          addressType: addressType,
          fullAddress: $("#full_adress").val(),
          city: $("#Town-Input").val(),
          state: $("#State-Input").val(),
      }
      $.ajax({
          type: "PUT",
          url: "https://bookstore.incubation.bridgelabz.com/bookstore_user/edit_user",
          contentType: 'application/json',
          data: JSON.stringify(details),
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
function checkout(element) {
  element = JSON.parse(decodeURIComponent(element))
  console.log(element);
  let orders = []
    let Book = {
      product_id: element.product_id._id,
      product_name: element.product_id.bookName,
      product_quantity: element.product_id.quantity,
      product_price: element.product_id.price,
    }
    orders.push(Book)
  
  let payload = {
    orders: orders
  }
  $.ajax({
      type: "POST",
      url: "https://bookstore.incubation.bridgelabz.com/bookstore_user/add/order",
      contentType: 'application/json',
      data: JSON.stringify(payload),
      headers: { "x-access-token": localStorage.getItem('token') },
      success: function (data) {
          console.log(data);

      },
      error: function (error) {
          console.error(error);
      }
  });

}
var item_qty;
var qunt = [];
function increasebook(Book) {
  Book = JSON.parse(decodeURIComponent(Book))
  item_qty = Book.quantityToBuy;
  console.log(item_qty);
  if (item_qty > 0) {
      item_qty += 1;
      console.log("increase", item_qty);
      quantityTobuy(Book,item_qty);
  }
}
function decreasebook(Book) {
  Book = JSON.parse(decodeURIComponent(Book))
  item_qty = Book.quantityToBuy;
  console.log(item_qty);
  if (item_qty > 0) {
      item_qty -= 1;
      console.log("decrease", item_qty);
      quantityTobuy(Book,item_qty);
  }

}
function quantityTobuy(quantity,item) {
  console.log(quantity);
  console.log(item);
  let details = {
      quantityToBuy:item
  }
  $.ajax({
      type: "PUT",
      url: `https://bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/${quantity._id}`,
      contentType: 'application/json',
      data: JSON.stringify(details),
      headers: { "x-access-token": localStorage.getItem('token') },
      success: function (data) {
          console.log(data);

      },
      error: function (error) {
          console.error(error);
      }
  });
}