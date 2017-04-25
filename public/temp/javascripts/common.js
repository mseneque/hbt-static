// Is used to load the JSON Data.
// source: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
function loadJsonData(requestURL){
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  return request;
}

function outputRating(rating, node) {
    /* This function takes a rating integer between 1 and 5 and 
     * a node where ypu want to append the star rating. 
     * Example,: for a three star rating, this function will append 
     * five child spans, of which three have the class 'filledStar'
     * and two have the class 'clearStar'.
     * CSS is required to style the two classes. 
     */
    for(var i = 1; i <= rating; i++) {
        var span = document.createElement('span');
        span.setAttribute("class", "filledStar");
        node.appendChild(span);
    }
    for(var i = rating; i < 5; i++) {
        var span = document.createElement('span');
        span.setAttribute("class", "clearStar");
        node.appendChild(span);
    }
}

function showSnackbar(message) {
  /* The snackbar will accept an input message string and use it
   * to show a message on the next page that has an element with
   * the id="snackbar". The class is temporarily set to show, where
   * this is handled by css.
   */
  if(message) {
    var snackbar = document.getElementById("snackbar")
    snackbar.innerHTML = message;
    snackbar.className = "show";
    // Set the snackbar class name to revert back to empty after 3 seconds
    setTimeout(function(){ 
      snackbar.className = snackbar.className.replace("show", ""); 
    }, 3000);
    clearSnackbar();
    return true;
  }
}

function canTrade(beerIn, beerOut) {
    /* This simply calculates the ratio of BeerOut divided by BeerIn,
     * and determines if the user can trade or not. A true value is returned
     * if the user can trade, otherwise false is returned.
     */
    // Proceeds if both inputs are numbers
    if (!(isNaN(beerIn) || isNaN(beerOut))) {
        // calc ratio
        if (beerOut > 0) {
            var ratio = beerOut / beerIn;
        } else {
            // Beer in is 0, therefore user can trade
            var ratio = Infinity;
            return true;
        }

        // case statement
        // ratio < 0.5 && beerIn-beerOut < 30 #canTrade
        return true;
    }
}

function clearHint() { 
    /* Clears the hint display */
    document.getElementById('hint').innerHTML = "";
}

function navigateToPage(page) {
    /* Navigates to page */
    window.location.href = page;
}

function goBack() {
    /* Back button on the browser */
    window.history.back();
}

// function addKeyupListeners(inputs) {
//      Eventlisteners for keyup events
//      * Used for the form validation checks. Frequent on keyups
//      * before submiting the page.
//      * The input is a list of inputs
     
//     for(prop in inputs) {
//       document.getElementById(prop).addEventListener("keyup", inputs[prop]);
//     }
//     return true;
// }

function insertFooter() {
  /* This adds the footer with the date */
  
  // get the document last modified date
  var dLast = document.lastModified;
  
  var newFooterEl = document.createElement('footer');
  newFooterEl.setAttribute("class", "footer");
  newFooterEl.innerHTML = '<span>Copyright Matthew Seneque <span style="float: right;">Student no: 10265601</span></span><br/><span>Time now: '+Date()+'</span><br/><span>Last modified: '+dLast+'</span>';

  // console.log(document.getElementsByTagName('body'));
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(newFooterEl);
  console.log(body[0]);

  // var newTextNode = document.createTextNode("late modified:" + x);
  // newFooterEl.appendChild(newTextNode);

}