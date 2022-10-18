let costArray = [5.50, 7.25, 6.80, 9.50, 3.25];
let quanArray = [0, 0, 0, 0, 0, 0];
let total_cost = 0;
let tax = 0;
let final_cost = 0;

let first_name, last_name, street, city, phone;


function caculate_costs() {
    total_cost = 0;
    tax = 0;
    final_cost = 0;
    for (let i = 0; i < 5; i++) {
        let cost = (quanArray[i] * costArray[i]);
        $("td input[name='cost']").eq(i).val(cost.toFixed(2));
        total_cost = total_cost + cost
    }

    tax = (total_cost * 0.0625);
    final_cost = (total_cost + tax);

    $("input[id=subtotal]").val(total_cost.toFixed(2));
    $("input[id=tax]").val(tax.toFixed(2));
    $("input[id=total]").val(final_cost.toFixed(2));

}

function validate() {

    if (last_name == null) {
        $("input[name=lname]").css('border', '5px solid red');
    }
    if (city == null) {
        $("input[name=city]").css('border', '5px solid red');
    }
    if (street == null) {
        $("input[name=street]").css('border', '5px solid red');
    }
    if (phone == null) {
        $("input[name=phone]").css('border', '5px solid red');
    }
    if ((phone.length !== 7 && phone.length !== 10)) {

        alert("Add a 7 or 10 digit phone number");
    }
    if(total_cost===0){
        alert("Buy something!!!!");
    }
}


for (let i = 0; i < 5; i++) {

    $('select[name=quan' + i.toString() + ']').change(function (e) {
        quanArray[i] = this.value;
        caculate_costs();
    });

}

$("input[type=button]").click(function (e) {
    validate();
});

$("input[name=lname]").change(function (e) {
    last_name = this.value;
});
$("input[name=street]").change(function (e) {
    street = this.value;
});
$("input[name=city]").change(function (e) {
    city = this.value;
});
$("input[name=phone]").change(function (e) {
    phone = this.value;
});

    


