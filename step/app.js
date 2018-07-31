var budgetController = (function() {

    function Income(obj) {
        this.type = obj.type;
        this.value = obj.value;
        this.description = obj.description;
    }

    function Expense(obj) {
        this.type = obj.type;
        this.value = obj.value;
        this.description = obj.description;
    }

    var addInpuData = function(obj) {
        var type = obj.type;
        if (type === 'income') {
            data[type].push(new Income(obj));
        } else if (type === 'expenses') {
            data[type].push(new Expense(obj));
        }
    }

    var sumTotal = function(inputData) {
        if (inputData.type === 'income') {
            data.totals.income += inputData.value;
        } else if (inputData.type === 'expense') {
            data.totals.expense += inputData.value;
        }
        data.totals.budget = data.totals.income - data.totals.expense;
    }

    var getTotal = function() {
        return data.totals;
    }

    var data = {
        income: [],
        expense: [],
        totals: {
            income: 0,
            expense: 0,
            budget: 0
        }
    }

    return {
        addInpuData: addInpuData,
        sumTotal: sumTotal,
        getTotal: getTotal
    }

})();

var UIController = (function() {
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

    var getInputData = function() {
        return {
            type: document.querySelector(DOMStrings.ADD_TYPE).value,
            description: document.querySelector(DOMStrings.ADD_DESCRIPTION).value,
            value: parseInt(document.querySelector(DOMStrings.ADD_VALUE).value)
        }
    }

    var updateTotalBudget = function(totals) {
        document.querySelector(DOMStrings.BUDGET_INCOME_VALUE).textContent = totals.income;
        document.querySelector(DOMStrings.BUDGET_EXPENSES_VALUE).textContent = totals.expense;
        document.querySelector(DOMStrings.BUDGET_VALUE).textContent = totals.budget;
    }

    var addListItem = function(inputData) {
        var html, rHtml, list;

        if (inputData.value === '' || inputData.description === '') {
            return;
        }

        if (inputData.type === 'income') {
            html = '<div class="item clearfix" id="income-0"><div class="item__description">{{description}}</div><div class="right clearfix"><div class="item__value">{{value}}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            list = document.querySelector(DOMStrings.INCOME_LIST);
        } else if (inputData.type === 'expense') {
            html = '<div class="item clearfix" id="expense-0"><div class="item__description">{{description}}</div><div class="right clearfix"><div class="item__value">{{value}}</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            list = document.querySelector(DOMStrings.EXPENSE_LIST);
        }

        rHtml = html.replace('{{description}}', inputData.description);
        rHtml = rHtml.replace('{{value}}', inputData.value);
        list.insertAdjacentHTML('beforeend', rHtml);
    };

    return {
        updateTotalBudget: updateTotalBudget,
        addListItem: addListItem,
        DOMStrings: DOMStrings,
        getInputData: getInputData
    }

})();

var controller = (function(budgetCtrl, UICtrl) {
    function updateList() {
        var inputData = UICtrl.getInputData();

        UICtrl.addListItem(inputData);
        budgetCtrl.addInpuData(inputData);

        budgetCtrl.sumTotal(inputData);
        var totals = budgetCtrl.getTotal();
        UICtrl.updateTotalBudget(totals);
    }

    document.querySelector(UICtrl.DOMStrings.ADD_BTN).addEventListener('click', updateList);
    document.addEventListener('keypress', function(event) {
        if (event.keyCode !== 13) {
            return;
        }
        updateList();
    });
})(budgetController, UIController)