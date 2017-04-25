
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

// Generic function to save to local storage
// This will eventually replace the saveMemerToLocalStorage function.
// inputs: objectName     as string
//         objectData     as json object
function saveToLocalStorage(objectName, objectData) {
    // Check browsers local storage compatability
    if (isBrowserCompatible()) {
        // Retrieve stringified json data and parse it to an object.
        var objectStr = localStorage.getItem(objectName);
        var objectObj = JSON.parse(objectStr);

        // Merge data of the same properties to an existing object
        objectObj = Object.assign(objectObj, objectData);

        // Stringify the data to place it back in ot the local storage
        var objectStr = JSON.stringify(objectObj);
        localStorage.setItem(objectName, objectStr);
        return true;
    } 
    return false;  
}

function pushObjectToList(objectName, objectListName, objectData) {
    // Check browsers local storage compatability
    if (isBrowserCompatible()) {
        // retrieve stringified json data and parse it to an object.
        var objectStr = localStorage.getItem(objectName);
        var objectObj = JSON.parse(objectStr);

        // Push Data Object to a list whose parent is an object.
        objectObj[objectListName].push(objectData);

        // Stringify the data to place it back in ot the local storage
        var objectStr = JSON.stringify(objectObj);
        localStorage.setItem(objectName, objectStr);
        return true;
    }
    return false;
}

function snackbarMessage(message) {
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
        console.log('Sorry! No Web Storage support..');
    }
}   

function clearSnackbar() {
    localStorage.removeItem("snackbarMessage");
}

function isLoggedIn() {
    var Member = retrieveFromLocalStorage("Member");
    if ((!typeof(Member) === 'undefined') || Member["username"] !== undefined) {
        // Member is logged in
        return true;
    }
    else
        return false;
}

function isBrowserCompatible() {
    if (typeof(Storage) !== "undefined") {
        return true;
    } else {
        console.log("Your browser doesn't support local storage");
        return false;
    }
}
