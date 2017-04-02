// Navigates to page
function navigateToPage(page) {
    window.location.href = page;
}

// Retrieve Member object data from the browser's localStorage
function retrieveFromLocalStorage() {
    if (typeof(Storage) !== "undefined") {
        // Retrieve Member object
        var RetrievedObject = JSON.parse(localStorage.getItem("Member"));
        return RetrievedObject;
    } else {
        // Sorry! No Web Storage support..

    }
}

// Save Join data to local browser storage
function saveToLocalStorage() {
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        // Retreive previous recorded Member Data
        var MemberStr = localStorage.getItem("Member");
        var Member = JSON.parse(MemberStr);

        Member['brews'] = [];
        Member['username'] = document.getElementById("username").value;
        Member['email'] =  document.getElementById("email").value;
        Member['password'] =  document.getElementById("pass").value;

        // Stringify the object before saving to browser
        var MemberStr = JSON.stringify(Member);
        console.log(MemberStr);
        localStorage.setItem("Member", MemberStr);
        return true;

    } else {
        // Sorry! No Web Storage support..

    }
}

function isLoggedIn() {
    var Member = retrieveFromLocalStorage();
    if (Member["username"] !== undefined) {
        return true;
    }
    else
        return false;
}