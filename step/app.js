var budgetController = (function() {})();

var UIController = (function() {})();

var controller = (function(budgetCtrl, UICtrl) {
    function addListItem() {
        var type = document.querySelector('.add__type').value;
        var description = document.querySelector('.add__description').value;
        var value = document.querySelector('.add__value').value;
        var html = '<div class="item clearfix" id="income-0"><div class="item__description">{{description}}</div><div class="right clearfix"><div class="item__value">{{value}}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        var rHtml = html.replace('{{description}}', description);
        rHtml = rHtml.replace('{{value}}', value);
        document.querySelector('.income__list').insertAdjacentHTML('beforeend', rHtml);
    };

    document.querySelector('.add__btn').addEventListener('click', addListItem);
})(budgetController, UIController)