function dashboard() {
    window.location.href = "/Templates/Dasboard/dashboard.html"
}


$(function () {
    $(".place").on("click", function () {
        console.log("clicked");
        $(".Abcd").css('display', 'block')
        $(".first").hide();
    })

})
$(function () {
    $(".continue-button").on("click", function () {
        console.log("clicked");
        $(".work").css('display', 'block')
    })
})

function orderPage() {
    window.location.href = "/Templates/Dasboard/Orderscucess.html";
}