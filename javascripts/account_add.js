function outputRating(rating, node) {
    for(var i = 1; i <= rating; i++) {
        var span = document.createElement('span');
        var attribute = document.createAttribute("class");
        attribute.value = "filledStar";
        span.setAttributeNode(attribute);
        node.appendChild(span);
        console.log(i);
    }
    for(var i = rating; i < 5; i++) {
        var span = document.createElement('span');
        var attribute = document.createAttribute("class");
        attribute.value = "clearStar";
        span.setAttributeNode(attribute);
        node.appendChild(span);
        console.log(i);
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
        attr = document.createAttribute('src');
        attr.value = source;
        map.setAttributeNode(attr);
    }
}

function fillPageData() {
    var Member = retrieveFromLocalStorage(),
        username = Member["username"],
        lat = Member["location"]["lat"],
        long = Member["location"]["long"];

    console.log("username: " + username);

    document.getElementById('memberName').innerHTML = username;

    // Display the star rating
    ratingElement = document.getElementById('rating');
    outputRating(3, ratingElement);


    // document.getElementById('heading').innerHTML = "List of all HomeBrews by " + username;

    // addMapLocation(lat, long);

}
