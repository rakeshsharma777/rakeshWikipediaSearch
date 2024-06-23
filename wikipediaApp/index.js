let searchInput = document.getElementById("searchInput");

let searchResultDiv = document.getElementById("searchResults");

function createAndAppend(result) {
    let {
        link,
        title,
        description
    } = result
    //creation ResultItem
    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");


    //creating anchorElement
    let headingEl = document.createElement("a");
    headingEl.classList.add("result-title");
    headingEl.href = link;
    headingEl.textContent = title;
    headingEl.target = "_blank";
    resultItem.appendChild(headingEl);

    //creating brakeEl
    let brkEl = document.createElement("br");
    resultItem.appendChild(brkEl);

    //creating paragraph
    let paraLink = document.createElement("a");
    paraLink.classList.add("result-url");
    paraLink.href = link;
    paraLink.target = "_blank"
    paraLink.textContent = link;
    resultItem.appendChild(paraLink)

    let lineBreakEl = document.createElement("br");
    resultItem.appendChild(lineBreakEl)

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link_description");
    descriptionEl.textContent = description;
    resultItem.appendChild(descriptionEl);

    searchResultDiv.appendChild(resultItem)
}

function displayResult(searchResults) {
    for (let result of searchResults) {
        createAndAppend(result);
    }
}


function getResult(event) {
    if (event.key === "Enter") {
        searchResultDiv.textContent = ""

        let searchResult = searchInput.value;



        url = "https://apis.ccbp.in/wiki-search?search=" + searchResult;
        let options = {
            method: "GET"
        }

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResult(search_results)
            })
    }
}

searchInput.addEventListener("keydown", getResult)