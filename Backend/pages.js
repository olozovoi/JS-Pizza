/**
 * Created by chaika on 09.02.16.
 */
exports.mainPage = function(req, res) {
    res.render('mainPage', {
        pageTitle: 'Вибір Піци',
        orderButton: 'Замовити',
        preorder: true
    });
};

exports.orderPage = function(req, res) {
    res.render('order', {
        pageTitle: 'Оформлення замовлення',
        orderButton: 'Редагувати замовлення',
        preorder: false
    });
};