"use strict";

/*******************************************************************************
* Templates and other code that will be turned into HTML
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

const moneyDivTemplate = ({id, name, value}) => `
  <div class="form-group">
    <label class="cst-currency-label" for="${id}">${name}</label>
    <div class="row">
      <div class="col-xs-8">
        <div class="input-group">
          <span class="input-group-addon">&times;</span>
          <input id="${id}" class="form-control" placeholder="0" type="number" min="0" data-currency-value="${value}">
        </div>
      </div>
      <div class="col-xs-4">
        <p id="total-${id}" class="cst-currency-total control-label pull-right"></p>
      </div>
    </div>
  </div>
`;

const formatMoneyOut = (money) => `$${money.toFixed(2)}`;

/*******************************************************************************
* Various helper functions
*******************************************************************************/
const calcTotal = function($inputNode) {
  if ($inputNode.prop("validity").valid === false) {
    return 0;
  }
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

const generateIdNum = (function() {
  let idNum = 0;
  return () => idNum += 1;
})();

const makeCurrency = function(name, value) {
  const newId = `currency-${generateIdNum()}`;
  const moneyDivHtml = moneyDivTemplate({id: newId, name: name, value: value});

  return $(moneyDivHtml);
};

/*******************************************************************************
* Fuctions that are to be used by events on the page
*******************************************************************************/
const updateTotal = function() {
  const $inputNode = $(this);

// Indicate invalid inputs with the Bootstrap .has-error class
  if ($inputNode.prop("validity").valid) {
    $inputNode.parent().removeClass("has-error");
  } else {
    $inputNode.parent().addClass("has-error");
  }

// Calculate the changed element
  const currencyTotal = calcTotal($inputNode);

  const totalIdQuery = `#total-${$inputNode.attr("id")}`;
  $(totalIdQuery).html(formatMoneyOut(currencyTotal));

// Now calculate and sum all of the elements
  const total = sumMoney();
  $("#totalMoney").html(formatMoneyOut(total));
};

const clearInputs = function() {
  $("input").val("");
  $("#totalMoney, .cst-currency-total").html(formatMoneyOut(0));
  $(".input-group").removeClass("has-error");

// Prevents href action from happening
  return false;
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
  $("input").on("input", updateTotal);
  $(".btn-clear").click(clearInputs);

// Sets all totals to zero with the correct formatting
  clearInputs();

// Set Current year for copyright info in the bottom bar
  $(".cst-present-year").html(new Date().getFullYear());
};

/*******************************************************************************
* Execute onLoad() whenever page is loaded or refreshed
*******************************************************************************/
onLoad();
