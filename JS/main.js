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

// RECUPERATION DES CATEGORIES
var displayCat = function () {
    fetch("https://127.0.0.1:8000/api/categories", { method: "GET" })
        .then(function(response) { return response.json() })
        .then((responseJSON) => {
            responseJSON["hydra:member"].forEach((category) => {
                var listeCat = document.createElement('div');
                listeCat.innerHTML = category.name;
                console.log(listeCat);
            })
        })
}
displayCat();

//RECUPERATION DU NOMBRE D'ARTICLE PAR CATEGORIE
// var numberCat = function () =>

//PAGINATION PAR 20
//PAGINATION PAR 20
//PAGINATION PAR 20
// var page = document.querySelector("#articlesDatas")
// forEach { 


// boucle for avec un range

// if(publishedAt !== null) & !== undifined

// Piste: catégorie.id  pour mesurer la fréquence.

// CREATE FUNCTION

// CATEGORY

var createCategoryButton    = document.querySelector("#createCategoryButton");
var categoryName    = document.querySelector("#categoryName");

var createCategory = function(event) {
    var requestBody = {
        "name": categoryName.value
    };
    fetch("https://127.0.0.1:8000/api/categories", {
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
            resultDiv.innerHTML = "Catégorie créée";
        }
        document.body.appendChild(resultDiv);
    })
}

createCategoryButton.addEventListener("click",createCategory);

// TAG

var createTagButton    = document.querySelector("#createTagButton");
var tagName    = document.querySelector("#tagName");

var createTag = function(event) {
    var requestBody = {
        "name": tagName.value
    };
    fetch("https://127.0.0.1:8000/api/tags", {
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
var tagId   = document.querySelector("#tagId");

var deleteArticle = function(event) {
    var requestBody = {
        "id": tagId.value
    };
    fetch("https://127.0.0.1:8000/api/tags", {
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

var patchCategoryButton    = document.querySelector("#patchCategoryButton");
var categoryName    = document.querySelector("#categoryUpdate");

var patchCategory = function(event) {
    var requestBody = {
        "name": categoryName.value
    };
    fetch("https://127.0.0.1:8000/api/categories", {
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

patchCategoryButton.addEventListener("click",patchCategory);


// TAG

var patchTagButton    = document.querySelector("#patchTagButton");
var tagName    = document.querySelector("#tagUpdate");

var patchTag = function(event) {
    var requestBody = {
        "name": tagName.value
    };
    fetch("https://127.0.0.1:8000/api/tags", {
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

patchTagButton.addEventListener("click",patchTag);
