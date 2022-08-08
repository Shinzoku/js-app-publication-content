// Configuration variables
var APIURL = "https://127.0.0.1:8000/api";
var articlesAPIURL = APIURL + "/articles";

// future DOM interactions
var articlesDatas = document.querySelector('#articlesDatas');
var articleTitleInput = document.querySelector('#title');
var articleBodyTextarea = document.querySelector('#body');
var articleCategory = document.querySelector('category');
var articleWriter = document.querySelector('writer');
var infoZoneDiv = document.querySelector('info');

// // Visible button on page startup
// var createButton = document.createElement("button");
// createButton.innerText = "Créer"
// mainSection.appendChild(createButton);
// // Hidden buttons on page startup
// var updateButton = document.createElement("button");
// updateButton.innerText = "Mettre à jour";
// var deleteButton = document.createElement("button");
// deleteButton.innerText = "Supprimer";

// // function when a article is selected. Not related to the API
// var selectArticle = function() {
//     // rename H1
//     pageTitleH1.innerText = "Modification d’une catégorie";
//     // first of all, we fill the input field with the name of the category
//     categoryNameInput.value = document.querySelector("#option-" + categorySelect.value).innerHTML;
//     // update and delete button are shown
//     mainSection.appendChild(updateButton)
//     mainSection.appendChild(deleteButton);
//     // create button is removed
//     mainSection.removeChild(createButton)
// }

// // function to reset form
// var resetForm = function() {
//     // Empty the input field
//     categoryNameInput.value = "";
//     // remove update and delete button
//     mainSection.removeChild(updateButton);
//     mainSection.removeChild(deleteButton);
//     // add create button
//     mainSection.appendChild(createButton);
//     // reset title
//     pageTitleH1.innerText = "Création d’un article";
// }

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
            "writer": articleWriter.value
        }
        // we do the request
    fetch(categoriesAPIURL, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestParameters)
        })
        .then((response) => {
            if (response.status == 201) {
                window.location.href = "http://http://127.0.0.1:5500/page/articles";
                infoZoneDiv.textContent = "Création de l'article réussi";
                readCategories();
            } else {
                infoZoneDiv.textContent = "⚠ Une erreur est survenue lors de la création de l'article'";
            }
        })
}


// function to get all articles
var readArticles = function() {
    // first we empty the table
    if (articlesDatas) {
        while (articlesDatas.firstChild) {
            articlesDatas.removeChild(articlesDatas.firstChild);
        }
        // then we fetch data and fill the table
        fetch(articlesAPIURL, { method: "GET" })
            .then(function(response) { return response.json() })
            .then((responseJSON) => {
                responseJSON["hydra:member"].forEach(article => {
                    if (article.publishedAt != undefined) {
                        let articleTr = document.createElement("tr");
                        let articleTdId = document.createElement("td");
                        articleTdId.innerHTML = article.id;
                        let articleTdTitle = document.createElement("td");
                        articleTdTitle.innerHTML = `<a href="#">${article.title}</a>`;
                        let articleTdPublishedAt = document.createElement("td");
                        articleTdPublishedAt.innerHTML = formatDate(article.publishedAt);
                        let articleTdActions = document.createElement("td");
                        let articleTdBtnShow = document.createElement("button");
                        articleTdBtnShow.id = "show";
                        articleTdBtnShow.innerHTML = 'Voir';
                        let articleTdBtnDelete = document.createElement("button");
                        articleTdBtnDelete.id = "delete";
                        articleTdBtnDelete.innerHTML = 'Supprimer';
                        articlesDatas.appendChild(articleTr);
                        articleTr.appendChild(articleTdId);
                        articleTr.appendChild(articleTdTitle);
                        articleTr.appendChild(articleTdPublishedAt);
                        articleTr.appendChild(articleTdActions);
                        articleTdActions.appendChild(articleTdBtnShow);
                        articleTdActions.appendChild(articleTdBtnDelete);
                    }
                });
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

// var updateCategory = function() {
//     // if no name is provided, we do nothing
//     if (categoryNameInput.value == "") {
//         return;
//     }
//     // we prepare the parameters
//     var requestParameters = {
//         "name": categoryNameInput.value
//     }
//     fetch(categoriesAPIURL + "/" + categorySelect.value, {
//             method: "PUT",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(requestParameters)
//         })
//         .then((response) => {
//             if (response.status == 200) {
//                 infoZoneDiv.textContent = "Modification de la catégorie effectuée";
//                 readCategories();
//             } else {
//                 infoZoneDiv.textContent = "⚠ Une erreur est survenue lors de la modification de la catégorie";
//             }
//         })
//     resetForm();
// }

// var deleteCategory = function() {
//     // it’s quite straigh forward
//     fetch(categoriesAPIURL + "/" + categorySelect.value, {
//             method: "DELETE",
//         }).then((response) => {
//             if (response.status == 204) {
//                 infoZoneDiv.textContent = "Catégorie supprimée";
//             } else {
//                 infoZoneDiv.textContent = "⚠ Une erreur est survenue lors de la création de la catégorie";
//             }
//             // we reload categories
//             readCategories();
//         })
//         // we reset buttons and input form’s content
//     resetForm();
// }

// // Action for create button
// createButton.addEventListener("click", createCategory);
// // Action for update button
// updateButton.addEventListener("click", updateCategory);
// // Action for delete button
// deleteButton.addEventListener("click", deleteCategory);
// // When we select a category, some things happen 
// categorySelect.addEventListener("change", selectCategory);
// When document DOM is loaded, we fetch the categories
document.addEventListener("DOMContentLoaded", readArticles);