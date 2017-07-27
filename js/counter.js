"use strict";

/*******************************************************************************
* Globally defined content affecting what shows up on the page
*******************************************************************************/
const currencyArr = [
  {
    name: "Pennies",
    value: 0.01,
  },
  {
    name: "Nickels",
    value: 0.05,
  },
  {
    name: "Dimes",
    value: 0.1,
  },
  {
    name: "Quarters",
    value: 0.25,
  },
  {
    name: "$1 Bills",
    value: 1,
  },
  {
    name: "$5 Bills",
    value: 5,
  },
  {
    name: "$10 Bills",
    value: 10,
  },
  {
    name: "$20 Bills",
    value: 20,
  },
  {
    name: "$50 Bills",
    value: 50,
  },
  {
    name: "$100 Bills",
    value: 100,
  },
  {
    name: "Rolls of Pennies",
    value: 0.5,
  },
  {
    name: "Rolls of Nickels",
    value: 2,
  },
  {
    name: "Rolls of Dimes",
    value: 5,
  },
  {
    name: "Rolls of Quarters",
    value: 10,
  },
];

/*******************************************************************************
* Various helper functions
*******************************************************************************/
const formatMoneyOut = function(money) {
  return `$${money.toFixed(2)}`;
};

const calcTotal = function($inputNode) {
  const value = $inputNode.attr("data-currency-value");
  const amount = $inputNode.val();
  const currencyTotal = value * amount;

  return currencyTotal;
};

const sumMoney = function() {
  let total = 0;

  $("input").each(function() {
    const $inputNode = $(this);
    total += calcTotal($inputNode);
  });

  return total;
};

let idNum = 0;
const makeCurrency = function(name, value) {
  const newId = `currency-${idNum}`;
  idNum += 1;

  const moneyDivTemplateString = `
    <div class="money form-group">
      <div class="row">
        <div class="col-sm-3">
          <label class="currency-label" for="${newId}">${name}</label>
        </div>
        <div class="col-xs-9 col-sm-6">
          <div class="input-group">
            <span class="input-group-addon">&times;</span>
            <input id="${newId}" class="form-control" placeholder="0" type="number" min="0" data-currency-value="${value}">
          </div>
        </div>
        <div class="col-xs-3 col-sm-3">
          <p id="total-${newId}" class="currency-total pull-right"></p>
        </div>
      </div>
    </div>
  `;

  return $(moneyDivTemplateString);
};

/*******************************************************************************
* Fuctions that are to be used by events on the page
*******************************************************************************/
const updateTotal = function() {
// First calculate the changed element
  const $inputNode = $(this);
  const currencyTotal = calcTotal($inputNode);

  const totalIdQuery = `#total-${$inputNode.attr("id")}`;
  $(totalIdQuery).html(formatMoneyOut(currencyTotal));

// Now calculate and sum all of the elements  
  const total = sumMoney();
  $("#totalMoney").html(formatMoneyOut(total));
};

const clearInputs = function() {
  $("input").val("");
  $("#totalMoney, .currency-total").html(formatMoneyOut(0));
};

/*******************************************************************************
* Code that needs to execute whenever the page is loaded/refreshed
*******************************************************************************/
const onLoad = function() {
  const $currencies = [];
  currencyArr.forEach(function(currency) {
    $currencies.push(
        makeCurrency(currency.name, currency.value));
  });
  $("#currencies").append($currencies);

// Event Handlers
  $("input").change(updateTotal);
  $(".btn-clear").click(clearInputs);

// Sets all totals to zero with the correct formatting
  clearInputs();
};

/*******************************************************************************
* Execute onLoad() whenever page is loaded or refreshed
*******************************************************************************/
onLoad();
