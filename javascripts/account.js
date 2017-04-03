function outputRating(rating, node) {
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

function calculateRatio(beerIn, beerOut) {
    if (!(isNaN(beerIn) || isNaN(beerOut))) {
        if (beerOut > 0) {
            var ratio = beerOut / beerIn;
        } else {
            var ratio = Infinity;
        }      
        return ratio;
    }
}

function addMapLocation(lat, long) {
    // This links the image source to a google map image of the provided latitude and longitude
    if (!(isNaN(lat) || isNaN(long))) {
        var source = 'http://maps.googleapis.com/maps/api/staticmap?center=' + lat + ',' + long + '&zoom=12&size=500x100&sensor=false&markers=51.455041,-0.9690884&scale=2';
        
        map = document.getElementById('map');
        map.setAttribute('src', source);
    }
}

function fillPageData() {
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

    // Execute any Javascripts from the refering (previous) page
    var message = retrieveFromLocalStorage("snackbarMessage");
    console.log("message:" + message);
    showSnackbar(message);
}
