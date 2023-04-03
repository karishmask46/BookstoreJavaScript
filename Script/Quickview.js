
var bookArray;
var quickViewId = localStorage.getItem('quickView')
console.log(quickViewId);
const ratingStars = [...document.getElementsByClassName("rating__star")];

getBooks();
GetFeedback();
executeRating(ratingStars);

function getBooks() {
    $.ajax({
        type: "GET",
        url: "https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book",
        dataType: 'json',
        headers: { "Authorization": localStorage.getItem('token') },
        success: function (result) {
            console.log(result);
            bookArray = result.result
            console.log(bookArray);
            const filteredArray = bookArray.filter(obj => obj._id.indexOf(quickViewId) !== -1);
            console.log(filteredArray);
            filteredArray.forEach(function (item) {
                console.log(item);
                $(".imagepart").append(`<div class="leftpart">
                <div class="inner">
                    <img class="smallimg" src="/Assets/Image 12@2x.png" alt="">
                    <div class="img">
                        <img class="bookimginner" src="/Assets/Image 12@2x.png" alt="">
                    </div>
                </div>
                <div class="buttonimg">
                    <div>
                        <button class="bag" id="${item._id}" onclick="cart(this)">ADD TO BAG</button>
                    </div>
                    <button class="wish" id="${item._id}" onclick="wishlist(this)"><img src="/Assets/icons8-heart-24.png" alt="">
                    WISHLIST</button>
                </div>
            </div>
            <div class="rightpart">
                <div class="midpart">
                    <div class="title">
                        <p>`+ item.bookName + `</p>
                    </div>
                    <div class="author">
                        <p> by  `+ item.author + `</p>
                    </div>
                    <div class="rating-container">
                        <div class="ratingadd">
                            4.5
                        </div>
                        <div class="no-of-people-rated">
                        (`+ item.quantity + `)
                        </div>
                    </div>
                    <div class="price-container" >
                        <div class="dicounted-price">
                            <span>
                                Rs.`+ item.discountPrice + `
                            </span>
                        </div>
                        <div class="actual-price">
                            Rs.`+ item.price + `
                        </div>
                    </div>
                    <hr>
                    <div>
                        <ul class="descriptionPart">
                            <li>
                                Book Description
                            </li>
                            <p>`+ item.description + `</p>
                        </ul>
                    </div>
                    <hr>
                    <div class="feedback">
                        <h2>Customer Feedback</h2>
                    </div>
                    <div class="feed">
                        <p>Overall Rating</p>
                        <div class="star">
                            <div class="rate">
                                <input type="radio" class="star6" id="star5" name="rate" value="1"  />
                                <label for="star5"  title="text">5 stars</label>
                                <input type="radio" class="star6" id="star4" name="rate" value="2" />
                                <label for="star4" title="text">4 stars</label>
                                <input type="radio" class="star6" id="star3" name="rate" value="3" />
                                <label for="star3" title="text">3 stars</label>
                                <input type="radio" class="star6" id="star2" name="rate" value="4" />
                                <label for="star2" title="text">2 stars</label>
                                <input type="radio" class="star6" id="star1" name="rate" value="5" />
                                <label for="star1" title="text">1 star</label>
                            </div>
                        </div>
                        <textarea class="searchInput" type="text" placeholder="write a review"
                            name="comment" #box></textarea>
                           
                        <div>
                            <button class="btn" id="submitButton"onclick="customerFeedback()">Submit</button>
                        </div>
                        <div class="postfeedBack">
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
};
function dashboard() {
    window.location.href = "/Templates/Dasboard/dashboard.html"
}
function cartPage() {
    window.location.href = "/Templates/Dasboard/cart.html"
}
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

function customerFeedback(i) {
    console.log(i);
    var rate = $(".star6").attr('value')
    var araylist = quickViewId
    var text = $(".searchInput").val();
    console.log(text);
    let obj = {
        comment: text,
        rating: rate
    }
    $.ajax({
        type: "POST",
        url: `https://bookstore.incubation.bridgelabz.com/bookstore_user/add/feedback/${araylist}`,
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

function GetFeedback() {
    var araylist = quickViewId
    $.ajax({
        type: "GET",
        url: `https://bookstore.incubation.bridgelabz.com/bookstore_user/get/feedback/${araylist}`,
        contentType: 'application/json',
        headers: { 'x-access-token': localStorage.getItem('token') },
        success: function (result) {
            console.log(result);
            feedBackArray = result.result
            console.log(feedBackArray);
            feedBackArray.forEach(function (feedback) {
                $(".postfeedBack").append(`<div class="listofFeedback" type="text">
                <div >
                <span class="userId">`+ feedback.user_id.fullName + `</span>
                </div>
                <div class="ratingGet">
                    <input type="radio"  id="star5" name="rate" value="5" />
                    <label for="star5" title="text">5 stars</label>
                    <input type="radio" id="star4" name="rate" value="4" />
                    <label for="star4" title="text">4 stars</label>
                    <input type="radio" id="star3" name="rate" value="3" />
                    <label for="star3" title="text">3 stars</label>
                    <input type="radio" id="star2" name="rate" value="2" />
                    <label for="star2" title="text">2 stars</label>
                    <input type="radio" id="star1" name="rate" value="1" />
                    <label for="star1" title="text">1 star</label>
                </div>
                <div class="comment">
                <p>`+ feedback.comment + `</p>
                </div>
            </div>`)
            })

        },
        error: function (error) {
            console.error(error);
        }
    })
};
function logout() {
    localStorage.removeItem('token');
    window.location.href = "/Templates/Login/login.html"
}



var ratestar;
function executeRating(stars) {
    const starClassActive = "rating__star fas fa-star";
    const starClassInactive = "rating__star far fa-star";
    const starsLength = stars.length;
    let i = 1;
    stars.map((star) => {
        star.onclick = () => {
            i = stars.indexOf(star);
            ratestar=i
            console.log(ratestar);
            if (star.className === starClassInactive) {
                for (i; i >= 0; --i) {
                    stars[i].className = starClassActive;
                }
            } else {
                for (i; i < starsLength; ++i){
                    stars[i].className = starClassInactive;
                }
            }
        };
        
        
    });

}