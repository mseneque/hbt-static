// used to sort by property, includes reverse sorting. 
// source: http://stackoverflow.com/questions/2466356/javascript-object-list-sorting-by-object-property
function byProperty(prop, reverse) {
  return function(a, b) {
    if (typeof a[prop] === 'number') {
      return (a[prop] - b[prop]);
    }

    if (a[prop] < b[prop]) {
      return reverse ? 1 : -1;
    }

    if (a[prop] > b[prop]) {
      return reverse ? -1 : 1;
    }

    return 0;
  };
};

// Is used to load the JSON Data.
// source: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
function loadJsonData(requestURL){
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  return request;
}