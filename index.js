//define all the vars I want to use
let costArray = [5.50, 7.25, 6.80, 9.50, 3.25];
let quanArray = [0, 0, 0, 0, 0, 0];
let total_cost = 0;
let tax = 0;
let final_cost = 0;

let last_name, street, city, phone, is_delivery;
//copy this over because I dont want to type the names again.
menuItems = [new MenuItem("Chicken Chop Suey", 5.5),
    new MenuItem("Sweet and Sour Pork", 7.25),
    new MenuItem("Shrimp Lo Mein", 6.80),
    new MenuItem("Moo Shi Chicken", 9.50),
    new MenuItem("Fried Rice", 3.25)];

//Calculate the completed time 
function get_time(time) {
    //get current time
    const someMillisecondValue = Date.now();
    const date = new Date(someMillisecondValue);
    //get the minutes and if over 60 take modulus 
    let minute = (date.getMinutes() + time) % 60;
    //get hours and bump up if mins over 60
    let hour = date.getHours() + Math.floor((date.getMinutes() + time) / 60);
    //if mins less than 10 add the extra 0
    if (minute < 10) {
        return hour + ":0" + minute;

    }
    //concatenate the strings 
    return hour + ":" + minute;
}


//you cant tell from the name but this calculates the cost of everything. 
function caculate_costs() {
    //set all vals to 0 for when this method gets rerun
    total_cost = 0;
    tax = 0;
    final_cost = 0;
    //for all the foods calculate the costs and update the vals on the page.
    for (let i = 0; i < 5; i++) {
        let cost = (quanArray[i] * costArray[i]);
        $("td input[name='cost']").eq(i).val(cost.toFixed(2));
        //update total cost
        total_cost = total_cost + cost
    }

    //calculate tax and total cost
    tax = (total_cost * 0.0625);
    final_cost = (total_cost + tax);
    //update total cost vals
    $("input[id=subtotal]").val(total_cost.toFixed(2));
    $("input[id=tax]").val(tax.toFixed(2));
    $("input[id=total]").val(final_cost.toFixed(2));

}

// Make a new page for after order
function build_page() {

    //define a window
    let win = window;
    //add titles 
    win.document.write('<h1>Your Order<\h1>');
    win.document.head.title = "Your Order";
    //add my css to the window
    win.document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="index.css">`);

    //for each food add its total and cost to the new page
    for (let i = 0; i < 5; i++) {
        win.document.write("<p>" + quanArray[i] + " x " + menuItems[i].name + ": $" + (menuItems[i].cost * quanArray[i]).toFixed(2) + "</p>");
    }
    //add the costs
    win.document.write("<div class='line'></div>")
    win.document.write("<p> Subtotal: $" + total_cost.toFixed(2) + "</p>")
    win.document.write("<p> Tax: $" + tax.toFixed(2) + "</p>")
    win.document.write("<p> Total Cost: $" + final_cost.toFixed(2) + "</p>")
    //add the time using the time function
    win.document.write("<p> Estimate Completion Time: " + get_time(is_delivery ? 40 : 20) +
        "</p>");


}

//is something is not 'good' then let the user know my making it red
function is_good(bool, name) {

    if (bool) {
        $("input[name=" + name + "]").css('border', '2px solid red');
        return 1;
    }
    $("input[name=" + name + "]").css('border', '1px solid rgba(255,255,255,.4)');
    return 0;
}

//validate the user input before submission
function validate() {

    //is_valid starts at 0 and if it fishes anything above it is not valid.
    let is_valid = 0;

    //check all the vals and if null highlight them in red
    is_valid += is_good(last_name == null, "lname");
    is_valid += is_good(city == null && is_delivery, "city");
    is_valid += is_good(street == null && is_delivery, "street");
    is_valid += is_good(phone == null, "phone");

    // check phone is either 7 or 10 digits 
    if (phone != null && (phone.length !== 7 && phone.length !== 10)) {
        is_valid++;
        alert("Add a 7 or 10 digit phone number");
    }

    //make sure someone was purchased
    if (total_cost === 0) {
        is_valid++;
        alert("Buy something!!!!");
    }

    //if everything is valid say thanks and build new page
    if (is_valid === 0) {
        alert("Thanks for your order!");
        build_page();
    }

}


//main function that starts one the pages is initialized 
$(document).ready(function () {

    //get rid of the address because it defaults to pickup
    $("p[class='userInfo address']").hide();

    //add a listener to all the foods 
    for (let i = 0; i < 5; i++) {

        $('select[name=quan' + i.toString() + ']').change(function () {
            //save the quan selected then calculate cost
            quanArray[i] = this.value;
            caculate_costs();
        });

    }

    //add listener to submit
    $("input[type=button]").click(function () {
        validate();
    });

    //add listeners to the user inputs
    $("input[name=lname]").change(function () {
        last_name = this.value;
    });
    $("input[name=street]").change(function () {
        street = this.value;
    });
    $("input[name=city]").change(function () {
        city = this.value;
    });
    $("input[name=phone]").change(function () {
        phone = this.value;
    });
    //add lister to the delivery/pickup button 
    $("input[name=p_or_d]").change(function () {

            //save the var for later 
            is_delivery = (this.value === "delivery");

            //fade in and out the fields 
            if (is_delivery) {
                $("p[class='userInfo address']").fadeIn();
            } else {
                $("p[class='userInfo address']").fadeOut();
            }
        }
    );
});
    


