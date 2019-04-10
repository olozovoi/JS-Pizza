/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage = require('../storage');
//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];
//HTML едемент куди будуть додаватися піци
var $cart = $("#cart-body");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    let updated = false;
    for (let index = 0; index < Cart.length; index++) {
        if (Cart[index].pizza === pizza && Cart[index].size === size) {
            Cart[index].quantity += 1;
            updated = true;
            break;
        }
    }

    if (!updated) {
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    }
    //Оновити вміст кошика на сторінці
    Storage.set("cart", Cart);
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
    for (let index = 0; index < Cart.length; index++) {
        if (Cart[index] === cart_item) {
            Cart.splice(index, 1);
            quantity -= 1;
            break;
        }
    }
    //Після видалення оновити відображення
    Storage.set("cart", Cart);
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...
    $(".clear-cart").click(function () {
        Cart = [];
        Storage.set("cart", Cart);
        updateCart();
    });
    var saved_cart = Storage.get("cart");
    if (saved_cart) {
        Cart = saved_cart;
    }
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function () {
            if (cart_item.quantity === 1) {
                removeFromCart(cart_item);
            } else cart_item.quantity -= 1;
            updateCart();
        });

        $node.find(".remove").click(function () {
            removeFromCart(cart_item);
            updateCart();
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);

    let sum = 0;
    for (let index = 0; index < Cart.length; index++) {
        sum += Cart[index].pizza[Cart[index].size].price * Cart[index].quantity;
    }

    $('.sum-number').text(sum.toString() + " грн.");
    $('.pizza-count').text(Cart.length);
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;