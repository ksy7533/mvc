var tempData = {
    income: [{
        type: 'income',
        description: 'salary',
        value: 1000
    }, {
        type: 'income',
        description: 'alba',
        value: 300
    }, {
        type: 'income',
        description: 'incentive',
        value: 400
    }],
    expense: [{
        type: 'expense',
        description: 'phone',
        value: 100
    }, {
        type: 'expense',
        description: 'food',
        value: 300
    }, {
        type: 'expense',
        description: 'health',
        value: 100
    }],
}

var budgetController = (function() {
    function Income(obj) {
        this.type = obj.type;
        this.value = obj.value;
        this.description = obj.description;
        this.id = obj.id;
    }

    function Expense(obj) {
        this.type = obj.type;
        this.value = obj.value;
        this.description = obj.description;
        this.id = obj.id;
    }

    Expense.prototype.calculatePercent = function() {
        this.percent = parseInt(this.value / data.totals['income'] * 100);
    }

    function createDataID(type) {
        var dataID;
        if (data[type].length > 0) {
            dataID = data[type][data[type].length - 1].id + 1;
        } else {
            dataID = 0;
        }
        return dataID;
    }

    function sumTotal(type) {
        var sum = 0;
        for (var i = 0; i < data[type].length; i++) {
            sum += data[type][i].value;
        };
        return sum;
    }

    var addInputData = function(obj) {
        var type, obj;
        type = obj.type;
        obj.id = createDataID(type);

        if (type === 'income') {
            obj = new Income(obj)
        } else if (type === 'expense') {
            obj = new Expense(obj)
        }

        data[type].push(obj);
    }

    var calculateTotal = function() {
        data.totals.income = sumTotal('income');
        data.totals.expense = sumTotal('expense');
        data.totals.budget = data.totals.income - data.totals.expense;
    }

    var removeInputData = function(dataID, type) {
        var index;
        for (var i = 0; i < data[type].length; i++) {
            if (data[type][i].id === dataID) {
                index = i;
            }
        }
        data[type].splice(index, 1);
    }

    var calculatePercent = function() {
        data['expense'].forEach(function(item) {
            item.calculatePercent();
        });
    }

    var getTotals = function() {
        return data.totals;
    }

    var getIncome = function() {
        return data.income;
    }

    var getExpense = function() {
        return data.expense;
    }

    var printData = function() {
        return data;
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
        addInputData: addInputData,
        sumTotal: sumTotal,
        calculateTotal: calculateTotal,
        removeInputData: removeInputData,
        calculatePercent: calculatePercent,
        getTotals: getTotals,
        getIncome: getIncome,
        getExpense: getExpense,
        printData: printData
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
        EXPENSE_LIST: '.expenses__list',
        CONTAINER: '.container',
        ITEM_PERCENTAGE: '.item__percentage',
        BUDGET_EXPENSES_PERCENTAGE: '.budget__expenses--percentage'
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
        document.querySelector(DOMStrings.BUDGET_EXPENSES_PERCENTAGE).textContent = parseInt((totals.expense / totals.income) * 100) + '%';
    }

    var updatePercent = function(expenses) {
        var percentages, arr;
        percentages = document.querySelectorAll(DOMStrings.ITEM_PERCENTAGE);
        arr = Array.prototype.slice.call(percentages);
        arr.forEach(function(item, index) {
            item.textContent = (expenses[index].percent) + '%';
        });
    }

    var addListItem = function(inputData) {
        var html, rHtml, list;
        if (inputData.type === 'income') {
            html = '<div class="item clearfix" id="income-{{id}}"><div class="item__description">{{description}}</div><div class="right clearfix"><div class="item__value">{{value}}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            list = document.querySelector(DOMStrings.INCOME_LIST);
        } else if (inputData.type === 'expense') {
            html = '<div class="item clearfix" id="expense-{{id}}"><div class="item__description">{{description}}</div><div class="right clearfix"><div class="item__value">{{value}}</div><div class="item__percentage">---</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            list = document.querySelector(DOMStrings.EXPENSE_LIST);
        }
        rHtml = html.replace('{{description}}', inputData.description);
        rHtml = rHtml.replace('{{id}}', inputData.id);
        rHtml = rHtml.replace('{{value}}', inputData.value);
        list.insertAdjacentHTML('beforeend', rHtml);
        clearInput();
    };

    return {
        updateTotalBudget: updateTotalBudget,
        addListItem: addListItem,
        DOMStrings: DOMStrings,
        getInputData: getInputData,
        updatePercent: updatePercent
    }
})();

var controller = (function(budgetCtrl, UICtrl) {
    function updateBudget() {
        var totals, expense;
        totals = budgetController.getTotals();
        expense = budgetController.getExpense();
        budgetCtrl.calculateTotal();
        UICtrl.updateTotalBudget(totals);
        budgetController.calculatePercent();
        UIController.updatePercent(expense);
    }

    function updateList() {
        var inputData = UICtrl.getInputData();
        if (isNaN(inputData.value) || inputData.description === '') {
            return;
        }
        budgetCtrl.addInputData(inputData);
        UICtrl.addListItem(inputData);
        updateBudget();
    }

    function deleteList(event) {
        var target, item, type, id, list;
        target = event.target;
        if (target.parentNode.className !== 'item__delete--btn') {
            return;
        }
        item = target.parentNode.parentNode.parentNode.parentNode;
        type = item.id.split('-')[0];
        id = parseInt(item.id.split('-')[1]);
        list = item.parentNode;
        list.removeChild(item);
        budgetCtrl.removeInputData(id, type);
        updateBudget();
    }

    function loadData() {
        return tempData;
    }

    function initEvent() {
        document.querySelector(UICtrl.DOMStrings.ADD_BTN).addEventListener('click', updateList);
        document.addEventListener('keypress', function(event) {
            if (event.keyCode !== 13) {
                return;
            }
            updateList();
        });
        document.querySelector(UICtrl.DOMStrings.CONTAINER).addEventListener('click', deleteList);
    }

    function initData() {
        var data = loadData();
        data['income'].forEach(function(item) {
            budgetCtrl.addInputData(item);
        });
        data['expense'].forEach(function(item) {
            budgetCtrl.addInputData(item);
        });
        budgetCtrl.calculateTotal();
    }

    function initRender() {
        var income, expense;
        income = budgetController.getIncome();
        expense = budgetController.getExpense();
        income.forEach(function(item) {
            UIController.addListItem(item);
        });
        expense.forEach(function(item) {
            UIController.addListItem(item);
        });
        updateBudget();
    }

    var init = function() {
        initData();
        initEvent();
        initRender();
    }

    return {
        init: init
    }

})(budgetController, UIController)

controller.init();