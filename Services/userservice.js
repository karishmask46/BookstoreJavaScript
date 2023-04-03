
var bookArray, filterArray;
console.log(localStorage.getItem('token'));
cartItemList();
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
      getbooks(filterArray);
      search();
      $(".booktotal").append(`<div><span class="Bookheading">Books</span>
            <span id="itemslength">(`+ bookArray.length + ` items) </span></div>`)
    },
    error: function (error) {
      console.error(error);
    }
  });
});
function getbooks(bookArray) {
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
                <span>Rs.`+ item.price + `</span>
            </div>
            <div class="actual-price">
                Rs.`+ item.discountPrice + `
            </div>
            </div>
        </div>
        <div class="cart-wish">
        <div class="cart">
            <button class="Add-Bag" id="${item._id}" onclick="AddtoCart(this)">ADD TO BAG</button>
        </div>
        <div class="wish">
            <button class="Wish-list" id="${item._id}" onclick="wishlist(this)"> <img src="/Assets/icons8-heart-24.png" alt="">WISHLIST</button>
        </div>
    </div>
        </div>
   </div>`)
  })

}


function search() {
  $("#searchId").on("keyup", function () {
    var query = $("#searchId").val();
    console.log(query);
    var filteredNotes = filterArray.filter(function (book) {
      return book.author.toLowerCase().indexOf(query) > -1 || book.bookName.toLowerCase().indexOf(query) > -1
    });
    console.log(filteredNotes);
    $('.innercontent').empty();
    getbooks(filteredNotes)
  })

}
function myFunction(){
  var selectedOption = document.getElementById("input-field").value;
  console.log("Selected option: " + selectedOption);
  if(selectedOption=="low to High"){
    $(".innercontent").empty();
    group = filterArray.sort((low, high) => low.price - high.price);
    console.log(group, "Low to High");
    getbooks(group);
  }
  if(selectedOption=="High to low"){
    $(".innercontent").empty();
    group = filterArray.sort((low, high) => high.price - low.price);
    console.log(group, "High to Low");
    getbooks(group);
  }
  if(selectedOption=="newest Arivals"){
    $(".innercontent").empty();
    group = filterArray.reverse();
    console.log(group, "newest Arrivals");
    getbooks(group);
  }
}
function AddtoCart(cartId) {
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
function cartItemList(){
  $.ajax({
    type: "GET",
    url: "https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items",
    contentType: 'application/json',
    headers: { "x-access-token": localStorage.getItem('token') },
    success: function (result) {
      console.log(result);
      bookArray = result.result
      // console.log(bookArray);
      getCartItems(bookArray)
      var listObj = bookArray
      $(".xyz").append(` <a class="order" href="/Templates/Dasboard/Orderscucess.html">Checkout</a>`)

      $(".quantityArray").append(`<h3 class="heading">My cart
        (`+ bookArray.length + `)
       </h3>`)

    },
    error: function (error) {
      console.error(error);
    }
  });
}
  

function getCartItems(bookArray){
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
               <span class="numder">`+ item.quantityToBuy + `</span>
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

}
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
      cartItemList();
      $(".quantityArray").empty();
      $(".book-cartlist").empty();
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
var item_qty;
var qunt = [];
function increasebook(Book) {
  Book = JSON.parse(decodeURIComponent(Book))
  item_qty = Book.quantityToBuy;
  console.log(item_qty);
  if (item_qty > 0) {
    item_qty += 1;
    console.log("increase", item_qty);
    quantityTobuy(Book, item_qty);
  }
}
function decreasebook(Book) {
  Book = JSON.parse(decodeURIComponent(Book))
  item_qty = Book.quantityToBuy;
  console.log(item_qty);
  if (item_qty > 0) {
    item_qty -= 1;
    console.log("decrease", item_qty);
    quantityTobuy(Book, item_qty);
  }

}
function quantityTobuy(quantity, item) {
  console.log(quantity);
  console.log(item);
  let details = {
    quantityToBuy: item
  }
  $.ajax({
    type: "PUT",
    url: `https://bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/${quantity._id}`,
    contentType: 'application/json',
    data: JSON.stringify(details),
    headers: { "x-access-token": localStorage.getItem('token') },
    success: function (data) {
      console.log(data);
      cartItemList();
      $(".quantityArray").empty();
      $(".book-cartlist").empty();
    },
    error: function (error) {
      console.error(error);
    }
  });
}
var elememt1;
function fun1(){
 let getelement="example for let";
 let array1=["1","2","3","4"]
 array1=push["5"]

}