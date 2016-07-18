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
	}
];

sumMoney = function() {
	var monies = $(".money");
	var total = 0;
	for (var i = 0; i < monies.length; i++) {
		var element = $(monies[i]);
		var value = element.data("value");
		var amount = $(element.children('input')).val();
		total += value * amount;
	}
		
	$("#totalMoney").html("$" + total.toFixed(2));
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

	var newDiv = document.createElement("div");
	newDiv.className = "money";
	newDiv.appendChild(newLabel);
	newDiv.appendChild(newInput);

	$(newDiv).data("value", value);

	return(newDiv);
}

$(document).ready(function () {
	for (var i = 0; i < currencyArr.length; i++) {
		$("#currencies").append(makeCurrency(
			currencyArr[i].name, currencyArr[i].value));
	}
});
