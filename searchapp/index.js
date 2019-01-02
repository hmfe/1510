
/**
 * search
 * 
 * The main search function that gets the value user wrote 
 * Validates that the input is not empty
 * populates the #list ul 
 * Does an HTTP request to LastFM REST API to get 5 artists that matches the input text
 * Validates that response is not empty
 * Catches if errors occur
 * **/
function search() {
    var searchInput = document.getElementById("search").value;
    var API_KEY = "894887d69268a731ff49f0e99461c4f4";
    //  API_SECRET = "6d80d21b72b3cc3f2f1ed19659301c6e" just a reminder
    var ulVar = document.getElementById("returnedSearch");
    while (ulVar.firstChild) {
        ulVar.removeChild(ulVar.firstChild);
    }

    var xhttp = new XMLHttpRequest();

    if (searchInput !== "") {
        populateLastSearch(searchInput);
        /* If the request returns 200 */
        xhttp.onreadystatechange = function () {
            var ulVar = document.getElementById("returnedSearch");

            if (this.readyState == 4 && this.status == 200) {
                var parsedJSON = JSON.parse(this.responseText);
                var artists = parsedJSON.results.artistmatches.artist;
                if (artists.length > 0) {
                    artists.forEach(function (element) {
                        var newEl = document.createElement("li");
                        newEl.textContent = element.name;
                        ulVar.appendChild(newEl);
                    });
                } else {
                    var newEl = document.createElement("li");
                    newEl.textContent = 'Nothing found with this name... Try another';
                    ulVar.appendChild(newEl);
                }


            }
        };

        /* If the request fails */
        xhttp.onerror = function (e) {
            console.log('Error in request:', xhttp.statusText);
            alert("The request returned an error. Check the console for more info");
        };

        xhttp.open("GET", "http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" + searchInput + "&api_key=" + API_KEY + "&limit=5&format=json", true);
        xhttp.send();
    }
}

/** 
 * Show
 * 
 * Shows the search result when the user clicks on the search input. 
 * 
 * **/
function show() {
    var showElement = document.getElementById("search-result");
    showElement.style.display = 'block';
}

/**
 * Hide
 * 
 * Hides the search result when the user clicks outside the search input.
 * **/
function hide() {
    var showElement = document.getElementById("search-result");
    showElement.style.display = 'none';
}


/** 
 * populateLastSearch
 * txt: string
 * 
 * Get's input from the user when he/she searches for something. Creates a element with the textnode, timestamp and a delete button (X)
 * 
 * **/
function populateLastSearch(txt) {
    var parent = document.getElementById("list");
    var li, itemname, spanone, itemdate, spantwo, spanthree, d, dateFormat;
    li = document.createElement("li");

    itemname = document.createElement("div");
    itemname.id = "itemname";

    spanone = document.createElement("span");
    spanone.textContent = txt;
    itemname.appendChild(spanone);

    itemdate = document.createElement("div");
    itemdate.id = "itemdate";

    d = new Date();


    dateFormat = [d.getMonth() + 1,
    d.getDate(),
    d.getFullYear()].join('/') + ' ' +
        [d.getHours(),
        d.getMinutes(),
        d.getSeconds()].join(':');


    spantwo = document.createElement("span");
    spantwo.textContent = dateFormat;
    itemdate.appendChild(spantwo);

    spanthree = document.createElement("span");
    spanthree.setAttribute("onclick", "deleteRow(this)");
    spanthree.textContent = "X";
    itemdate.appendChild(spanthree);

    li.appendChild(itemname);
    li.appendChild(itemdate);


    parent.appendChild(li);
}

/**
 * deleteRow
 * e: This element
 * Removes the current row by removing the parent,parent of the currenty element. (The container)
 * 
 * **/
function deleteRow(e) {
    e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);
}

/**
 * clearSearch
 * 
 * Removes the list of li elements inside the #list ul. These li elements are created by the populateLastSearch function.
 * **/
function clearSearch() {
    var list = document.getElementById("list");

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}