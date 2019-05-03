/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    let API = require('./API');
    let storage = require('./storage');

    PizzaCart.initialiseCart();
    API.getPizzaList(function (error, data) {
        PizzaMenu.initialiseMenu(data);
    });

    $('[data-toggle="tooltip"]').tooltip();
    $('#order-form').submit(function () {
        order_info = {
            userInfo: $('#order-form').serializeArray(),
            pizza: storage.get("cart")
        };
        storage.set("cart", []);
        API.createOrder(order_info, function (error, data) {
            if (data) {
                alert("Ваше замовлення розміщено");
                window.location.replace('/');
            } else {
                alert("Щось пішло не так :(");
            }
        })
    });
});