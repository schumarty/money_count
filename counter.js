sumMoney = function() {
	var error = false;
	var monies = document.getElementsByClassName("money");
	var total = 0;
	for (var i = 0; i < monies.length; i++) {
		inputNode = monies[i].getElementsByTagName("input")[0];
		var value = currencyData[inputNode.id];
		var amount = inputNode.value;
		// Interpret empty inputs as 0
		if (amount === "") {
			amount = 0;
		}
		if (!isInt(amount) || amount < 0){
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
}

clearInputs = function() {
	var allInputs = document.getElementsByTagName("input");
	for (var i = 0; i < allInputs.length; i++) {
		allInputs[i].value = "";
	}
	document.getElementById("totalMoney").innerHTML = "";
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
	newInput.setAttribute("type", "number");
	newInput.setAttribute("min", "0");

	var newDiv = document.createElement("div");
	newDiv.className = "money";
	newDiv.appendChild(newLabel);
	newDiv.appendChild(newInput);

	currencyData[newId] = value;

	return(newDiv);
}

var currencyData = {};

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
