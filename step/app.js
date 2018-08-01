var tempData = {
    income: [{
        type: 'income',
        description: 'salary',
        value: 1000,
        id: 1
    }, {
        type: 'income',
        description: 'alba',
        value: 300,
        id: 2
    }, {
        type: 'income',
        description: 'incentive',
        value: 400,
        id: 3
    }],
    expense: [{
        type: 'expense',
        description: 'phone',
        value: 100,
        id: 1
    }, {
        type: 'expense',
        description: 'food',
        value: 300,
        id: 2
    }, {
        type: 'expense',
        description: 'health',
        value: 100,
        id: 3
    }],
}

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

    function sumTotal(inputData) {
        if (inputData.type === 'income') {
            data.totals.income += inputData.value;
        } else if (inputData.type === 'expense') {
            data.totals.expense += inputData.value;
        }
        data.totals.budget = data.totals.income - data.totals.expense;
    }

    var addInpuData = function(obj) {
        var type = obj.type;
        if (type === 'income') {
            data[type].push(new Income(obj));
        } else if (type === 'expenses') {
            data[type].push(new Expense(obj));
        }
    }

    var calculateTotal = function(inputData) {
        sumTotal(inputData)
        return data.totals;
    }

    var getTotals = function() {
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
        calculateTotal: calculateTotal,
        getTotals: getTotals
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

    function clearInput() {
        var description;
        description = document.querySelector(DOMStrings.ADD_DESCRIPTION);
        description.value = '';
        document.querySelector(DOMStrings.ADD_VALUE).value = '';
        description.focus();
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
        clearInput();
    };

    return {
        updateTotalBudget: updateTotalBudget,
        addListItem: addListItem,
        DOMStrings: DOMStrings,
        getInputData: getInputData
    }

})();

var controller = (function(budgetCtrl, UICtrl) {
    function updateBudget(inputData) {
        var totals;
        totals = budgetCtrl.calculateTotal(inputData);
        UICtrl.updateTotalBudget(totals);
    }

    function updateList() {
        var inputData;
        inputData = UICtrl.getInputData();
        if (isNaN(inputData.value) || inputData.description === '') {
            return;
        }
        budgetCtrl.addInpuData(inputData);
        UICtrl.addListItem(inputData);
        updateBudget(inputData);
    }

    function setEvent() {
        document.querySelector(UICtrl.DOMStrings.ADD_BTN).addEventListener('click', updateList);
        document.addEventListener('keypress', function(event) {
            if (event.keyCode !== 13) {
                return;
            }
            updateList();
        });
    }

    function loadData() {
        return tempData;
    }

    function initRender(data) {
        data['income'].forEach(function(item) {
            UIController.addListItem(item);
            budgetCtrl.sumTotal(item);
        });
        data['expense'].forEach(function(item) {
            UIController.addListItem(item);
            budgetCtrl.sumTotal(item);
        });
        UICtrl.updateTotalBudget(budgetCtrl.getTotals());
    }

    var init = function() {
        var data;
        data = loadData();
        setEvent();
        initRender(data);
    }

    return {
        init: init
    }

})(budgetController, UIController)

controller.init();