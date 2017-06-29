var sumMoney = function() {
	var total = 0;

  $(".money").each(function() {
    var $inputNode = $(this).find("input");
    var value = $inputNode.attr("data-currency-value");
    var amount = $inputNode.val();

    total += value * amount;
  });

  return total;
}

var updateTotal = function() {
  var total = sumMoney();
  $("#totalMoney").html("$" + total.toFixed(2));
};

var clearInputs = function() {
  $("input").val("");
  $("#totalMoney").html("");
};

var idNum = 0;

var makeCurrency = function(name, value) {
	var newId = "currency-" + idNum++;

  var $label = $("<label>", {"for": newId}).html(name);
  var $input = $("<input>", {"id": newId, "type": "number", min: "0", "data-currency-value": value});
  var $moneyDiv = $("<div>", {"class": "money"});
  $moneyDiv.append($label, $input);

	return($moneyDiv);
};

var currencyArr = [
	{
		name: "Pennies",
		value: 0.01
	},
	{
		name: "Nickels",
		value: 0.05
	},
	{
		name: "Dimes",
		value: 0.1
	},
	{
		name: "Quarters",
		value: 0.25
	},
	{
		name: "$1 Bills",
		value: 1
	},
	{
		name: "$5 Bills",
		value: 5
	},
	{
		name: "$10 Bills",
		value: 10
	},
	{
		name: "$20 Bills",
		value: 20
	},
	{
		name: "$50 Bills",
		value: 50
	},
	{
		name: "$100 Bills",
		value: 100
	},
	{
		name: "Roll of Pennies",
		value: .5
	},
	{
		name: "Roll of Nickels",
		value: 2
	},
	{
		name: "Roll of Dimes",
		value: 5
	},
	{
		name: "Roll of Quarters",
		value: 10
	}
];

// Populate document with currency inputs etc.
var $currencies = [];
currencyArr.forEach(function(currency) {
  $currencies.push(makeCurrency(currency.name, currency.value));
});
$("#currencies").append($currencies);
