function login() {
    
    // JS Way
    // var http = new XMLHttpRequest();
    // var params = 'email=' + inputEmail.value + '&password=' + inputPassword.value;
    // http.open('POST', url, true);
    // http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // http.onload = function () {
    //     if (http.readyState == 4 && http.status == 200) {
    //         let data = JSON.parse(http.response)
    //         // save in cookie
    //         // redirect
    //     } else {
    //         let err = JSON.parse(http.response)
    //         alert(err.msg)
    //     }
    // }
    // http.send(params);


    // JQuery Way
    let request = $.ajax({
        method: "POST",
        url: url,
        dataType: "json",
        data: { email: inputEmail.value, password: inputPassword.value }
    });
    request.done(function (data) {
        // save in cookie
        createCookie("MEAN2020Data", data.token);
        createCookie("MEAN2020DataUser", data.userId);
        // redirect
        window.location = 'Home.html'
    });
    request.fail(function (jqXHR) {
        alert(jqXHR.responseJSON.msg)
    });
}


// Cookies
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";

    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}