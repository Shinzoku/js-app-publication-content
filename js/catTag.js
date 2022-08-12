// REQUETE POUR LES MENUS CATEGORY

var cloud = document.querySelector("#cloud");
var selectCat = document.querySelector("#selectCat");
var tableauCat = document.querySelector("#tableauCat");
var listeCat = document.querySelector("#listeCat")

var displayCat = function () {
    fetch("https://127.0.0.1:8000/api/categories/", { method: "GET" })
        .then(function(response) { return response.json() })
        .then((responseJSON) => {
            responseJSON["hydra:member"].forEach((category) => {
                var divCat = document.createElement('div');
                var trCat = document.createElement('tr');
                var tdCat = document.createElement('td');
                var liCat = document.createElement('li');
                var optionCat = document.createElement('option');
                tdCat.innerHTML = `<a href="#">${category.name}</a>`;
                optionCat.innerHTML = category.name;
                liCat.innerHTML = category.name;
                divCat.innerHTML = category.name;
                trCat.append(tdCat);
                tableauCat.append(trCat);
                listeCat.append(liCat);
                selectCat.append(optionCat);
                cloud.append(divCat)
                console.log(listeCat);
            })
        })
}
// displayCat();

document.addEventListener("readystatechange", displayCat);



// REQUETE POUR LE MENU TAG

var cloud = document.querySelector("#cloud");
var selectCat = document.querySelector("#selectCat");
var tableauCat = document.querySelector("#tableauCat");
var listeCat = document.querySelector("#listeCat")

var displayCat = function () {
    fetch("https://127.0.0.1:8000/api/categories/", { method: "GET" })
        .then(function(response) { return response.json() })
        .then((responseJSON) => {
            responseJSON["hydra:member"].forEach((category) => {
                var divCat = document.createElement('div');
                var trCat = document.createElement('tr');
                var tdCat = document.createElement('td');
                var liCat = document.createElement('li');
                var optionCat = document.createElement('option');
                tdCat.innerHTML = `<a href="#">${category.name}</a>`;
                optionCat.innerHTML = category.name;
                liCat.innerHTML = category.name;
                divCat.innerHTML = category.name;
                trCat.append(tdCat);
                tableauCat.append(trCat);
                listeCat.append(liCat);
                selectCat.append(optionCat);
                cloud.append(divCat)
                console.log(listeCat);
            })
        })
}
// displayCat();

document.addEventListener("readystatechange", displayCat);


// CREATE FUNCTION

// CATEGORY
// CREATE CATEGORY

var createCategoryButton    = document.querySelector("#createCategoryButton");
var newCategoryName    = document.querySelector("#newCategoryName");

var createCategory = function(event) {
    var requestBody = {
        "name": newCategoryName.value
    };
    fetch("https://127.0.0.1:8000/api/categories/{}", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(function (response) {
        return response.json()
    })
    .then(function (responseJSON) {
        var resultDiv = document.createElement("div");
        if (responseJSON["@type"] == "hydra:Error") {
            console.log("Une erreur est survenue : " + responseJSON["hydra:description"])
            resultDiv.innerHTML = "Une erreur est survenue";
        }
        else {
            console.log(responseJSON)
            resultDiv.innerHTML = "Catégorie créée";
            document.body.appendChild(resultDiv);
        }
        
    })
}

createCategoryButton.addEventListener("click",createCategory);

// TAG
// CREATE TAG

var createTagButton    = document.querySelector("#createTagButton");
var createTagName    = document.querySelector("#createTagName");

var createTag = function(event) {
    var requestBody = {
        "name": createTagName.value
    };
    fetch("https://127.0.0.1:8000/api/tags/{}", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    }).then(function (response) {
        return response.json()
    })
    .then(function (responseJSON) {
        var resultDiv = document.createElement("div");
        if (responseJSON["@type"] == "hydra:Error") {
            console.log("Une erreur est survenue : " + responseJSON["hydra:description"])
            resultDiv.innerHTML = "Une erreur est survenue";
        }
        else {
            console.log(responseJSON)
            resultDiv.innerHTML = "Tag créé";
        }
        document.body.appendChild(resultDiv);
    })
}

createTagButton.addEventListener("click",createTag);


// ----- PATCH FUNCTION -----

// CATEGORY
//UPDATE CATEGORY

var updateCategoryButton    = document.querySelector("#updateCategoryButton");
var updateCategoryName    = document.querySelector("#updateCategoryName");

var patchCategory = function(event) {
    var requestBody = {
        "name": updateCategoryName.value
    };
    fetch("https://127.0.0.1:8000/api/categories/{}", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    }).then(function (response) {
        return response.json()
    })
    .then(function (responseJSON) {
        var resultDiv = document.createElement("div");
        if (responseJSON["@type"] == "hydra:Error") {
            console.log("Une erreur est survenue : " + responseJSON["hydra:description"])
            resultDiv.innerHTML = "Une erreur est survenue";
        }
        else {
            console.log(responseJSON)
            resultDiv.innerHTML = "Catégorie mise à jour";
        }
        document.body.appendChild(resultDiv);
    })
}

updateCategoryButton.addEventListener("click",patchCategory);


// TAG
// UPDATE TAG

var updateTagButton    = document.querySelector("#updateTagButton");
var updateTagName    = document.querySelector("#updateTagName");

var patchTag = function(event) {
    var requestBody = {
        "name": updateTagName.value
    };
    fetch("https://127.0.0.1:8000/api/tags/{}", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    }).then(function (response) {
        return response.json()
    })
    .then(function (responseJSON) {
        var resultDiv = document.createElement("div");
        if (responseJSON["@type"] == "hydra:Error") {
            console.log("Une erreur est survenue : " + responseJSON["hydra:description"])
            resultDiv.innerHTML = "Une erreur est survenue";
        }
        else {
            console.log(responseJSON)
            resultDiv.innerHTML = "Tag mise à jour";
        }
        document.body.appendChild(resultDiv);
    })
}

updateTagButton.addEventListener("click",patchTag);



// ----- DELETE FUNCTION -----

// TAG
// DELETE TAG


var deleteTagButton    = document.querySelector("#deleteTagButton");
var deleteTagName   = document.querySelector("#deleteTagName");

var deleteTag = function(event) {
    var requestBody = {
        "name": deleteTagName.value
    };
    fetch("https://127.0.0.1:8000/api/tags/{}", {
        method: "DELETE",
        body: JSON.stringify(requestBody)
    }).then(function (response) {
        return response.json()
    })
    .then(function (responseJSON) {
        var resultDiv = document.createElement("div");
        if (responseJSON["@type"] == "hydra:Error") {
            console.log("Une erreur est survenue : " + responseJSON["hydra:description"])
            resultDiv.innerHTML = "Une erreur est survenue";
        }
        else {
            console.log(responseJSON)
            resultDiv.innerHTML = "Tag supprimé";
        }
        document.body.appendChild(resultDiv);
    })
}

deleteTagButton.addEventListener("click",deleteTag);