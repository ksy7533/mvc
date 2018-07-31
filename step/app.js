var budgetController = (function() {})();

var UIController = (function() {
    var totalBudget = 0;
    var totalIncome = 0;
    var totalExpense = 0;

    var updateTotalBudget = function() {
        var type = document.querySelector('.add__type').value;
        var value = parseInt(document.querySelector('.add__value').value);

        if (type === 'income') {
            totalIncome += value;
        } else if (type === 'expense') {
            totalExpense += value;
        }

        totalBudget = totalIncome - totalExpense;

        var incomeValue = document.querySelector('.budget__income--value');
        var expenseValue = document.querySelector('.budget__expenses--value');
        var budgetValue = document.querySelector('.budget__value');

        incomeValue.textContent = totalIncome;
        expenseValue.textContent = totalExpense;
        budgetValue.textContent = totalBudget;
    }

    var addListItem = function() {
        var type = document.querySelector('.add__type').value;
        var description = document.querySelector('.add__description').value;
        var value = document.querySelector('.add__value').value;

        if (value === '' || description === '') {
            return;
        }

        var html, rHtml, list;
        if (type === 'income') {
            html = '<div class="item clearfix" id="income-0"><div class="item__description">{{description}}</div><div class="right clearfix"><div class="item__value">{{value}}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            list = document.querySelector('.income__list');
        } else if (type === 'expense') {
            html = '<div class="item clearfix" id="expense-0"><div class="item__description">{{description}}</div><div class="right clearfix"><div class="item__value">{{value}}</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            list = document.querySelector('.expenses__list');
        }
        rHtml = html.replace('{{description}}', description);
        rHtml = rHtml.replace('{{value}}', value);
        list.insertAdjacentHTML('beforeend', rHtml);
    };

    return {
        updateTotalBudget: updateTotalBudget,
        addListItem: addListItem
    }

})();

var controller = (function(budgetCtrl, UICtrl) {
    function updateList() {
        UICtrl.addListItem();
        UICtrl.updateTotalBudget();
    }

    document.querySelector('.add__btn').addEventListener('click', updateList);
    document.addEventListener('keypress', function(event) {
        if (event.keyCode !== 13) {
            return;
        }
        updateList();
    });
})(budgetController, UIController)