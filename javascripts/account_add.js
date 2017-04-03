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

function setBrewDateMinMax(minDays, maxDays) {
    // Sets the attributes for the brewd date min and max days relative to today
    // http://stackoverflow.com/questions/6963311/add-days-to-a-date-object
    if (!(isNaN(minDays) || isNaN(maxDays))) {
        
        function makeDateString(date) {
            var dd = date.getDate();
            var mm = date.getMonth()+1; //January is 0!
            var yyyy = date.getFullYear();

            if(dd < 10) {
                dd = '0' + dd;
            } 

            if(mm < 10) {
                mm = '0' + mm;
            } 

            var dateString = yyyy + '-' + mm + '-' + dd;

            return dateString
        }

        var minDate = new Date();
        var maxDate = new Date();

        var minDate = new Date(minDate.setTime( minDate.getTime() - minDays * 86400000 ));
        var maxDate = new Date(maxDate.setTime( maxDate.getTime() + maxDays * 86400000 ));

        // Set the date min and max attributes to the calculated dates
        var brewDate = document.getElementById('brewDate');

        // Attach the new attributes and values to the brewdate input node.
        brewDate.setAttribute('min', minDate);
        brewDate.setAttribute('max', maxDate);
        
    }
}

function fillPageData() {
    var Member = retrieveFromLocalStorage("Member"),
        username = Member["username"],
        lat = Member["location"]["lat"],
        long = Member["location"]["long"];

    console.log("username: " + username);

    document.getElementById('memberName').innerHTML = username;

    // Display the star rating
    ratingElement = document.getElementById('rating');
    outputRating(3, ratingElement);

    // Set the min and max dates available for selection
    setBrewDateMinMax(365, 183);

}

function checkForm() {
     // Clear existing errors
    document.getElementById('hint').innerHTML = "";

    // Brew Name Validator


    // Brew Type Validator


    // Production Litres Validator


    // Date Input Validator


    // If all validators pass
    document.getElementById('success').innerHTML = "Data OK - Submitting Form";
    return true;
}