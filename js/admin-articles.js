// Configuration variables
var APIURL = "https://127.0.0.1:8000/api";
var articlesAPIURL = APIURL + "/articles";

// future DOM interactions
var articlesDatas = document.querySelector('#articlesDatas');
var articleTitleInput = document.querySelector('#title');
var articleBodyTextarea = document.querySelector('#body');
var articleCategory = document.querySelector('#category');
var articleWriter = document.querySelector('#writer');
var articlePublishedAt = document.querySelector('#publishedAt')
var infoZoneDiv = document.querySelector('#info');
var createButton = document.querySelector('#create');

// POST
// function to create a new element
var createArticle = function() {
    // if no name is provided, we do nothing
    if (articleTitleInput.value == "" || articleBodyTextarea.value == "") {
        return;
    }
    // we prepare the parameters
    var requestParameters = {
            "title": articleTitleInput.value,
            "body": articleBodyTextarea.value,
            "category": articleCategory.value,
            "tags": [],
            "writer": articleWriter.value,
            "publishedAt": articlePublishedAt.value
        }
        // we do the request
    fetch(categoriesAPIURL, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestParameters)
        })
        .then((response) => {
            if (response.status == 201) {
                window.location.href = "http://http://127.0.0.1:5500/page/articles.html";
                infoZoneDiv.textContent = "Création de l'article réussi";
                readCategories();
            } else {
                infoZoneDiv.textContent = "⚠ Une erreur est survenue lors de la création de l'article'";
            }
        })
}

// GET
// function to get all articles
var readArticle = function() {
    // first we empty the table
    if (articlesDatas) {
        while (articlesDatas.firstChild) {
            articlesDatas.removeChild(articlesDatas.firstChild);
        }
        // then we fetch data and fill the table
        fetch(articlesAPIURL, { method: "GET" })
            .then(function(response) { return response.json() })
            .then((responseJSON) => {
                if (responseJSON["hydra:member"]) {
                    responseJSON["hydra:member"].forEach(article => {
                        let articleTr = document.createElement("tr");
                        let articleTdId = document.createElement("td");
                        articleTdId.innerHTML = article.id;
                        let articleTdTitle = document.createElement("td");
                        articleTdTitle.innerHTML = article.title;
                        let articleTdPublishedAt = document.createElement("td");
                        // allow articles publishedAt without date for display the information "Non publié"
                        if (article.publishedAt != undefined) {
                            articleTdPublishedAt.innerHTML = formatDate(article.publishedAt);
                        } else {
                            articleTdPublishedAt.innerHTML = "Non publié";
                        }
                        let articleTdActions = document.createElement("td");
                        let linkEdit = document.createElement("a");
                        linkEdit.href = "http://127.0.0.1:5500/page/edit-article.html?edit=" + article.id;
                        linkEdit.setAttribute("class", "show");
                        linkEdit.innerHTML = "Voir/Modifier";
                        let linkDelete = document.createElement("a");
                        linkDelete.href = "http://127.0.0.1:5500/page/articles.html?delete=" + article.id;
                        linkDelete.setAttribute("class", "delete");
                        linkDelete.innerHTML = 'Supprimer';
                        linkDelete.addEventListener("click", deleteArticle);
                        articlesDatas.appendChild(articleTr);
                        articleTr.append(articleTdId, articleTdTitle, articleTdPublishedAt, articleTdActions);
                        articleTdActions.append(linkEdit, linkDelete);
                    })
                } else {
                    let articleTr = document.createElement("tr");
                    let articleTd = document.createElement("td");
                    articleTd.id = "noResult";
                    articleTd.colSpan = 4;
                    articleTd.innerHTML = "Aucun résultat";
                    articlesDatas.appendChild(articleTr);
                    articleTr.appendChild(articleTd);
                }
            })
    }
}

// format date from db for friendly sting
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = '' + d.getHours(),
        minutes = '' + d.getMinutes(),
        seconds = '' + d.getSeconds();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    if (hours.length < 2)
        hours = '0' + hours;
    if (minutes.length < 2)
        minutes = '0' + minutes;
    if (seconds.length < 2)
        seconds = '0' + seconds;

    return 'publié le ' + [day, month, year].join('-') + ' à ' + [hours, minutes, seconds].join(':');
}

// GET only one element
var showEditArticle = function() {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("edit");

    // then we fetch data
    fetch(articlesAPIURL + "/" + id, { method: "GET" })
        .then(function(response) { return response.json() })
        .then((responseJSON) => {
            articleTitleInput.value = responseJSON.title;
            articleBodyTextarea.value = responseJSON.body;
            articlePublishedAt.value = responseJSON.publishedAt;
        })
}

// PUT
var updateArticle = function() {
    // if no name is provided, we do nothing
    if (articleTitleInput.value == "" || articleBodyTextarea.value == "") {
        return;
    }
    // we prepare the parameters
    var requestParameters = {
        "title": articleTitleInput.value,
        "body": articleBodyTextarea.value,
        "category": articleCategory.value,
        "tags": [],
        "writer": articleWriter.value,
        "publishedAt": articlePublishedAt.value
    }
    fetch(articlesAPIURL + "/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestParameters)
        })
        .then((response) => {
            if (response.status == 200) {
                infoZoneDiv.textContent = "Modification de l'article' effectuée";
            } else {
                infoZoneDiv.textContent = "⚠ Une erreur est survenue lors de la modification de l'article'";
            }
        })
}

// DELETE
var deleteArticle = function(e) {
    // retrieve the url from target
    var url = new URL(e.target.href);
    // retrieve the parameter "delete" into url
    var id = url.searchParams.get("delete");
    e.preventDefault()

    fetch(articlesAPIURL + "/" + id, { method: "DELETE" })
        .then((response) => {
            if (response.status == 204) {
                infoZoneDiv.innerHTML = `<span style="font-size: 3rem; position: absolute; top: 40%; left: 50%; background-color: white; color: red; padding: 20px; border-radius: 10px;">Article supprimée</span>`;
                window.setTimeout(function() { location.reload() }, 1000)
            } else {
                infoZoneDiv.innerHTML = "⚠ Une erreur est survenue lors de la suppression de l'article";
            }
        })
}

if (createButton) {
    // Action for create article
    createButton.addEventListener("click", createArticle);
}

// When document DOM is loaded, we fetch the articles
document.addEventListener("DOMContentLoaded", readArticle);

// When document DOM is loaded, we fetch the article
document.addEventListener("DOMContentLoaded", showEditArticle);