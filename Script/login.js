$(function () {
    $("#LoginForm").on("submit", function (event) {
        event.preventDefault();
        let obj = {
            email: $("#EmailId").val(),
            password: $("#PasswordId").val()
        }
        $.ajax({
            type: "POST",
            url: "https://bookstore.incubation.bridgelabz.com/bookstore_user/login",
            data: JSON.stringify(obj),
            contentType: 'application/json',
            success: function (data) {
                console.log(data);
                alert("sigin successfull.");
            },
            error: function (error) {
                console.error(error);
                alert('signin failed, please try again');
            }

        });

    });
});
function signup(){
    window.location.href="/Templates/signup/signup.html"
}
