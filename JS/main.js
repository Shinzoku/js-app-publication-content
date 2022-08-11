// Configuration variables
var APIURL = "https://127.0.0.1:8000/api";
var articlesAPIURL = APIURL + "/articles?pages=";
// "/articles?per_page=20";
// future DOM interactions
var articlesDatas = document.querySelector('#articlesDatas');
let articlesPage = 20;
// function to get all articles
var readArticles = function () {
    // first we empty the table
    while (articlesDatas.firstChild) {
        articlesDatas.removeChild(articlesDatas.firstChild);
    }
    // then we fetch data and fill the table
    fetch(articlesAPIURL, { method: "GET" })
        .then(function(response) { return response.json() })
        .then((responseJSON) => {
            responseJSON["hydra:member"].forEach((article) => {
                
                if (article.publishedAt !== undefined && article["id"] <= articlesPage) {

                    let articleTr = document.createElement("tr");
                    let articleTdIcon = document.createElement("td");
                    let articleTdTitle = document.createElement("td");
                    articleTdTitle.innerHTML = `<a href="#">${article.title}</a>`;
                    let articleTdPublishedAt = document.createElement("td");
                    articleTdPublishedAt.innerHTML = article.publishedAt;
                    articlesDatas.appendChild(articleTr);
                    articleTr.appendChild(articleTdIcon);
                    articleTr.appendChild(articleTdTitle);
                    articleTr.appendChild(articleTdPublishedAt);
                    articleTdIcon.innerHTML = `<img src="CSS/iconDot2.jpg">`;
                    

                };
            });
        });
}
            
readArticles();

document.addEventListener("readystatechange", readArticles);

// WORD CLOUD
// WORD CLOUD
// WORD CLOUD

var cloud = document.querySelector("#cloud");
var selectCat = document.querySelector("#selectCat");
var tableauCat = document.querySelector("#tableauCat");
var listeCat = document.querySelector("#listeCat")


// RECUPERATION DES CATEGORIES
var displayCat = function () {
    fetch("https://127.0.0.1:8000/api/categories/", { method: "GET" })
        .then(function(response) { return response.json() })
        .then((responseJSON) => {
            responseJSON["hydra:member"].forEach((category) => {
                var divCat = document.createElement('div');
                // var dropDownCat = document.createElement('');
                var trCat = document.createElement('tr');
                var tdCat = document.createElement('td');
                var liCat = document.createElement('li');
                tdCat.innerHTML = `<a href="#">${category.name}</a>`;
                selectCat.innerHTML = category.name;
                listeCat.innerHTML = category.name;
                divCat.innerHTML = category.name;
                trCat.append(tdCat);
                tableauCat.append(trCat);
                // selectCat.append();

                cloud.append(listeCat)
                console.log(listeCat);
            })
        })
}
displayCat();

document.addEventListener("readystatechange", displayCat);

//RECUPERATION DU NOMBRE D'ARTICLE PAR CATEGORIE
// var numberCat = function () =>
// Piste: catégorie.articles.id  pour mesurer la fréquence.




//PAGINATION PAR 20
//PAGINATION PAR 20
//PAGINATION PAR 20
// var page = document.querySelector("#articlesDatas")
// forEach { 


// boucle for avec un range

// if(publishedAt !== null) & !== undifined



// REQUETE POUR LE MENU CATEGORY



// REQUETE POUR LE MENU TAG


// CREATE FUNCTION

// CATEGORY

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

// ----- DELETE FUNCTION -----

// TAG

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



// ----- PATCH FUNCTION -----

// CATEGORY

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
