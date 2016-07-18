sumMoney = function() {
	var error = false;
	var monies = $(".money");
	var total = 0;
	for (var i = 0; i < monies.length; i++) {
		var element = $(monies[i]);
		var value = element.data("value");
		var amount = $(element.children('input')).val();
		// Interpret empty inputs as 0
		if (amount === "") {
			amount = 0;
		}
		if (!isInt(amount) || amount < 0){
			error = true;
		}
		total += value * amount;
	}
	if (error) {
		$("#totalMoney").html("<strong>Error:</strong> use only positive whole numbers");
	} else {
		$("#totalMoney").html("$" + total.toFixed(2));
	}
}

clearInputs = function() {
	$("input").each(function() {
		$(this).val("");
	});
	$("#totalMoney").html("");
}

// Copied from a Stack Overflow post
// http://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
isInt = function(value) {
	if (isNaN(value)) {
		return false;
	}
	var x = parseFloat(value);
	return (x | 0) === x;
}

// Function to generate unique IDs
var idNum = 0;
generateId = function() {
	var idName = "currency-" + idNum;
	idNum++;
	return(idName);
}

makeCurrency = function(name, value) {
	var newId = generateId();

	var newLabel = document.createElement("label");
	newLabel.setAttribute("for", newId);
	newLabel.innerHTML = name;

	var newInput = document.createElement("input");
	newInput.id = newId;
	newInput.setAttribute("pattern", "[0-9]*");

	var newDiv = document.createElement("div");
	newDiv.className = "money";
	newDiv.appendChild(newLabel);
	newDiv.appendChild(newInput);

	$(newDiv).data("value", value);

	return(newDiv);
}

var currencyArr = [
	{
		name: "Pennies",
		value: .01
	},
	{
		name: "Nickels",
		value: .05
	},
	{
		name: "Dimes",
		value: .1
	},
	{
		name: "Quarters",
		value: .25
	},
	{
		name: "$1 Bills",
		value: 1
	},
	{
		name: "$5 Bills",
		value: 5
	}
];

$(document).ready(function () {
	for (var i = 0; i < currencyArr.length; i++) {
		$("#currencies").append(makeCurrency(
			currencyArr[i].name, currencyArr[i].value));
	}
});
