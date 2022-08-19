// Configuration variables
var APIURL = "https://127.0.0.1:8001/api";
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
                    articleTdIcon.innerHTML = `<img src="/Images/iconDot2.jpg">`;
                    let articleTdTitle = document.createElement("td");
                    articleTdTitle.innerHTML = `<a href="#">${article.title}</a>`;
                    let articleTdPublishedAt = document.createElement("td");
                    articleTdPublishedAt.innerHTML = article.publishedAt;
                    articlesDatas.appendChild(articleTr);
                    articleTr.appendChild(articleTdIcon);
                    articleTr.appendChild(articleTdTitle);
                    articleTr.appendChild(articleTdPublishedAt);

                };
            });
        });
}
            
readArticles();

document.addEventListener("readystatechange", readArticles);

// WORD CLOUD
// WORD CLOUD
// WORD CLOUD







//PAGINATION PAR 20
//PAGINATION PAR 20
//PAGINATION PAR 20
// var page = document.querySelector("#articlesDatas")
// forEach { 


// boucle for avec un range

// if(publishedAt !== null) & !== undifined
