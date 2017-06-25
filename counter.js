var sumMoney = function() {
	var error = false;
	var monies = document.getElementsByClassName("money");
	var total = 0;
	for (var i = 0; i < monies.length; i++) {
		var inputNode = monies[i].getElementsByTagName("input")[0];
		var value = currencyData[inputNode.id];
		var amount = inputNode.value;
		// Interpret empty inputs as 0
		if (amount === "") {
			amount = 0;
		}
		if (!inputNode.validity.valid){
			error = true;
		}
		total += value * amount;
	}

	var totalDiv = document.getElementById("totalMoney");
	if (error) {
		totalDiv.innerHTML = "<strong>Error:</strong> use only positive whole numbers";
	} else {
		totalDiv.innerHTML = "$" + total.toFixed(2);
	}
};

var clearInputs = function() {
	var allInputs = document.getElementsByTagName("input");
	for (var i = 0; i < allInputs.length; i++) {
		allInputs[i].value = "";
	}
	document.getElementById("totalMoney").innerHTML = "";
};

var idNum = 0;

var makeCurrency = function(name, value) {
	var newId = "currency-" + idNum++;

	var newLabel = document.createElement("label");
	newLabel.setAttribute("for", newId);
	newLabel.innerHTML = name;

	var newInput = document.createElement("input");
	newInput.id = newId;
	newInput.setAttribute("type", "number");
	newInput.setAttribute("min", "0");

	var newDiv = document.createElement("div");
	newDiv.className = "money";
	newDiv.appendChild(newLabel);
	newDiv.appendChild(newInput);

	currencyData[newId] = value;

	return(newDiv);
};

var currencyData = {};

var currencyArr = [
	{
		name: "Pennies",
		value: 0.1
	},
	{
		name: "Nickels",
		value: 0.5
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
for (var i = 0; i < currencyArr.length; i++) {
	document.getElementById("currencies").appendChild(
		makeCurrency(currencyArr[i].name, currencyArr[i].value));
}
