sumMoney = function() {
	var total =
		$("#pennies > .amount").val() * .01
		+ $("#nickels > .amount").val() * .05
		+ $("#dimes > .amount").val() * .10
		+ $("#quarters > .amount").val() * .25;
	$("#totalMoney").html("$" + total.toFixed(2));
}
