
// Retrieve Member object data from the browser's localStorage
function retrieveFromLocalStorage(objectName) {
    if (typeof(Storage) !== "undefined") {
        // Retrieve Member object
        var RetrievedObject = JSON.parse(localStorage.getItem(objectName));
        return RetrievedObject;
    } else {
        // Sorry! No Web Storage support..

    }
}

// Save Member data to local browser storage
function saveMemberToLocalStorage() {
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

function snackbarMessageLocalStorage(message) {
    // This will be used to store snackbar message to Local storage to be used 
    // in the subsequent page of the web application
    if (typeof(Storage) !== "undefined") {
        
        // Stringify the object before saving to browser
        var messageStr = JSON.stringify(message);
        console.log(messageStr);
        localStorage.setItem("snackbarMessage", messageStr);
        return true;

    } else {
        // Sorry! No Web Storage support..

    }
}   

function clearSnackbar() {
    localStorage.removeItem("snackbarMessage");
}

function isLoggedIn() {
    var Member = retrieveFromLocalStorage("Member");
    if (Member["username"] !== undefined) {
        return true;
    }
    else
        return false;
}