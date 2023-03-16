
var bookArray;
var quickViewId = localStorage.getItem('quickView')
console.log(quickViewId);

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
            const filteredArray = bookArray.filter(obj => obj._id.indexOf(quickViewId) !== -1); 
            console.log(filteredArray); 
            filteredArray.forEach(function (item) {
                $(".imagepart").append(`<div class="leftpart">
                <div class="inner">
                    <img class="smallimg" src="/Assets/Image 12@2x.png" alt="">
                    <div class="img">
                        <img class="bookimginner" src="/Assets/Image 12@2x.png" alt="">
                    </div>
                </div>
                <div class="buttonimg">
                    <div>
                        <button class="bag">ADD TO BAG</button>
                    </div>
                    <div class="quantity">
                        <button class="subtract">-</button>
                        <span class="numder"></span>
                        <button class="add">+</button>
                    </div>
                    <button class="wish">WISHLIST</button>
                </div>
            </div>
            <div class="rightpart">
                <div class="midpart">
                    <div class="title">
                        <h1>`+item.bookName +`</h1>
                    </div>
                    <div class="author">
                        <p> by  `+ item.author + `</p>
                    </div>
                    <div class="rating-container">
                        <div class="rating" fxLayout="row" fxLayoutAlign="center center">
                            4.5
                        </div>
                        <div class="no-of-people-rated">
                        (`+ item.quantity + `)
                        </div>
                    </div>
                    <div class="price-container" fxLayout="row">
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
                        <ul>
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
                                <input type="radio" id="star5" name="rate" value="5" />
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
                        </div>
                        <textarea class="searchInput" type="text" placeholder="write a review"
                            style="width: 570px;height: 70px;" name="comment" #box></textarea>
                        <div>
                            <button class="btn">Submit</button>
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