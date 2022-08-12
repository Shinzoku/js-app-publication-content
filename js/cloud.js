//RECUPERATION DU NOMBRE D'ARTICLE PAR CATEGORIE
// var numberCat = function () =>
// Piste: catégorie.articles.id  pour mesurer la fréquence.

anychart.onDocumentReady(function() {
    var data = [
        {"x": "", "value": 10},
        {"x": "", "value": 10},
        {"x": "", "value": 10},
        {"x": "", "value": 10},
        {"x": "", "value": 10},
        {"x": "", "value": 10},
        {"x": "", "value": 10},
    ];

    var chart = anychart.tagCloud(data);

   // set a chart title
    chart.title('Catégories utilisées')
    // set an array of angles at which the words will be laid out
    chart.angles([0])
    // enable a color range
    chart.colorRange(true);
    // set the color range length
    chart.colorRange().length('80%');

    // display the word cloud chart
    chart.container("container");
    chart.draw();
})

//articles.length avec la recherche d'api sur les catégorie on fait articles.length 
// pour avoir la longueur et ensuite on stocke la valeur pour lui attribuer une grandeur selon sa taille