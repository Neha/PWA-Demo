
(function(){

      // Fake Data

    var app = {
        container : document.querySelector('.recipe-list'),
        recipeList : []
    };

    var  fakeData = [
        {
            "recipeName": "Initial Datapasta",
            "preprationTime": "40mins",
            "mainIngredient": "cheese"
        }, 
        {

            "recipeName": "noodles",
            "preprationTime": "30mins",
            "mainIngredient": "red thai sauce"
        }, 
        {

            "recipeName": "rajma chawal",
            "preprationTime": "20mins",
            "mainIngredient": "maa ka pyar"
        }, 
        {
            "recipeName": "milkshake",
            "preprationTime": "5mins",
            "mainIngredient": "milk"
        }
    ]
 


app.freshData = function(){
    $.ajax({
        url : "resources/data.json",
        method : "get",
        success : function(data){
            app.loadData(data);
        },
        error : function(data){
        }
    })
}


    app.loadData = function(data){
            $('.recipe-list').empty();
                if (data && data.length > 0) {
                    var html = "";
                    for (var i = 0; i < data.length; i++) {
                        html += '<li class="collection-item item"><div>'+ data[i].recipeName+ '<a href="#!" class="secondary-content"><span>' + data[i].mainIngredient + '</span><span class="time">' + data[i].preprationTime + '</span></a></div></li>';
                    };
                $('.recipe-list').append(html);
            }
    }


    $('.refresh').on('click',function(){
        app.freshData();
    });

    app.saveRecipe = function(recipeList){
        var recipeList = JSON.stringify(app.recipeList);
        localStorage.recipeList = recipeList;
    }; 

   app.recipeList = localStorage.recipeList;
  if (app.recipeList) {
        app.recipeList = JSON.parse(app.recipeList);
        app.recipeList.forEach(function(item) {
            app.freshData();
        });
  } else {
    app.loadData(fakeData); 
    app.recipeList = [
      {key: 'recipe', label:'recipeList'}
    ];

    app.saveRecipe();
  }      

  
})();

          

        