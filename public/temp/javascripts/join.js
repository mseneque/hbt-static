function usernameValidator() {
    /* Username Validator */
    /* Validates the username directly from reading the form input */
    var username = document.getElementById('username').value;
    if(username == '') {
        document.getElementById('hint').innerHTML = "Please enter a username";
        return false;
    }
    var usernameIsValid = /^[a-zA-Z0-9]{4,}$/.test(username);
    if(usernameIsValid == false) {
        document.getElementById('hint').innerHTML = "Username must be alpha-numeric, with at least 4 characters.";
        return false;
    } 
    return true;
}

function emailValidator() {
    /* Email Validator
     * Validates the email directly from reading the form input 
     */
    var email = document.getElementById('email').value;
    var emailIsValid = /[^@]+@[^@]+\.[a-zA-Z]{2,6}/.test(email);
    if(emailIsValid == false) {
        document.getElementById('hint').innerHTML = "Please enter an Email Address";
        return false;
    }
    return true;
}

function passwordComplexity() {
    /* Password Complexity Validator 
     * This 
     */

    var password = document.getElementById("pass").value;
    if(password == '') {
        document.getElementById('hint').innerHTML = "Please enter a complex password that is 8 characters or greater.";
        return false;
    }
    if (password.length < 8) {
        document.getElementById('hint').innerHTML = "Password length must be 8 characters or greater";
        return false;
    }
    var hasUpperCase = /[A-Z]/.test(password);
    var hasLowerCase = /[a-z]/.test(password);
    var hasNumbers = /\d/.test(password);
    var hasSymbols = /\W/.test(password);
    if (hasUpperCase + hasLowerCase + hasNumbers + hasSymbols < 3) {
        document.getElementById('hint').innerHTML = "Make the password more complex. Add Upper and or lower case, with numbers and or symbols";
        return false;
    }
    return true;
}

// Check Matching Passwords
function passwordMatch() { 
    var pass1 = document.getElementById("pass").value;
    var pass2 = document.getElementById("pass2").value;
    if (pass1 != pass2) {
        document.getElementById('hint').innerHTML = "The two passwords you entered are not the same. Please re-enter same password.";
        return false;
    }
    return true;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(savePosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    return true;
}

// Need to fix this function, incorporate error checking for 
// browser compatability, mabe separate accross the userData.js file
function savePosition(position) {
    var Member = {};
    Member['location'] = {};
    Member['location']['lat'] = position.coords.latitude;
    Member['location']['long'] = position.coords.longitude;
    var MemberStr = JSON.stringify(Member);
    localStorage.setItem("Member", MemberStr);
}

// Save Member data to local browser storage
function saveMemberToLocalStorage() {
    var Member = {};
    Member['brews'] = [];
    Member['username'] = document.getElementById("username").value;
    Member['email'] =  document.getElementById("email").value;
    Member['password'] =  document.getElementById("pass").value;
    // Merges this Member object with the member object already 
    // in the browsers local storage.
    saveToLocalStorage("Member", Member);
    return true;
}

/*  MAIN FUNCTION  */

function checkform() {
    
    // Clear existing errors
    document.getElementById('hint').innerHTML = "";

    // Username Validator
    if(usernameValidator() == false) {
        return false;
    } 

    // Email Validator
    if(emailValidator() == false) {
        return false;
    } 

    // Password Complexity Validator
    if(passwordComplexity() == false) {
        return false;
    }

   // Check Matching Passwords
    if(passwordMatch() == false) {
        return false;
    }    

   // If all validators pass
   document.getElementById('success').innerHTML = "Data OK - Submitting Form";
   return true;
   
}