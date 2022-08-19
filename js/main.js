// Configuration variables
var APIURL = "https://127.0.0.1:8000/api";
var articlesAPIURL = APIURL + "/articles?pages=";
// future DOM interactions
var articlesDatas = document.querySelector('#articlesDatas');
var arrayArticles = [];
let page = 0;
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
                
                if (article.publishedAt !== undefined && article["id"]) {

                    for (let i = 1; i <= 100; i++) {
                        let articleTr = document.createElement("tr");
                        let articleTdIcon = document.createElement("td");
                        let articleTdTitle = document.createElement("td");
                        articleTdTitle.innerHTML = `<a href="#">${article.title}</a>`;
                        let articleTdPublishedAt = document.createElement("td");
                        articleTdPublishedAt.innerHTML = article.publishedAt;
                        articleTdIcon.innerHTML = `<img src="CSS/iconDot2.jpg">`;
                        articlesDatas.appendChild(articleTr);
                        articleTr.appendChild(articleTdIcon);
                        articleTr.appendChild(articleTdTitle);
                        articleTr.appendChild(articleTdPublishedAt);

                        arrayArticles.push(articleDatas);
                    }
                    
                    for (let i = 0; i < page + 20; i++) {
                        articlesDatas.append(arrayArticles[i]);
                    }

                    let next = document.querySelector(".next");
                    next.addEventListener('click', ()=> {
                    page == arrayBooks.length - 20 ? (page = 0) : (page +=10);
                    booksTitle.innerHTML = "";

                    for (let i = page; i < page + 20; i++){
                        booksTitle.appendChild(arrayBooks[i]);
                    }
                    });

                    let previous = document.querySelector(".previous");
                    previous.addEventListener('click', ()=> {
                    page == 0 ? (page = arrayBooks.length - 20) : (page -=20);
                    booksTitle.innerHTML = "";

                    for (let i = page; i < page + 20; i++){
                        booksTitle.appendChild(arrayBooks[i]);
                    }
                    });

                };
            });
        });
}
            
readArticles();

document.addEventListener("readystatechange", readArticles);

//PAGINATION PAR 20
//PAGINATION PAR 20
//PAGINATION PAR 20
// var page = document.querySelector("#articlesDatas")
// forEach { 


// boucle for avec un range

// if(publishedAt !== null) & !== undifined
