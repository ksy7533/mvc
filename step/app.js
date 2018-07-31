var budgetController = (function() {})();

var UIController = (function() {
    var totalBudget = 0;
    var totalIncome = 0;
    var totalExpense = 0;

    var DOMStrings = {
        ADD_TYPE: '.add__type',
        ADD_DESCRIPTION: '.add__description',
        ADD_VALUE: '.add__value',
        ADD_BTN: '.add__btn',
        BUDGET_INCOME_VALUE: '.budget__income--value',
        BUDGET_EXPENSES_VALUE: '.budget__expenses--value',
        BUDGET_VALUE: '.budget__value',
        INCOME_LIST: '.income__list',
        EXPENSE_LIST: '.expenses__list'
    }

    var updateTotalBudget = function() {
        var type = document.querySelector(DOMStrings.ADD_TYPE).value;
        var value = parseInt(document.querySelector(DOMStrings.ADD_VALUE).value);

        if (type === 'income') {
            totalIncome += value;
        } else if (type === 'expense') {
            totalExpense += value;
        }

        totalBudget = totalIncome - totalExpense;

        var incomeValue = document.querySelector(DOMStrings.BUDGET_INCOME_VALUE);
        var expenseValue = document.querySelector(DOMStrings.BUDGET_EXPENSES_VALUE);
        var budgetValue = document.querySelector(DOMStrings.BUDGET_VALUE);

        incomeValue.textContent = totalIncome;
        expenseValue.textContent = totalExpense;
        budgetValue.textContent = totalBudget;
    }

    var addListItem = function() {
        var type = document.querySelector(DOMStrings.ADD_TYPE).value;
        var description = document.querySelector(DOMStrings.ADD_DESCRIPTION).value;
        var value = document.querySelector(DOMStrings.ADD_VALUE).value;

        if (value === '' || description === '') {
            return;
        }

        var html, rHtml, list;
        if (type === 'income') {
            html = '<div class="item clearfix" id="income-0"><div class="item__description">{{description}}</div><div class="right clearfix"><div class="item__value">{{value}}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            list = document.querySelector(DOMStrings.INCOME_LIST);
        } else if (type === 'expense') {
            html = '<div class="item clearfix" id="expense-0"><div class="item__description">{{description}}</div><div class="right clearfix"><div class="item__value">{{value}}</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            list = document.querySelector(DOMStrings.EXPENSE_LIST);
        }
        rHtml = html.replace('{{description}}', description);
        rHtml = rHtml.replace('{{value}}', value);
        list.insertAdjacentHTML('beforeend', rHtml);
    };

    return {
        updateTotalBudget: updateTotalBudget,
        addListItem: addListItem,
        DOMStrings: DOMStrings
    }

})();

var controller = (function(budgetCtrl, UICtrl) {
    function updateList() {
        UICtrl.addListItem();
        UICtrl.updateTotalBudget();
    }

    document.querySelector(UICtrl.DOMStrings.ADD_BTN).addEventListener('click', updateList);
    document.addEventListener('keypress', function(event) {
        if (event.keyCode !== 13) {
            return;
        }
        updateList();
    });
})(budgetController, UIController)