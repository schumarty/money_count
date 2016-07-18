sumMoney = function() {
	var monies = $(".money");
	var total = 0;
	for (var i = 0; i < monies.length; i++) {
		var element = $(monies[i]);
		var value = $(element.children('.value')).val();
		var amount = $(element.children('.amount')).val();
		total += value * amount;
	}
		
	$("#totalMoney").html("$" + total.toFixed(2));
}

