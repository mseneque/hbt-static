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

function fillPageData() {
    var Member = retrieveFromLocalStorage();
    console.log("username: " + Member["username"]);

    document.getElementById('memberName').innerHTML = Member["username"];

    ratingElement = document.getElementById('rating');
    outputRating(3, ratingElement);

} 
