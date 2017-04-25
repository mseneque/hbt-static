function setBrewDateMinMax(minDays, maxDays) {
    /* Sets the attributes for the brew date min and max days relative to today.
     * source: http://stackoverflow.com/questions/6963311/add-days-to-a-date-object
     */
    if (!(isNaN(minDays) || isNaN(maxDays))) {
        
        function makeDateString(date) {
            /* Returns a date string
             */
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

        // New class instances of min and max date.
        var minDate = new Date(),
            maxDate = new Date();

        // Calculate min and max date from function arguments ('minDays' and  'maxDays')
        var minDate = new Date(minDate.setTime( minDate.getTime() - minDays * 86400000 )),
            maxDate = new Date(maxDate.setTime( maxDate.getTime() + maxDays * 86400000 ));

        // Set the date min and max attributes to the calculated dates
        var brewDate = document.getElementById('brewDate');
        var minDateStr = makeDateString(minDate),
            maxDateStr = makeDateString(maxDate);

        // Attach the new attributes and values to the brewdate input node.
        brewDate.setAttribute('min', minDateStr);
        brewDate.setAttribute('max', maxDateStr);
    }
}

function fillPageData() {
    /* This fills the page data for the logged in member. */
    
    // Retrieve data from the local storage.
    var Member = retrieveFromLocalStorage("Member"),
        username = Member["username"],
        lat = Member["location"]["lat"],
        long = Member["location"]["long"];

    // Display the member name
    document.getElementById('memberName').innerHTML = username;

    // Display the star rating
    ratingElement = document.getElementById('rating');
    outputRating(3, ratingElement);

    // Set the min and max dates available for selection
    setBrewDateMinMax(365, 183);

    return true;
}

function brewNameValidator() {
    var brewName = document.getElementById('brewName').value;
    var isValid = /^[a-zA-Z0-9]{2,}$/.test(brewName);
    console.log(brewName, isValid);
    if(!isValid) {
        document.getElementById('hint').innerHTML = "Brew name must be 2 or more alpha-numerical characters, no spaces";
        return false;
    }
    clearHint();
    return true;
}   

function brewTypeValidator() {
    // Grabs the whole select element with all of the children (option) included.
    var selectElement = document.getElementById('brewTypes');    
    console.log(selectElement);
    var selectedBrewType = selectElement[selectElement.selectedIndex].value;
    console.log(selectedBrewType);
    // Checks to see if the selected brew type value is the same as the 
    // firstchild nextsibling (1st elementNode type) "pleaseSelect".
    // The first child is a text node, and the next sibling is an element node.
    if(selectedBrewType == selectElement.firstChild.nextSibling.value) {
        document.getElementById('hint').innerHTML = "Please Select a brew type from the list";
        return false;
    }
    clearHint();
    return true;
}

function productionValidator() {
    var brewLitres = document.getElementById('brewLitres').value;
    if(isNaN(brewLitres) || brewLitres <= 0) {
        document.getElementById('hint').innerHTML = "Why so negative? Make the production positive!" 
        return false;        
    }
    if(brewLitres > 60) {
        document.getElementById('hint').innerHTML = "Whoa!! Please keep the batches to 60L or less." 
        return false;        
    }
    clearHint();
    return true;
    
}

function dateValidator() {
    var brewDate = document.getElementById('brewDate').value;
    if(brewDate == '') {
        document.getElementById('hint').innerHTML = "Please enter a date for bottling.";
        return false;
    }
    clearHint();
    return true;
}

function saveMemberBrewToLocalStorage() {
    /* Saves the newly created brew to the local storage */

    var brew = {};

    // saves the bre
    brew['brewName'] = document.getElementById('brewName').value;

    brewTypes = document.getElementById('brewTypes');

    for(var i=0; i < brewTypes.childNodes.length; i++) {
        var brewType = brewTypes.childNodes[i];
        console.log(brewType.value);
        // nodeType of 1 is element, brewTypes.value is created from selected value in chrome browser (CAREFULL CROSS BROWSER!!)
        if(brewType.nodeType == 1 && brewType.value == brewTypes.value) {
            brew['brewType'] = {"id": brewTypes.value, "name": brewType.innerHTML};
        }
    }

    brew['brewLitres'] = document.getElementById('brewLitres').value;
    brew['brewDate'] = document.getElementById('brewDate').value;

    pushObjectToList("Member", "brews", brew);
    return true;
}

function checkForm() {
     // Clear existing errors
    clearHint();

    // Brew Name Validator
    if(brewNameValidator() == false) {
        return false;
    }

    // Brew Type Validator
    if(brewTypeValidator() == false) {
        return false;
    }

    // Production Litres Validator
    if(productionValidator() == false) {
        return false;
    }

    // Date Input Validator
    if(dateValidator() == false) {
        return false;
    }

    // If all validators pass
    document.getElementById('success').innerHTML = "Data OK - Submitting Form";
    return true;
}
