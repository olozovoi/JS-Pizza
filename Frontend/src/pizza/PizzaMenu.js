/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

let Filter = {
    meat: "meat",
    pineapple: "pineapple",
    mushroom: "mushroom",
    ocean: "ocean"
};

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піка відповідає фільтру
        //pizza_shown.push(pizza);

        //TODO: зробити фільтри
        if(pizza.content[filter]) {
            pizza_shown.push(pizza);
        }
    });
    console.log(pizza_shown);
    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    $('#all').click(function () {
        showPizzaList(Pizza_List);
    });

    $('#meat').click(function () {
        filterPizza(Filter.meat);
    });

    $('#pineapple').click(function () {
        filterPizza(Filter.pineapple);
    });

    $('#mushroom').click(function () {
        filterPizza(Filter.mushroom);
    });

    $('#ocean').click(function () {
        filterPizza(Filter.ocean);
    });

    //Показуємо усі піци
    showPizzaList(Pizza_List);
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;