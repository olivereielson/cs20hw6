let costArray = [5.50, 7.25, 6.80, 9.50, 3.25];
let quanArray = [0, 0, 0, 0, 0, 0];
let total_cost = 0;
let tax = 0;
let final_cost = 0;

let first_name, last_name, street, city, phone, is_delivery;

menuItems = [new MenuItem("Chicken Chop Suey", 5.5),
    new MenuItem("Sweet and Sour Pork", 7.25),
    new MenuItem("Shrimp Lo Mein", 6.80),
    new MenuItem("Moo Shi Chicken", 9.50),
    new MenuItem("Fried Rice", 3.25)];


function get_time(time) {
    var someMillisecondValue = Date.now();
    var date = new Date(someMillisecondValue);
    let minute = (date.getMinutes() + time) % 60;
    let hour = date.getHours() + Math.floor((date.getMinutes() + time) / 60);

    if (minute < 10) {
        return hour + ":0" + minute;

    }
    return hour + ":" + minute;
}

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

function build_page() {
    
    console.log("hhee");
    let win = window;
    win.document.style = document.style;
    win.document.write('<h1>Your Order<\h1>');
    win.document.head.title = "Your Order";
    win.document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="index.css">`);

    for (let i = 0; i < 5; i++) {
        win.document.write("<p>" + menuItems[i].name + ": " + (menuItems[i].cost * quanArray[i]).toFixed(2) + "</p>");
    }
    win.document.write("<div></div>")
    win.document.write("<p> Subtotal: " + total_cost.toFixed(2) + "</p>")
    win.document.write("<p> Tax: " + tax.toFixed(2) + "</p>")
    win.document.write("<p> Total Cost: " + final_cost.toFixed(2) + "</p>")
    win.document.write("<p> Estimate Completion Time: " + get_time(is_delivery?40:20) +
        "</p>");


}

function validate() {


    let is_valid = true;

    if (last_name == null) {
        $("input[name=lname]").css('border', '2px solid red');
        is_valid = false;
    } else {
        $("input[name=lname]").css('border', '1px solid rgba(255,255,255,.4)');
    }

    if (city == null && is_delivery) {
        is_valid = false;
        $("input[name=city]").css('border', '2px solid red');
    } else {
        $("input[name=city]").css('border', '1px solid rgba(255,255,255,.4)');

    }
    if (street == null && is_delivery) {
        is_valid = false;
        $("input[name=street]").css('border', '2px solid red');
    } else {
        $("input[name=street]").css('border', '1px solid rgba(255,255,255,.4)');

    }
    if (phone == null) {
        is_valid = false;
        $("input[name=phone]").css('border', '2px solid red');
    } else {
        $("input[name=phone]").css('border', '1px solid rgba(255,255,255,.4)');
    }

    if (phone != null && (phone.length !== 7 && phone.length !== 10)) {
        is_valid = false;
        alert("Add a 7 or 10 digit phone number");
    }

    if (total_cost === 0) {
        is_valid = false;
        alert("Buy something!!!!");
    }

    if (is_valid) {
        alert("Thanks for your order!");
        build_page();
    }

}

$(document).ready(function () {

    $("p[class='userInfo address']").fadeOut();


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
    $("input[name=p_or_d]").change(function () {

            is_delivery = (this.value !== "delivery");
            if (is_delivery) {
                $("p[class='userInfo address']").fadeOut();
            } else {
                $("p[class='userInfo address']").fadeIn();
            }
        }
    );
});
    


