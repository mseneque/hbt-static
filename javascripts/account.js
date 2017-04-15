function addMapLocation(lat, long) {
    /* This links the image source to a google map image of the provided latitude and longitude*/
    if (!(isNaN(lat) || isNaN(long))) {
        var source = 'http://maps.googleapis.com/maps/api/staticmap?center=' + lat + ',' + long + '&zoom=12&size=500x100&sensor=false&markers=51.455041,-0.9690884&scale=2';
        
        map = document.getElementById('map');
        map.setAttribute('src', source);
    }
}

function brewListAppend(brew) {
    /* This function populates the account page with a
     * list of the members brews that have been created and
     * stored in the users account.
     */

    function fakeBrewRequestListItem() {
         /* Add random fake member select to simulate a possible 
          * request for the members brew.
          * The actual accept request amount will need to be placed in to the 
          * backend so the amount can't be changed at will in the frontend.
          */
        
        // randomly select a fake member name from a list of member names
        var fakeMemberNames = ['Johny2Shoes', 'HipedyHapedy', 'QuokkaDude'];
        var index = Math.floor(Math.random() * fakeMemberNames.length);

        // random litres requested from litres available
        var fakeRequestedLitres = Math.floor(Math.random() * avail);
        
        // formulate the onclick function call to accept beer request.
        var onclickAcceptRequest = "onclick=acceptRequest('"+brewName+"','"+fakeMemberNames[index]+"','"+fakeRequestedLitres+"')";

        // returns the list item with the formulated button for accept and reject request
        return '<li>'+fakeMemberNames[index]+' has requested '+fakeRequestedLitres+'L &nbsp<button class="button" '+onclickAcceptRequest+'>Accept</button>&nbsp<button class="button">Reject</button></li>'
    }

    // get the brew list container element
    var brewListContainer = document.getElementById('brewList');
    console.log(brew);

    var brewName = brew["brewName"];
    var brewType = brew["brewType"]["name"];
    var brewLitres = brew["brewLitres"];
    var brewDate =  brew["brewDate"];

    // calculate beer available.
    var gone = 0;
    var avail = brewLitres - gone;

    // calculate the table color for stock availability
    // This function is being repeated, need to remove this and use the other function.
    var supplyStockMessage = "";
    if(avail <= 0) {
        var supplyStock = "outOfStock";
        supplyStockMessage = "Out of Stock";
    } else if(avail <= (brewLitres*0.2)) {
        var supplyStock = "limitedStock";
        supplyStockMessage = "Limited Stock";
    } else {
        var supplyStock = "inStock";
        supplyStockMessage = "In Stock";
    }
        
    /* The listed articles template */
    // Better use for older browsers
    var articleInnerHTML =  
        '<h3>'+brewName+'<small>&nbsp-&nbsp'+brewType+'</small></h3>' +
        '<table class='+supplyStock+' id='+brewName+'>' +
          '<tr>' +
            '<th>'+supplyStockMessage+'</th>' +
            '<th></th>' +
          '</tr>' +
          '<tr>' +
            '<th>avail.</th>' +
            '<th>total</th>' +
          '</tr>' +
          '<tr>' +
            '<td>'+avail+'</td>' +
            '<td>'+brewLitres+'</td>' +
          '</tr>' +
        '</table>' +
        '<p>' +
        '<ul>' +
          '<li>bottling: '+brewDate+'</li>' +
          fakeBrewRequestListItem() +
        '</ul>' +
        '</p>';

    // create elements needed
    var newArticle = document.createElement('article');
    newArticle.innerHTML = articleInnerHTML;

    brewListContainer.appendChild(newArticle);

}

function updateStockAvailTable(brewName, avail, brewLitres) {
    /* calculate the table color for stock availability */
    var supplyStockMessage = "";
    if(avail <= 0) {
        var supplyStock = "outOfStock";
        supplyStockMessage = "Out of Stock";
    } else if(avail <= (brewLitres*0.3)) {
        var supplyStock = "limitedStock";
        supplyStockMessage = "Limited Stock";
    } else {
        var supplyStock = "inStock";
        supplyStockMessage = "In Stock";
    }
    // update supplyStock class (used for CSS color red, yellow, green)
    var tableEl = document.getElementById(brewName);
    tableEl.setAttribute("class", supplyStock);
    
    // update supplyStockMessage
    document.getElementById(brewName).firstChild.firstChild.childNodes[0].innerHTML = supplyStockMessage;
    
}


function acceptRequest(brewName, member, amount) {
    /* This runs the when the account holder accepts a beer request from another
     * member. The amount is in litres. The amount will add to the members
     * beer out, for ratio matching for calculation. 
     */
    console.log("member: " + member);
    // Select the litres row in the selected brew card.
    var stockTableEl = document.getElementById(brewName).firstChild.lastChild;

    // update avail.
    console.log(stockTableEl.childNodes[0]);
    var avail = stockTableEl.childNodes[0].innerHTML - amount;
    stockTableEl.childNodes[0].innerHTML = avail;

    // total amount of brew in litres.
    console.log(stockTableEl.childNodes[1]);
    var brewLitres = stockTableEl.childNodes[1].innerHTML;

    // update the table to reflect the supply Stock available
    console.log(brewName, avail, brewLitres);
    updateStockAvailTable(brewName, avail, brewLitres);

    // update ratio Beer out
    var existBeerOut = document.getElementById('ratio').childNodes[1].innerHTML
    document.getElementById('ratio').childNodes[1].innerHTML = existBeerOut*1 + amount*1;

    alert("This request should now be removed/modified from the view after all updates have been made. Although, it should still stay as a permanent record on that brew Card. It should provide the oportunity to let the other trader leave a comment and a rating.")

}

function fillPageData() {
    /* This function is used to populate the page data. */
    // Retrieve Member User Data
    var Member = retrieveFromLocalStorage("Member"),
        username = Member["username"],
        lat = Member["location"]["lat"],
        long = Member["location"]["long"];

    // Display Username
    document.getElementById('memberName').innerHTML = username;

    // Display the star rating
    ratingElement = document.getElementById('rating');
    outputRating(3, ratingElement);

    // Cusomise the heading
    document.getElementById('heading').innerHTML = "List of all HomeBrews by " + username;

    // Display the Members map location
    addMapLocation(lat, long);

    // Populate the brew list (DOM scripting)
    var count = 0;
    for(prop in Member["brews"]) {
        var brew = Member["brews"][prop];
        brewListAppend(brew);
        count++;
    }
    if(count == 0) {
        document.getElementById('heading').innerHTML = "Welcome "+username+"!!<br/><span style='font-weight: normal;'>Start a brew, then click the <span style='color: green';>'Add New Brew'</span> button.</span>";
    }

    // Show the Snackbar message from the refering (previous) page
    var message = retrieveFromLocalStorage("snackbarMessage");
    console.log("snackbarMessage:" + message);
    showSnackbar(message);
}
