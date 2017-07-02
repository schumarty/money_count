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
    name: "Roll of Pennies",
    value: 0.5,
  },
  {
    name: "Roll of Nickels",
    value: 2,
  },
  {
    name: "Roll of Dimes",
    value: 5,
  },
  {
    name: "Roll of Quarters",
    value: 10,
  },
];

/*******************************************************************************
* Various helper functions
*******************************************************************************/
const sumMoney = function() {
  let total = 0;

  $(".money").each(function() {
    const $inputNode = $(this).find("input");
    const value = $inputNode.attr("data-currency-value");
    const amount = $inputNode.val();

    total += value * amount;
  });

  return total;
};

let idNum = 0;
const makeCurrency = function(name, value) {
  const newId = `currency-${idNum}`;
  idNum += idNum;

  const $label = $("<label>", {"for": newId}).html(name);
  const $input = $("<input>",
      {"id": newId, "type": "number", "min": "0", "data-currency-value": value}
  );
  const $moneyDiv = $("<div>", {"class": "money"}).append($label, $input);

  return $moneyDiv;
};

/*******************************************************************************
* Fuctions that are to be used by buttons on the page
*******************************************************************************/
const updateTotal = function() {
  const total = sumMoney();
  $("#totalMoney").html(`$${total.toFixed(2)}`);
};

const clearInputs = function() {
  $("input").val("");
  $("#totalMoney").html("");
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
};

/*******************************************************************************
* Execute onLoad() whenever page is loaded or refreshed
*******************************************************************************/
onLoad();
