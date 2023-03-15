$(function () {
    $("#registrationForm").on("submit", function (event) {
        event.preventDefault();
        let obj = {
            fullName: $("#fullName").val(),
            email: $("#EmailId").val(),
            password: $("#Passwordid").val(),
            phone: $("#MobileId").val()
        }
        $.ajax({
            type: "POST",
            url: "https://bookstore.incubation.bridgelabz.com/bookstore_user/registration",
            data:JSON.stringify(obj) ,
            contentType: 'application/json',
            success: function (data) {
                console.log(data);
                console.log("Form submitted successfully.");
                alert("registration successful")
            },
            error: function (error) {
                console.error(error);
                alert('Registration failed, please try again');
            }
        });
    });

});
function login(){
    window.location.href="/Templates/Login/login.html"
}
